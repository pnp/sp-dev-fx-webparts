export interface ISPViews {
    value: ISPView[];
  }
  export interface ISPView {
    Title: string;
    Id: string;
    DefaultView: boolean;
    Hidden: boolean;
    RowLimit: number;
    ListViewXml: string;
  }
  