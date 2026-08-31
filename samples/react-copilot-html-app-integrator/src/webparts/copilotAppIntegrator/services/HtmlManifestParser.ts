import { IHtmlDataSource, IHtmlManifest } from '../models/IHtmlManifest';

export class HtmlManifestParser {
  public constructor(private readonly tenantOrigin: string) {}

  public parse(document: Document): IHtmlManifest {
    const element = document.querySelector<HTMLScriptElement>(
      'script.ka-livedata-manifest[type="application/json"]'
    );

    if (!element?.textContent?.trim()) {
      return {
        schemaVersion: 1,
        items: []
      };
    }

    const value: unknown = JSON.parse(element.textContent);

    // Accept both the legacy plain-array form and the versioned
    // object form.
    const manifest: IHtmlManifest = Array.isArray(value)
      ? {
          schemaVersion: 1,
          items: value as IHtmlDataSource[]
        }
      : value as IHtmlManifest;

    this.validate(manifest);

    return manifest;
  }

  private validate(manifest: IHtmlManifest): void {
    if (!Array.isArray(manifest.items)) {
      throw new Error('The HTML manifest does not contain an items array.');
    }

    if (manifest.items.length > 10) {
      throw new Error('Too many data sources were declared.');
    }

    for (const item of manifest.items) {
      if (item.kind !== 'list' && item.kind !== 'file') {
        throw new Error(
          `Unsupported data-source kind: ${item.kind as string}`
        );
      }

      if (typeof item.spItemUrl !== 'string' || !item.spItemUrl.trim()) {
        throw new Error(
          'A data source is missing its spItemUrl key.'
        );
      }

      const sourceUrl = new URL(item.webUrl);

      if (
        sourceUrl.protocol !== 'https:' ||
        sourceUrl.origin !== this.tenantOrigin
      ) {
        throw new Error(
          `The source site is not permitted: ${item.webUrl}`
        );
      }

      if (
        item.kind === 'list' &&
        !/^[0-9a-f-]{36}$/i.test(item.listId ?? '')
      ) {
        throw new Error('The manifest contains an invalid list ID.');
      }
    }
  }
}
