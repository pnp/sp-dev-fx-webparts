import { IDocument } from '../../model/IDocument';
import { IDocumentService } from './IDocumentService';
import { IDocumentsResponse } from './IDocumentsResponse';

import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { ServiceScope } from '@microsoft/sp-core-library';
import { SPHttpClient } from '@microsoft/sp-http';

export default class DocumentService implements IDocumentService {

    private context: IWebPartContext;
    constructor(context: IWebPartContext, serviceScope: ServiceScope) {
        this.context = context;
    }

    public getDocuments(customerId: string):
        Promise<IDocument[]> {

        var result = new Promise<IDocument[]>((resolve, reject) => {

            const siteUrl = this.context.pageContext.web.absoluteUrl;

            this.context.spHttpClient
                .fetch(`${siteUrl}/_api/lists/GetByTitle('Documents')/items?$filter=Customer eq '${customerId}'&$select=Title,FileLeafRef,FileRef,UniqueId,Modified,Author/Name,Author/Title&$expand=Author/Id&$orderby=Title`,
                    SPHttpClient.configurations.v1,
                    {
                        method: 'GET',
                        headers: { "accept": "application/json" },
                        mode: 'cors',
                        cache: 'default'
                    })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw (`Error ${response.status}: ${response.statusText}`);
                    }
                })
                .then((o: IDocumentsResponse) => {
                    let docs: IDocument[] = [];
                    o.value.forEach((doc) => {
                        docs.push({
                            name: doc.FileLeafRef,
                            url: doc.FileRef,
                            author: doc.Author.Title,
                            date: new Date(doc.Modified)
                        });
                    });
                    resolve(docs);
                });
            // TODO: Handle exception

        });

        return result;
    }

}
