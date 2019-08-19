import { ServiceKey, ServiceScope } from '@microsoft/sp-core-library';
import { PageContext } from '@microsoft/sp-page-context';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import * as pnp from "sp-pnp-js";

export interface IImageGalleryService {
    getGalleryImages: (listName: string, rowLimit: number) => Promise<any[]>;
}

export class ImageGalleryService implements IImageGalleryService {
    public static readonly serviceKey: ServiceKey<IImageGalleryService> = ServiceKey.create<IImageGalleryService>('ImageGallery:ImageGalleryService', ImageGalleryService);
    private _pageContext: PageContext;    

    constructor(serviceScope: ServiceScope) {
        serviceScope.whenFinished(() => {
            this._pageContext = serviceScope.consume(PageContext.serviceKey);
        });
    }

    public getGalleryImages(listName: string, rowLimit: number): Promise<any[]> {
        const xml = `<View>
                        <ViewFields>
                            <FieldRef Name='ID' />
                            <FieldRef Name='Title' />
                            <FieldRef Name='ImageLink' />
                            <FieldRef Name='NavigationURL' />
                        </ViewFields>
                        <Query>
                            <OrderBy>
                                <FieldRef Name='SortOrder' />
                            </OrderBy>
                        </Query>
                        <RowLimit>` + rowLimit + `</RowLimit>
                    </View>`;

        const q: any = {
            ViewXml: xml,
        };

        return this._ensureList(listName).then((list) => {
            if (list) {
                return pnp.sp.web.lists.getByTitle(listName).getItemsByCAMLQuery(q).then((items: any[]) => {
                    return Promise.resolve(items);
                });
            }
        });
    }

    private _ensureList(listName: string): Promise<pnp.List> {
        if (listName) {
            return pnp.sp.web.lists.ensure(listName).then((listEnsureResult) => Promise.resolve(listEnsureResult.list));
        }
    }
}
