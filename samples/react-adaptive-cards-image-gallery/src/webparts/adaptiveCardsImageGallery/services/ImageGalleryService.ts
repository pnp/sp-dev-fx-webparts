import { ServiceKey, ServiceScope } from '@microsoft/sp-core-library';
import { PageContext } from '@microsoft/sp-page-context';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { sp } from '@pnp/sp/presets/all';

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

    public async getGalleryImages(listName: string, rowLimit: number): Promise<any[]> {
        try {
            let items: any = await sp.web.lists.getByTitle(listName).items
                .select("Id", "Title", "ImageLink", "NavigationURL")
                .orderBy("SortOrder")
                .top(rowLimit)
                .get();

            return Promise.resolve(items);
        }
        catch (error) {
            return Promise.reject(error);
        }
    }
}
