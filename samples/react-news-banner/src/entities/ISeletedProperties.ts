import { IPropertyFieldSite } from '@pnp/spfx-property-controls/lib/PropertyFieldSitePicker';

export interface ISelectedProperties {
  title: string;
  listId: string;
  sites: IPropertyFieldSite[];
  titleFieldName: string;
  dateFieldName: string;
  descriptionFieldName: string;
  imageUrlFieldName: string;
  listBasetemplate: number;
  numberItems: number;
  titleLink: string;
}
