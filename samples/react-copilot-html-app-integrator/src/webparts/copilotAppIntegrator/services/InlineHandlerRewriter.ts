/**
 * Marker attribute that links an element in the transformed document to
 * its handler registrations. Registrations reference the element by this
 * value instead of by a CSS selector, so elements without an id or a
 * unique class are still addressable.
 */
export const HANDLER_ATTRIBUTE = 'data-cai-handler';

export interface IHandlerRegistration {
  /** Value of the element's HANDLER_ATTRIBUTE. */
  id: number;
  /** Event type, i.e. the attribute name without its "on" prefix. */
  type: string;
  /** Original handler source, compiled in the iframe with new Function. */
  body: string;
  /** Set for rewritten javascript: URLs, whose navigation must not run. */
  preventDefault?: boolean;
}

export interface IRewriteResult {
  registrations: IHandlerRegistration[];
  warnings: string[];
}

interface IUrlHandlerTarget {
  selector: string;
  attribute: string;
  eventType: string;
  /** Replacement value; the attribute is removed when undefined. */
  replacement?: string;
}

/**
 * Inline event handler attributes (onclick="…") and javascript: URLs
 * cannot execute inside the embedded document: an attribute cannot carry
 * a CSP nonce, and hashes do not apply to event handlers without the
 * 'unsafe-hashes' keyword. This matters twice over, because a srcdoc
 * iframe inherits the SharePoint page's own Content-Security-Policy in
 * addition to the one this web part injects — and the inherited policy
 * is not ours to relax.
 *
 * This pass therefore strips both constructs from the initial document
 * and hands their bodies to the bootstrap, which re-binds them through
 * addEventListener from nonce-approved script. Handlers created later at
 * runtime (innerHTML with onclick=) are caught by the bootstrap's
 * MutationObserver instead.
 */
export class InlineHandlerRewriter {
  private static readonly URL_HANDLER_TARGETS: IUrlHandlerTarget[] = [
    { selector: 'a', attribute: 'href', eventType: 'click', replacement: '#' },
    { selector: 'area', attribute: 'href', eventType: 'click', replacement: '#' },
    { selector: 'form', attribute: 'action', eventType: 'submit' }
  ];

  private readonly _registrations: IHandlerRegistration[] = [];
  private readonly _warnings: string[] = [];
  private _nextId = 0;

  public rewrite(document: Document): IRewriteResult {
    document.querySelectorAll('*').forEach(element => {
      this.rewriteAttributeHandlers(element);
      this.rewriteUrlHandler(element);
    });

    return {
      registrations: this._registrations,
      warnings: this._warnings
    };
  }

  private rewriteAttributeHandlers(element: Element): void {
    // The attribute list is live, so it has to be snapshotted before any
    // removal shifts the remaining entries.
    const attributes = Array.from(element.attributes);

    for (const attribute of attributes) {
      const name = attribute.name.toLowerCase();

      if (!/^on[a-z]+$/.test(name) || !attribute.value.trim()) {
        continue;
      }

      this.addRegistration(element, name.slice(2), attribute.value);
      element.removeAttribute(attribute.name);
    }
  }

  private rewriteUrlHandler(element: Element): void {
    const target = InlineHandlerRewriter.URL_HANDLER_TARGETS.find(
      candidate => element.tagName.toLowerCase() === candidate.selector
    );

    if (!target) {
      return;
    }

    const value = element.getAttribute(target.attribute);

    if (!value || !/^\s*javascript:/i.test(value)) {
      return;
    }

    const source = value.replace(/^\s*javascript:/i, '');

    // Browsers percent-decode javascript: URLs before evaluating them;
    // a malformed sequence would otherwise become a syntax error in a
    // handler the author cannot see any more.
    let body: string;

    try {
      body = decodeURIComponent(source);
    } catch {
      body = source;
      this._warnings.push(
        `A javascript: URL on <${element.tagName.toLowerCase()}> could not ` +
        'be decoded and was bound as written.'
      );
    }

    if (body.trim()) {
      this.addRegistration(element, target.eventType, body, true);
    }

    if (target.replacement === undefined) {
      element.removeAttribute(target.attribute);
    } else {
      element.setAttribute(target.attribute, target.replacement);
    }
  }

  private addRegistration(
    element: Element,
    type: string,
    body: string,
    preventDefault?: boolean
  ): void {
    const existing = element.getAttribute(HANDLER_ATTRIBUTE);
    const id = existing === null ? this._nextId++ : Number(existing);

    if (existing === null) {
      element.setAttribute(HANDLER_ATTRIBUTE, String(id));
    }

    this._registrations.push({ id, type, body, preventDefault });
  }
}
