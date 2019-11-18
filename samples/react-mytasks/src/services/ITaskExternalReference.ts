export interface  ITaskExternalReference {
  [key:string]: Stringvalue;
}

interface Stringvalue {
  "@odata.type": string;
  alias: string;
  lastModifiedBy?: string;
  lastModifiedDateTime?: string;
  previewPriority?: string;
  type?: string;
}
