import { IPhotoService } from './IPhotoService';
import { IPhoto } from '../../model/IPhoto';

export default class PhotoServiceMock implements IPhotoService {

    // US customers from Northwind database
    private mockData: IPhoto[] =
    [
        {
            name: "Surface 1",
            url:  "https://c.s-microsoft.com/en-au/CMSImages/Windows_Homepage_Hero_RS4_1920.jpg?version=85d2e084-dab6-5d93-619a-2af2c228e9a2"
        },
        {
            name: "Surface 2",
            url:  "https://c.s-microsoft.com/en-au/CMSImages/1920_panel2_hero_EdgeSurface.jpg?version=c9920e78-cb6c-64d4-c967-fd1d34791f6e"
        }
    ];

    public getPhotos(customerID: string): Promise<IPhoto[]> {

        var result = this.mockData;

        return new Promise<IPhoto[]>((resolve) => {
            resolve(result);
        });
    }
}
