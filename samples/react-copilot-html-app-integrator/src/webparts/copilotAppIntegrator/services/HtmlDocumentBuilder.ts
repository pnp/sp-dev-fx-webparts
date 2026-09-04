import { ILiveDataResult } from '../models/ILiveDataResult';

export interface IBuildDocumentOptions {
  sourceFileUrl: string;
  instanceId: string;
  tenantOrigin: string;
  results: Record<string, ILiveDataResult>;
  /**
   * CSP nonce of the hosting SharePoint page. srcdoc documents inherit
   * the embedding page's Content-Security-Policy, and SharePoint's
   * script-src permits inline scripts only via its per-load nonce —
   * so the embedded scripts must carry that same nonce to execute.
   */
  pageNonce?: string;
}

export class HtmlDocumentBuilder {
  public build(document: Document, options: IBuildDocumentOptions): string {
    this.removeSharePointMetadata(document);
    this.addBaseUrl(document, options.sourceFileUrl);

    const nonce = options.pageNonce || this.createNonce();

    const bootstrap = document.createElement('script');
    bootstrap.setAttribute('nonce', nonce);
    bootstrap.textContent = this.createBootstrapScript(options);

    this.insertBeforeApplicationScript(document, bootstrap);

    document
      .querySelectorAll('script, style')
      .forEach(element => element.setAttribute('nonce', nonce));

    this.addContentSecurityPolicy(document, nonce, options.tenantOrigin);

    // The doctype is lost by outerHTML serialization; without it the
    // srcdoc document would render in quirks mode.
    return '<!doctype html>\n' + document.documentElement.outerHTML;
  }

  private createBootstrapScript(options: IBuildDocumentOptions): string {
    // Escaping <, > and & keeps strings like "</script>" inside the
    // resolved data from terminating the bootstrap script element.
    const safeResults = JSON.stringify(options.results)
      .replace(/</g, '\\u003c')
      .replace(/>/g, '\\u003e')
      .replace(/&/g, '\\u0026');

    const safeInstanceId = JSON.stringify(options.instanceId);

    return `
      window.__LD_RESULTS__ = ${safeResults};
      window.__SPFX_HTML_INSTANCE_ID__ = ${safeInstanceId};

      window.addEventListener(
        "DOMContentLoaded",
        function () {
          var reportHeight = function () {
            var height = Math.max(
              document.body ? document.body.scrollHeight : 0,
              document.documentElement.scrollHeight
            );

            window.parent.postMessage({
              type: "spfx-html-host:resize",
              instanceId: window.__SPFX_HTML_INSTANCE_ID__,
              height: height
            }, "*");
          };

          reportHeight();

          if (window.ResizeObserver) {
            var observer = new ResizeObserver(reportHeight);
            observer.observe(document.documentElement);
          }
        }
      );

      window.addEventListener(
        "error",
        function (event) {
          window.parent.postMessage({
            type: "spfx-html-host:error",
            instanceId: window.__SPFX_HTML_INSTANCE_ID__,
            message: event.message || "Script error"
          }, "*");
        }
      );
    `;
  }

  private insertBeforeApplicationScript(
    document: Document,
    bootstrap: HTMLScriptElement
  ): void {
    const scripts = Array.from(document.scripts);

    // Skips non-executable scripts such as the application/json
    // manifest block so the bootstrap lands before the first real
    // application script.
    const firstExecutable = scripts.find(script => {
      const type = script.getAttribute('type')?.toLowerCase();

      return (
        !type ||
        type === 'text/javascript' ||
        type === 'application/javascript' ||
        type === 'module'
      );
    });

    if (firstExecutable?.parentNode) {
      firstExecutable.parentNode.insertBefore(bootstrap, firstExecutable);
    } else {
      document.head.appendChild(bootstrap);
    }
  }

  private addBaseUrl(document: Document, sourceFileUrl: string): void {
    const folderUrl = new URL('./', sourceFileUrl).toString();

    const base = document.createElement('base');
    base.href = folderUrl;

    document.head.prepend(base);
  }

  private addContentSecurityPolicy(
    document: Document,
    nonce: string,
    tenantOrigin: string
  ): void {
    const meta = document.createElement('meta');

    meta.httpEquiv = 'Content-Security-Policy';
    meta.content = [
      `default-src 'none'`,
      `script-src 'nonce-${nonce}'`,
      `style-src 'nonce-${nonce}'`,
      // HTML applications rely heavily on inline style="" attributes,
      // which a nonce-only style-src would strip.
      `style-src-attr 'unsafe-inline'`,
      `img-src ${tenantOrigin} data: blob:`,
      `font-src ${tenantOrigin} data:`,
      `connect-src 'none'`,
      `frame-src 'none'`,
      `object-src 'none'`,
      `form-action 'none'`,
      `base-uri ${tenantOrigin}`
    ].join('; ');

    document.head.prepend(meta);
  }

  private removeSharePointMetadata(document: Document): void {
    document
      .querySelectorAll('xml, meta[name^="_dlc_"]')
      .forEach(element => element.remove());
  }

  private createNonce(): string {
    const bytes = new Uint8Array(18);
    crypto.getRandomValues(bytes);

    return btoa(
      Array.from(bytes)
        .map(value => String.fromCharCode(value))
        .join('')
    );
  }
}
