import { IDocument } from '../../model/IDocument';
import { IDocumentService } from './IDocumentService';

export default class DocumentServiceMock implements IDocumentService {

    // US customers from Northwind database
    private mockData: IDocument[] = [
        {
            name: "Document A",
            url: "#",
            author: "Ada Lovelace",
            date: new Date()
        },
        {
            name: "Document B",
            url: "#",
            author: "Charles Babbage",
            date: new Date()
        },
        {
            name: "Document C",
            url: "#",
            author: "Grace Hopper",
            date: new Date()
        }
    ];

    public getDocuments (customerId: string):
        Promise<IDocument[]> {

        var result = this.mockData;

        return new Promise<IDocument[]>((resolve) => {
            resolve(result);
        });
    }
}
