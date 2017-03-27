export interface ISiteCollections {
  createdDateTime: Date;
  description: string;
  id: string;
  lastModifiedDateTime: Date;
  name: string;
  root: Object;
  siteCollection: ISiteCollection;
  siteCollectionId: string;
  siteId: string;
  webUrl: string;
}

export interface ISiteCollection {
  hostname: string;
}