export interface ILatestDocumentsState {
  documents: Document[];
  error?: string;
  loading: boolean;
}

export interface Document {
  Title: string;
  ServerRelativeUrl: string;
}