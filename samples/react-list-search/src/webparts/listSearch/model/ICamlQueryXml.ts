export interface ICamlQueryXml {
  name: string;
  attributes: IViewField | undefined;
  value: string;
  children: Array<ICamlQueryXml>;
}

export interface IViewQuery {
  Query: string;
  RowLimit: any;
  ViewFields: any;
}

export interface IViewField {
  Name: string;
}

