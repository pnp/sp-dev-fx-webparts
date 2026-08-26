/**
 * ContentRenderer Service
 * Renders custom content types: Markdown, HTML, Mermaid diagrams, and Embeds
 * Includes security sanitization for all content types
 */

import { marked } from 'marked';
import mermaid from 'mermaid';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const DOMPurify = require('dompurify');
import { SPHttpClient } from '@microsoft/sp-http';
import { WebPartContext } from '@microsoft/sp-webpart-base';

// Content type definitions
export type ContentType = 'webpart' | 'section' | 'markdown' | 'html' | 'mermaid' | 'embed';

export interface IEmbedConfig {
  url: string;
  height?: string;
  additionalDomains?: string[];
}

export interface IRenderResult {
  html: string;
  requiresPostRender?: boolean;
  postRenderType?: 'mermaid';
}

export class ContentRenderer {
  private static mermaidInitialized = false;
  private static siteAllowList: string[] | null = null;

  // Default trusted domains for embeds (Microsoft ecosystem + popular tools)
  private static readonly DEFAULT_TRUSTED_DOMAINS: string[] = [
    // YouTube
    'youtube.com', 'youtu.be', 'youtube-nocookie.com',
    // Vimeo
    'vimeo.com', 'player.vimeo.com',
    // Microsoft Power Platform
    'powerbi.com', 'app.powerbi.com',
    'powerapps.com', 'apps.powerapps.com',
    'flow.microsoft.com',
    // Microsoft Forms
    'forms.office.com', 'forms.microsoft.com',
    // SharePoint & OneDrive
    'sharepoint.com', 'sharepoint-df.com',
    'onedrive.live.com', 'onedrive.com',
    // Microsoft 365
    'sway.office.com', 'sway.com',
    'microsoft.com', 'office.com',
    'stream.microsoft.com', 'web.microsoftstream.com',
    'teams.microsoft.com',
    'loop.microsoft.com',
    // Design & Collaboration Tools
    'canva.com',
    'figma.com',
    'miro.com',
    'lucid.app', 'lucidchart.com',
    'whimsical.com',
    // Other common embeds
    'loom.com',
    'calendly.com',
    'typeform.com',
    'airtable.com',
    'notion.so', 'notion.site',
    'coda.io',
    'mural.co',
    'pitch.com'
  ];

  /**
   * Initialize mermaid library with configuration
   */
  private static initMermaid(): void {
    if (!this.mermaidInitialized) {
      mermaid.initialize({
        startOnLoad: false,
        theme: 'default',
        securityLevel: 'strict',
        fontFamily: '"Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, sans-serif'
      });
      this.mermaidInitialized = true;
    }
  }

  /**
   * Load site-level embed allow list from Site Assets
   * Config file: /SiteAssets/PiCanvas/embed-allowlist.json
   * Format: { "allowedDomains": ["custom-app.com", "internal.contoso.com"] }
   */
  public static async loadSiteAllowList(context: WebPartContext): Promise<void> {
    if (this.siteAllowList !== null) {
      return; // Already loaded
    }

    try {
      const configUrl = `${context.pageContext.web.absoluteUrl}/SiteAssets/PiCanvas/embed-allowlist.json`;
      const response = await context.spHttpClient.get(configUrl, SPHttpClient.configurations.v1);

      if (response.ok) {
        const config = await response.json();
        if (config && Array.isArray(config.allowedDomains)) {
          this.siteAllowList = config.allowedDomains.filter(
            (d: unknown) => typeof d === 'string' && d.length > 0
          );
          console.log('[PiCanvas] Loaded site embed allow list:', this.siteAllowList);
        } else {
          this.siteAllowList = [];
        }
      } else {
        // File not found or not accessible - use empty list
        this.siteAllowList = [];
      }
    } catch (error) {
      console.warn('[PiCanvas] Could not load site embed allow list:', error);
      this.siteAllowList = [];
    }
  }

  /**
   * Render Markdown content to sanitized HTML
   */
  public static renderMarkdown(content: string): IRenderResult {
    if (!content || typeof content !== 'string') {
      return { html: '' };
    }

    try {
      // Parse markdown to HTML
      const rawHtml = marked.parse(content, {
        gfm: true, // GitHub Flavored Markdown
        breaks: true // Convert \n to <br>
      });

      // Sanitize output
      const sanitizedHtml = DOMPurify.sanitize(rawHtml as string, {
        USE_PROFILES: { html: true },
        ADD_ATTR: ['target', 'rel'], // Allow link attributes
        FORBID_TAGS: ['style', 'script'],
        FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover']
      });

      return { html: sanitizedHtml };
    } catch (error) {
      console.error('[PiCanvas] Markdown render error:', error);
      return { html: `<p class="picanvas-render-error">Error rendering Markdown content</p>` };
    }
  }

  /**
   * Render HTML content with sanitization
   */
  public static renderHtml(content: string): IRenderResult {
    if (!content || typeof content !== 'string') {
      return { html: '' };
    }

    try {
      // Sanitize HTML with more permissive settings for custom content
      const sanitizedHtml = DOMPurify.sanitize(content, {
        USE_PROFILES: { html: true },
        ADD_TAGS: ['iframe'], // Allow iframes (will be validated separately)
        ADD_ATTR: [
          'target', 'rel', 'allow', 'allowfullscreen', 'frameborder',
          'scrolling', 'loading', 'referrerpolicy', 'sandbox'
        ],
        FORBID_TAGS: ['script'],
        FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'onmouseout', 'onfocus', 'onblur']
      });

      return { html: sanitizedHtml };
    } catch (error) {
      console.error('[PiCanvas] HTML render error:', error);
      return { html: `<p class="picanvas-render-error">Error rendering HTML content</p>` };
    }
  }

  /**
   * Prepare Mermaid diagram content for rendering
   * Note: Actual rendering happens post-DOM insertion via renderMermaidElement()
   */
  public static prepareMermaid(content: string, elementId: string): IRenderResult {
    if (!content || typeof content !== 'string') {
      return { html: '' };
    }

    // Encode content for data attribute (prevent XSS)
    const encodedContent = this.encodeForAttribute(content);

    // Generate a CSS-safe ID for mermaid (no special characters that break selectors)
    const safeId = this.makeCssSafeId(elementId);

    // Return placeholder that will be rendered after DOM insertion
    const html = `
      <div class="picanvas-mermaid-container"
           data-mermaid-id="${safeId}"
           data-mermaid-content="${encodedContent}">
        <div class="mermaid" id="${safeId}">
          ${this.encodeHtml(content)}
        </div>
      </div>
    `;

    return {
      html,
      requiresPostRender: true,
      postRenderType: 'mermaid'
    };
  }

  /**
   * Render a Mermaid element after DOM insertion
   * Call this after the element is in the DOM
   */
  public static async renderMermaidElement(element: HTMLElement): Promise<void> {
    this.initMermaid();

    const content = element.getAttribute('data-mermaid-content');
    const mermaidId = element.getAttribute('data-mermaid-id');

    if (!content || !mermaidId) {
      return;
    }

    // Decode content
    const decodedContent = this.decodeFromAttribute(content);

    const mermaidDiv = element.querySelector('.mermaid') as HTMLElement;
    if (!mermaidDiv || mermaidDiv.querySelector('svg')) {
      return; // Already rendered or no target
    }

    try {
      const { svg } = await mermaid.render(mermaidId + '-svg', decodedContent);
      mermaidDiv.innerHTML = svg;
      element.classList.add('picanvas-mermaid-rendered');
    } catch (error) {
      console.error('[PiCanvas] Mermaid render error:', error);
      mermaidDiv.innerHTML = `
        <div class="picanvas-mermaid-error">
          <span class="error-icon">⚠️</span>
          <span class="error-text">Diagram syntax error. Please check your Mermaid code.</span>
          <details>
            <summary>Details</summary>
            <pre>${this.encodeHtml(String(error))}</pre>
          </details>
        </div>
      `;
    }
  }

  /**
   * Render embed (iframe) content with URL validation
   */
  public static renderEmbed(config: IEmbedConfig): IRenderResult {
    const { url, height = '400px', additionalDomains = [] } = config;

    if (!url || typeof url !== 'string') {
      return { html: '<p class="picanvas-render-error">No embed URL provided</p>' };
    }

    // Validate and sanitize URL
    const sanitizedUrl = this.sanitizeEmbedUrl(url, additionalDomains);

    if (!sanitizedUrl) {
      return {
        html: `
          <div class="picanvas-embed-blocked">
            <span class="blocked-icon">🚫</span>
            <span class="blocked-text">This embed URL is not allowed.</span>
            <details>
              <summary>Allowed domains</summary>
              <p>Contact your site administrator to add this domain to the allow list.</p>
            </details>
          </div>
        `
      };
    }

    // Build iframe with security attributes
    const html = `
      <div class="picanvas-embed-container" style="height: ${this.sanitizeCssValue(height)}">
        <iframe
          src="${this.encodeForAttribute(sanitizedUrl)}"
          style="width: 100%; height: 100%; border: none;"
          loading="lazy"
          allowfullscreen
          referrerpolicy="no-referrer-when-downgrade"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
        ></iframe>
      </div>
    `;

    return { html };
  }

  /**
   * Validate and sanitize embed URL against allow list
   */
  public static sanitizeEmbedUrl(url: string, additionalDomains: string[] = []): string {
    // Combine all allowed domains
    const allAllowed = [
      ...this.DEFAULT_TRUSTED_DOMAINS,
      ...(this.siteAllowList || []),
      ...additionalDomains
    ];

    try {
      const parsed = new URL(url);

      // Only allow HTTPS
      if (parsed.protocol !== 'https:') {
        console.warn('[PiCanvas] Embed URL rejected: not HTTPS');
        return '';
      }

      // Get domain without www prefix
      const domain = parsed.hostname.replace(/^www\./, '').toLowerCase();

      // Check against allow list
      const isAllowed = allAllowed.some(allowed => {
        const pattern = allowed.replace(/^www\./, '').toLowerCase();
        return domain === pattern || domain.endsWith('.' + pattern);
      });

      if (!isAllowed) {
        console.warn(`[PiCanvas] Embed URL rejected: domain "${domain}" not in allow list`);
        return '';
      }

      return url;
    } catch (error) {
      console.warn('[PiCanvas] Invalid embed URL:', error);
      return '';
    }
  }

  /**
   * Check if a domain is in the allow list
   */
  public static isDomainAllowed(domain: string, additionalDomains: string[] = []): boolean {
    const allAllowed = [
      ...this.DEFAULT_TRUSTED_DOMAINS,
      ...(this.siteAllowList || []),
      ...additionalDomains
    ];

    const cleanDomain = domain.replace(/^www\./, '').toLowerCase();

    return allAllowed.some(allowed => {
      const pattern = allowed.replace(/^www\./, '').toLowerCase();
      return cleanDomain === pattern || cleanDomain.endsWith('.' + pattern);
    });
  }

  /**
   * Get list of default trusted domains (for documentation/UI)
   */
  public static getDefaultTrustedDomains(): string[] {
    return [...this.DEFAULT_TRUSTED_DOMAINS];
  }

  /**
   * Get combined allow list (default + site)
   */
  public static getAllowedDomains(additionalDomains: string[] = []): string[] {
    return [
      ...this.DEFAULT_TRUSTED_DOMAINS,
      ...(this.siteAllowList || []),
      ...additionalDomains
    ];
  }

  // ========== Security Helper Methods ==========

  /**
   * Encode HTML entities to prevent XSS
   */
  private static encodeHtml(str: string): string {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /**
   * Encode string for use in HTML attribute
   */
  private static encodeForAttribute(str: string): string {
    if (!str) return '';
    // Base64 encode to safely store in data attribute
    try {
      return btoa(encodeURIComponent(str));
    } catch {
      return this.encodeHtml(str);
    }
  }

  /**
   * Decode string from HTML attribute
   */
  private static decodeFromAttribute(str: string): string {
    if (!str) return '';
    try {
      return decodeURIComponent(atob(str));
    } catch {
      return str;
    }
  }

  /**
   * Sanitize CSS value to prevent injection
   */
  private static sanitizeCssValue(value: string): string {
    if (!value) return '';
    // Only allow safe CSS units and values
    const safePattern = /^[\d.]+(px|em|rem|%|vh|vw)?$/i;
    const trimmed = value.trim();
    if (safePattern.test(trimmed)) {
      return trimmed;
    }
    // Default to pixels if just a number
    if (/^\d+$/.test(trimmed)) {
      return trimmed + 'px';
    }
    return '400px'; // Safe default
  }

  /**
   * Generate a CSS-safe ID from a string
   * CSS selectors cannot contain =, +, /, or other special characters
   * This creates a valid HTML ID attribute value that can also be used in CSS selectors
   */
  private static makeCssSafeId(str: string): string {
    if (!str) return 'mermaid-' + Date.now();
    // Replace any non-alphanumeric characters (except hyphen and underscore) with hyphen
    // CSS IDs must start with a letter, underscore, or hyphen (not a digit)
    let safeId = str.replace(/[^a-zA-Z0-9_-]/g, '-');
    // Ensure it starts with a letter if it starts with a digit
    if (/^[0-9]/.test(safeId)) {
      safeId = 'm-' + safeId;
    }
    // Remove consecutive hyphens
    safeId = safeId.replace(/-+/g, '-');
    // Remove leading/trailing hyphens
    safeId = safeId.replace(/^-+|-+$/g, '');
    return safeId || 'mermaid-' + Date.now();
  }
}
