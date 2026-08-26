export interface ISensitivityLabel {
  sensitivityLabelId?: string;
  displayName?: string;
  toolTip?: string;
  priority?: number;
  color?: string;
  isEncrypted?: boolean;
}

export interface IExtract {
  text?: string;
}

export interface IResourceMetadata {
  title?: string;
  author?: string;
  [key: string]: unknown;
}

export interface IRetrievalHit {
  webUrl?: string;
  extracts?: IExtract[];
  resourceType?: string;
  resourceMetadata?: IResourceMetadata;
  sensitivityLabel?: ISensitivityLabel;
}

export interface IRetrivalResponse {
  retrievalHits?: IRetrievalHit[];
  [key: string]: unknown;
}
