import { IPhoto } from '../../model/IPhoto';

export interface IPhotoService {

    getPhotos(customerId: string): Promise<IPhoto[]>;

}