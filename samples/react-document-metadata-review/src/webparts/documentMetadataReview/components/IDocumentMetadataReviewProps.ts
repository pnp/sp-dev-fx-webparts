import { IDocumentMetadataService } from '../services/DocumentMetadataService';

export interface IDocumentMetadataReviewProps {
  libraryPath: string;
  folderPath: string;
  metadataFields: string;
  maxRows: number;
  service: IDocumentMetadataService;
}
