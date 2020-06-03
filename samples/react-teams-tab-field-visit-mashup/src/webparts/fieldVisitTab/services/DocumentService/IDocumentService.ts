import { IDocument } from '../../model/IDocument';

// US only for now
export interface IDocumentService {
    getDocuments (customerId: string):
        Promise<IDocument[]>;
}