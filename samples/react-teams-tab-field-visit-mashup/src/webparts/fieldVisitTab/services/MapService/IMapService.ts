import { IMapLocation } from '../../model/IMapLocation';

// US only for now
export interface IMapService {
    getLocation (address: string, city: string, state: string, zip: string):
        Promise<IMapLocation>;
    getMapApiKey (): string;
    getMapImageUrl (address: string, city: string, state: string,
        country: string, postalCode: string):
        Promise<string>;
}