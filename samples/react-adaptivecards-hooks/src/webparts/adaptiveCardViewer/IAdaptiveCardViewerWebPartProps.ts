export type TemplateSourceType = 'json' | 'url';
export type DataSourceType = 'list' | 'json' | 'url';

export interface IAdaptiveCardViewerWebPartProps {
  /**
   * Either 'json' or 'url'
   */
  templateSource: TemplateSourceType;

  /**
   * The JSON Adaptive Cards template
   */
  template: string;

  /**
   * The URL to the template json
   */
  templateUrl: string;

  /**
   * The static JSON data, if using
   */
  data: string | undefined;

  /**
   * Whether we'll use adaptive templating or not
   */
  useTemplating: boolean;

  /**
   * Either 'list' or 'json' or 'url'
   */
  dataSource: DataSourceType;

  /**
   * The list id of the selected list
   */
  list: string | undefined;

  /**
   * The view id of the selected view
   */
  view: string | undefined;

  /**
   * The url of the remote data
   */
  dataUrl: string | undefined;
}
