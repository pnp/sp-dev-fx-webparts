export type HtmlDataSourceKind = 'list' | 'file';

export interface IHtmlDataSource {
  kind: HtmlDataSourceKind;
  /**
   * Key under which the resolved result is stored in the injected
   * window.__LD_RESULTS__ dictionary. The HTML application looks its
   * data up by this exact string.
   */
  spItemUrl: string;
  webUrl: string;
  listId?: string;
  fileServerRelativeUrl?: string;
  label?: string;
  select?: string[];
  expand?: string[];
}

export interface IHtmlManifest {
  schemaVersion: number;
  title?: string;
  items: IHtmlDataSource[];
}
