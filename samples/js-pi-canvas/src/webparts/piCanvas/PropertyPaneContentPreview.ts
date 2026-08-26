import {
  IPropertyPaneCustomFieldProps,
  IPropertyPaneField,
  PropertyPaneFieldType
} from '@microsoft/sp-property-pane';
import { marked } from 'marked';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const DOMPurify = require('dompurify');

export interface IPropertyPaneContentPreviewProps {
  contentType: 'markdown' | 'html' | 'mermaid' | 'embed';
  content: string;
  embedUrl?: string;
  embedHeight?: string;
  key: string;
}

interface IPropertyPaneContentPreviewInternalProps extends IPropertyPaneContentPreviewProps, IPropertyPaneCustomFieldProps {
}

class PropertyPaneContentPreviewBuilder implements IPropertyPaneField<IPropertyPaneContentPreviewProps> {
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: IPropertyPaneContentPreviewInternalProps;
  private mermaidPromise: Promise<typeof import('mermaid')> | null = null;

  constructor(targetProperty: string, properties: IPropertyPaneContentPreviewProps) {
    this.targetProperty = targetProperty;
    this.properties = {
      ...properties,
      onRender: this.onRender.bind(this)
    };
  }

  private async loadMermaid(): Promise<typeof import('mermaid')> {
    if (!this.mermaidPromise) {
      this.mermaidPromise = import('mermaid');
    }
    return this.mermaidPromise;
  }

  private onRender(elem: HTMLElement): void {
    const props = this.properties;
    const contentType = props.contentType;
    const content = props.content || '';

    // Container styles
    const containerStyles = `
      margin: 12px 0 16px 0;
      padding: 16px;
      background: #f5f5f5;
      border-radius: 8px;
      border: 1px solid #e0e0e0;
    `;

    const labelStyles = `
      font-size: 11px;
      font-weight: 600;
      color: #666;
      margin-bottom: 10px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      display: flex;
      align-items: center;
      gap: 6px;
    `;

    const previewStyles = `
      background: white;
      border-radius: 6px;
      padding: 12px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      max-height: 300px;
      overflow: auto;
    `;

    // Get icon and label based on content type
    let icon = '';
    let label = 'Preview';

    switch (contentType) {
      case 'markdown':
        icon = '<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M14.85 3H1.15C.52 3 0 3.52 0 4.15v7.69C0 12.48.52 13 1.15 13h13.69c.64 0 1.15-.52 1.15-1.15V4.15C16 3.52 15.48 3 14.85 3zM9 11H7V8L5.5 9.92 4 8v3H2V5h2l1.5 2L7 5h2v6zm2.99.5L9.5 8H11V5h2v3h1.5l-2.51 3.5z"/></svg>';
        label = 'Markdown Preview';
        break;
      case 'html':
        icon = '<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M0 0l1.45 16L8 18l6.55-2L16 0H0zm12.56 4.62l-.16 1.64-.08.8H5.82l.16 1.6h6.3l-.16 1.6-.48 5.22-3.72 1.14v.02h-.08l-3.76-1.14-.26-2.9h1.58l.14 1.56 2.3.62 2.3-.62.24-2.5H5.62l-.42-4.56h6.98l.38-1.68z"/></svg>';
        label = 'HTML Preview';
        break;
      case 'mermaid':
        icon = '<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/><path d="M8 4l3.09 6.26L8 9.18l-3.09 1.08L8 4z"/></svg>';
        label = 'Mermaid Preview';
        break;
      case 'embed':
        icon = '<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M14 2H2a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2zM2 4h12v2H2V4zm0 8V8h12v4H2z"/></svg>';
        label = 'Embed Preview';
        break;
    }

    if (!content && contentType !== 'embed') {
      elem.innerHTML = `
        <div style="${containerStyles}">
          <div style="${labelStyles}">
            ${icon}
            ${label}
          </div>
          <div style="${previewStyles}">
            <div style="color: #999; font-style: italic; text-align: center; padding: 20px;">
              Enter content above to see preview
            </div>
          </div>
        </div>
      `;
      return;
    }

    if (contentType === 'markdown') {
      this.renderMarkdownPreview(elem, content, containerStyles, labelStyles, previewStyles, icon, label);
    } else if (contentType === 'html') {
      this.renderHtmlPreview(elem, content, containerStyles, labelStyles, previewStyles, icon, label);
    } else if (contentType === 'mermaid') {
      // Handle async method with proper error catching
      this.renderMermaidPreview(elem, content, containerStyles, labelStyles, previewStyles, icon, label)
        .catch(err => {
          console.error('[PiCanvas] Mermaid preview error:', err);
          elem.innerHTML = `
            <div style="${containerStyles}">
              <div style="${labelStyles}">
                ${icon}
                ${label}
              </div>
              <div style="${previewStyles}">
                <div style="color: #d32f2f; padding: 10px;">
                  Failed to render preview
                </div>
              </div>
            </div>
          `;
        });
    } else if (contentType === 'embed') {
      this.renderEmbedPreview(elem, props.embedUrl || '', props.embedHeight || '200px', containerStyles, labelStyles, previewStyles, icon, label);
    }
  }

  private renderMarkdownPreview(
    elem: HTMLElement,
    content: string,
    containerStyles: string,
    labelStyles: string,
    previewStyles: string,
    icon: string,
    label: string
  ): void {
    try {
      const htmlContent = marked.parse(content, { async: false }) as string;
      const sanitized = DOMPurify.sanitize(htmlContent);

      elem.innerHTML = `
        <div style="${containerStyles}">
          <div style="${labelStyles}">
            ${icon}
            ${label}
          </div>
          <div style="${previewStyles}" class="pi-markdown-preview">
            ${sanitized}
          </div>
        </div>
      `;

      // Add basic markdown styles
      const styleEl = document.createElement('style');
      styleEl.textContent = `
        .pi-markdown-preview h1 { font-size: 1.5em; margin: 0.5em 0; font-weight: bold; }
        .pi-markdown-preview h2 { font-size: 1.3em; margin: 0.5em 0; font-weight: bold; }
        .pi-markdown-preview h3 { font-size: 1.1em; margin: 0.5em 0; font-weight: bold; }
        .pi-markdown-preview p { margin: 0.5em 0; }
        .pi-markdown-preview ul, .pi-markdown-preview ol { margin: 0.5em 0; padding-left: 1.5em; }
        .pi-markdown-preview code { background: #f0f0f0; padding: 2px 4px; border-radius: 3px; font-family: monospace; }
        .pi-markdown-preview pre { background: #f0f0f0; padding: 8px; border-radius: 4px; overflow-x: auto; }
        .pi-markdown-preview pre code { background: none; padding: 0; }
        .pi-markdown-preview blockquote { border-left: 3px solid #ccc; margin: 0.5em 0; padding-left: 1em; color: #666; }
        .pi-markdown-preview a { color: #0078d4; text-decoration: none; }
        .pi-markdown-preview a:hover { text-decoration: underline; }
        .pi-markdown-preview table { border-collapse: collapse; width: 100%; margin: 0.5em 0; }
        .pi-markdown-preview th, .pi-markdown-preview td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        .pi-markdown-preview th { background: #f5f5f5; }
      `;
      elem.appendChild(styleEl);
    } catch (err) {
      elem.innerHTML = `
        <div style="${containerStyles}">
          <div style="${labelStyles}">
            ${icon}
            ${label}
          </div>
          <div style="${previewStyles}">
            <div style="color: #d32f2f; padding: 10px;">
              Error parsing Markdown: ${(err as Error).message}
            </div>
          </div>
        </div>
      `;
    }
  }

  private renderHtmlPreview(
    elem: HTMLElement,
    content: string,
    containerStyles: string,
    labelStyles: string,
    previewStyles: string,
    icon: string,
    label: string
  ): void {
    const sanitized = DOMPurify.sanitize(content, {
      ADD_TAGS: ['iframe'],
      ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling']
    });

    elem.innerHTML = `
      <div style="${containerStyles}">
        <div style="${labelStyles}">
          ${icon}
          ${label}
        </div>
        <div style="${previewStyles}">
          ${sanitized}
        </div>
      </div>
    `;
  }

  private async renderMermaidPreview(
    elem: HTMLElement,
    content: string,
    containerStyles: string,
    labelStyles: string,
    previewStyles: string,
    icon: string,
    label: string
  ): Promise<void> {
    // Show loading state
    elem.innerHTML = `
      <div style="${containerStyles}">
        <div style="${labelStyles}">
          ${icon}
          ${label}
        </div>
        <div style="${previewStyles}">
          <div style="color: #666; text-align: center; padding: 20px;">
            <svg width="20" height="20" viewBox="0 0 24 24" style="animation: spin 1s linear infinite;">
              <path fill="currentColor" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z" opacity=".5"/>
              <path fill="currentColor" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"/>
            </svg>
            <style>@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }</style>
            <div style="margin-top: 8px;">Rendering diagram...</div>
          </div>
        </div>
      </div>
    `;

    try {
      const mermaidModule = await this.loadMermaid();
      const mermaid = mermaidModule.default;

      // Initialize mermaid with safe settings
      mermaid.initialize({
        startOnLoad: false,
        theme: 'default',
        securityLevel: 'strict',
        fontFamily: 'inherit'
      });

      // Generate unique ID for this render
      const id = `mermaid-preview-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      // Render the diagram
      const { svg } = await mermaid.render(id, content);

      elem.innerHTML = `
        <div style="${containerStyles}">
          <div style="${labelStyles}">
            ${icon}
            ${label}
          </div>
          <div style="${previewStyles}; text-align: center;">
            ${svg}
          </div>
        </div>
      `;

      // Make SVG responsive
      const svgEl = elem.querySelector('svg');
      if (svgEl) {
        svgEl.style.maxWidth = '100%';
        svgEl.style.height = 'auto';
      }
    } catch (err) {
      elem.innerHTML = `
        <div style="${containerStyles}">
          <div style="${labelStyles}">
            ${icon}
            ${label}
          </div>
          <div style="${previewStyles}">
            <div style="color: #d32f2f; padding: 10px;">
              <strong>Mermaid Syntax Error:</strong><br/>
              ${(err as Error).message}
            </div>
            <div style="margin-top: 8px; padding: 8px; background: #fff3e0; border-radius: 4px; font-size: 12px;">
              <strong>Tip:</strong> Check your diagram syntax at <a href="https://mermaid.live" target="_blank" style="color: #0078d4;">mermaid.live</a>
            </div>
          </div>
        </div>
      `;
    }
  }

  private renderEmbedPreview(
    elem: HTMLElement,
    url: string,
    height: string,
    containerStyles: string,
    labelStyles: string,
    previewStyles: string,
    icon: string,
    label: string
  ): void {
    if (!url) {
      elem.innerHTML = `
        <div style="${containerStyles}">
          <div style="${labelStyles}">
            ${icon}
            ${label}
          </div>
          <div style="${previewStyles}">
            <div style="color: #999; font-style: italic; text-align: center; padding: 20px;">
              Enter an embed URL above to see preview
            </div>
          </div>
        </div>
      `;
      return;
    }

    // Validate URL
    let isValid = false;
    try {
      const parsed = new URL(url);
      isValid = parsed.protocol === 'https:';
    } catch {
      isValid = false;
    }

    if (!isValid) {
      elem.innerHTML = `
        <div style="${containerStyles}">
          <div style="${labelStyles}">
            ${icon}
            ${label}
          </div>
          <div style="${previewStyles}">
            <div style="color: #d32f2f; padding: 10px;">
              Invalid URL. Please enter a valid HTTPS URL.
            </div>
          </div>
        </div>
      `;
      return;
    }

    elem.innerHTML = `
      <div style="${containerStyles}">
        <div style="${labelStyles}">
          ${icon}
          ${label}
        </div>
        <div style="${previewStyles}; padding: 0; overflow: hidden;">
          <iframe
            src="${DOMPurify.sanitize(url)}"
            style="width: 100%; height: ${height}; border: none; border-radius: 6px;"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin"
          ></iframe>
        </div>
      </div>
    `;
  }
}

export function PropertyPaneContentPreview(targetProperty: string, properties: IPropertyPaneContentPreviewProps): IPropertyPaneField<IPropertyPaneContentPreviewProps> {
  return new PropertyPaneContentPreviewBuilder(targetProperty, properties);
}
