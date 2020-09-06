import { IPhotoService } from './IPhotoService';
import { IPhotosResponse } from './IPhotosResponse';
import { IPhoto } from '../../model/IPhoto';

import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { ServiceScope } from '@microsoft/sp-core-library';
import { SPHttpClient } from '@microsoft/sp-http';

export default class PhotoService implements IPhotoService {

    private context: IWebPartContext;
    constructor(context: IWebPartContext, serviceScope: ServiceScope) {
        this.context = context;
    }

    public getPhotos(customerId: string): Promise<IPhoto[]> {

        var result = new Promise<IPhoto[]>((resolve, reject) => {

            const absoluteUrl = this.context.pageContext.web.absoluteUrl;
            const serverRelativeUrl = this.context.pageContext.web.serverRelativeUrl;

            this.context.spHttpClient
                .fetch(`${absoluteUrl}/_api/web/GetFolderByServerRelativeUrl('${serverRelativeUrl}/Photos/${customerId}')/Files`,
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
                .then((o: IPhotosResponse) => {
                    let files: IPhoto[] = [];
                    o.value.forEach((file) => {
                        files.push({
                            name: file.Name,
                            url: file.ServerRelativeUrl
                        });
                    });
                    resolve(files);
                });
                // TODO: Handle exception

            });
            return result;
        }

}
