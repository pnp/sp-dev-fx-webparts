import { ILiveDataResult } from '../models/ILiveDataResult';
import {
  HANDLER_ATTRIBUTE,
  IHandlerRegistration,
  InlineHandlerRewriter
} from './InlineHandlerRewriter';

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

export interface IBuildDocumentResult {
  html: string;
  /** Author-facing notes about constructs that could not be rewritten. */
  warnings: string[];
}

export class HtmlDocumentBuilder {
  public build(
    document: Document,
    options: IBuildDocumentOptions
  ): IBuildDocumentResult {
    this.removeSharePointMetadata(document);
    this.addBaseUrl(document, options.sourceFileUrl);

    // Must run before the CSP meta is added: the rewriter is what makes
    // the document satisfiable under a nonce-only script-src.
    const rewrite = new InlineHandlerRewriter().rewrite(document);

    const nonce = options.pageNonce || this.createNonce();

    const bootstrap = document.createElement('script');
    bootstrap.setAttribute('nonce', nonce);
    bootstrap.textContent = this.createBootstrapScript(
      options,
      rewrite.registrations
    );

    this.insertBeforeApplicationScript(document, bootstrap);

    document
      .querySelectorAll('script, style')
      .forEach(element => element.setAttribute('nonce', nonce));

    this.addContentSecurityPolicy(document, nonce, options.tenantOrigin);

    return {
      // The doctype is lost by outerHTML serialization; without it the
      // srcdoc document would render in quirks mode.
      html: '<!doctype html>\n' + document.documentElement.outerHTML,
      warnings: rewrite.warnings
    };
  }

  /**
   * Escaping <, > and & keeps strings like "</script>" inside embedded
   * data from terminating the bootstrap script element. Handler bodies
   * travel through this same encoding — as JSON data rather than as
   * inlined source — so no author handler can break out of the script.
   */
  private encode(value: unknown): string {
    return JSON.stringify(value)
      .replace(/</g, '\\u003c')
      .replace(/>/g, '\\u003e')
      .replace(/&/g, '\\u0026');
  }

  private createBootstrapScript(
    options: IBuildDocumentOptions,
    registrations: IHandlerRegistration[]
  ): string {
    return `
      (function () {
        var HANDLER_ATTRIBUTE = ${this.encode(HANDLER_ATTRIBUTE)};
        var REGISTRATIONS = ${this.encode(registrations)};
        var INSTANCE_ID = ${this.encode(options.instanceId)};

        window.__LD_RESULTS__ = ${this.encode(options.results)};
        window.__SPFX_HTML_INSTANCE_ID__ = INSTANCE_ID;

        var reported = {};

        function post(type, message) {
          window.parent.postMessage({
            type: type,
            instanceId: INSTANCE_ID,
            message: message
          }, "*");
        }

        // A handler failing on every mousemove would otherwise flood the
        // host with identical messages.
        function warn(message) {
          if (reported[message]) {
            return;
          }

          reported[message] = true;
          post("spfx-html-host:warning", message);
        }

        function summarize(body) {
          var text = String(body).replace(/\\s+/g, " ").trim();

          return text.length > 60 ? text.slice(0, 60) + "\\u2026" : text;
        }

        /**
         * Reproduces inline-handler semantics: "this" is the element,
         * "event" is in scope, and returning false prevents the default
         * action. Implicit with(this)/with(document) scoping is not
         * reproduced — such handlers throw and are reported instead.
         */
        function bind(element, type, body, preventDefault) {
          var fn;

          try {
            fn = new Function("event", body);
          } catch (error) {
            warn('on' + type + '="' + summarize(body) +
              '" could not be compiled and was ignored.');
            return;
          }

          var bound = element.__caiBound || (element.__caiBound = {});

          // Re-assigning an inline handler replaces it in the browser,
          // so the previous listener has to go.
          if (bound[type]) {
            element.removeEventListener(type, bound[type]);
          }

          var listener = function (event) {
            if (preventDefault) {
              event.preventDefault();
            }

            var result;

            try {
              result = fn.call(this, event);
            } catch (error) {
              warn('on' + type + '="' + summarize(body) + '" failed: ' +
                ((error && error.message) || error));
              return;
            }

            if (result === false) {
              event.preventDefault();
            }
          };

          bound[type] = listener;
          element.addEventListener(type, listener);
        }

        var URL_TARGETS = {
          a: { attribute: "href", type: "click", replacement: "#" },
          area: { attribute: "href", type: "click", replacement: "#" },
          form: { attribute: "action", type: "submit", replacement: null }
        };

        function scanUrlHandler(element) {
          var target = URL_TARGETS[
            element.tagName ? element.tagName.toLowerCase() : ""
          ];

          if (!target) {
            return;
          }

          var value = element.getAttribute(target.attribute);

          if (!value || !/^\\s*javascript:/i.test(value)) {
            return;
          }

          var body = value.replace(/^\\s*javascript:/i, "");

          try {
            body = decodeURIComponent(body);
          } catch (error) {
            // Bound as written; a malformed escape is the author's.
          }

          if (target.replacement === null) {
            element.removeAttribute(target.attribute);
          } else {
            element.setAttribute(target.attribute, target.replacement);
          }

          if (body.replace(/\\s/g, "")) {
            bind(element, target.type, body, true);
          }
        }

        function scanElement(element) {
          if (!element.attributes) {
            return;
          }

          var attributes = Array.prototype.slice.call(element.attributes);

          for (var i = 0; i < attributes.length; i++) {
            var name = attributes[i].name.toLowerCase();
            var value = attributes[i].value;

            if (!/^on[a-z]+$/.test(name) || !value) {
              continue;
            }

            element.removeAttribute(name);
            bind(element, name.slice(2), value, false);
          }

          scanUrlHandler(element);
        }

        function scanTree(node) {
          if (!node || node.nodeType !== 1) {
            return;
          }

          scanElement(node);

          if (node.querySelectorAll) {
            var descendants = node.querySelectorAll("*");

            for (var i = 0; i < descendants.length; i++) {
              scanElement(descendants[i]);
            }
          }
        }

        // The static rewrite only covers the document as authored.
        // Markup injected later (innerHTML with onclick=) carries fresh
        // inline handlers that the same policy would block, so they are
        // converted as they appear.
        if (window.MutationObserver) {
          new MutationObserver(function (mutations) {
            for (var i = 0; i < mutations.length; i++) {
              var mutation = mutations[i];

              if (mutation.type === "childList") {
                for (var j = 0; j < mutation.addedNodes.length; j++) {
                  scanTree(mutation.addedNodes[j]);
                }
              } else if (mutation.attributeName) {
                var name = mutation.attributeName.toLowerCase();

                if (
                  /^on[a-z]+$/.test(name) ||
                  name === "href" ||
                  name === "action"
                ) {
                  scanElement(mutation.target);
                }
              }
            }
          }).observe(document.documentElement, {
            childList: true,
            subtree: true,
            attributes: true
          });
        }

        function bindRegistrations() {
          for (var i = 0; i < REGISTRATIONS.length; i++) {
            var registration = REGISTRATIONS[i];

            var element = document.querySelector(
              "[" + HANDLER_ATTRIBUTE + '="' + registration.id + '"]'
            );

            if (element) {
              bind(
                element,
                registration.type,
                registration.body,
                registration.preventDefault
              );
            }
          }
        }

        function reportHeight() {
          var height = Math.max(
            document.body ? document.body.scrollHeight : 0,
            document.documentElement.scrollHeight
          );

          window.parent.postMessage({
            type: "spfx-html-host:resize",
            instanceId: INSTANCE_ID,
            height: height
          }, "*");
        }

        function onReady() {
          bindRegistrations();
          reportHeight();

          if (window.ResizeObserver) {
            new ResizeObserver(reportHeight).observe(document.documentElement);
          }
        }

        if (document.readyState === "loading") {
          window.addEventListener("DOMContentLoaded", onReady);
        } else {
          onReady();
        }

        window.addEventListener("error", function (event) {
          post("spfx-html-host:error", event.message || "Script error");
        });
      })();
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
      // 'unsafe-eval' backs the handler rewrite (new Function) and the
      // eval-based template and chart libraries these apps bundle. The
      // inherited SharePoint policy already grants it, so withholding it
      // here only broke apps without adding protection.
      `script-src 'nonce-${nonce}' 'unsafe-eval'`,
      `style-src 'nonce-${nonce}'`,
      // HTML applications rely heavily on inline style="" attributes,
      // which a nonce-only style-src would strip.
      `style-src-attr 'unsafe-inline'`,
      `img-src ${tenantOrigin} data: blob:`,
      `font-src ${tenantOrigin} data:`,
      // The sandbox has no allow-same-origin, so these requests carry no
      // credentials — this permits anonymous endpoints, not the user's
      // SharePoint data, which still arrives through the manifest.
      `connect-src ${tenantOrigin} data: blob:`,
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
