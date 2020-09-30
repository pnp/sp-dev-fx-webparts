export interface IListItem {
  id: string;
  name?: string;
  webUrl?: string;
  createdDateTime?: Date;
  lastModifiedDateTime?: Date;
  createdBy?: {
      user: {
          displayName: string;
      }
  };
  lastModifiedBy?: {
      user: {
          displayName: string;
      }
  };
  fields?: { [fieldName: string]: any };
}
