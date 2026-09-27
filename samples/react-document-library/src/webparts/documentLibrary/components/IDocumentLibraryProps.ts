import { WebPartContext } from '@microsoft/sp-webpart-base';
import { DocumentLibraryService } from '../services/DocumentLibraryService';

export interface IDocumentLibraryProps {
  context: WebPartContext;
  libraryTitle: string;
  libraryRootPath: string;
  webPartTitle: string;
  pageSize: number;
  showFolders: boolean;
  showFileType: boolean;
  showModifiedDate: boolean;
  service: DocumentLibraryService;
}
