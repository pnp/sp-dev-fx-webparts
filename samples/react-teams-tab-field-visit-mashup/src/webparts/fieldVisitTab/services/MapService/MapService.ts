import { IMapService } from './IMapService';
import { IMapLocation } from '../../model/IMapLocation';

import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { ServiceScope } from '@microsoft/sp-core-library';
import { HttpClient } from '@microsoft/sp-http';
import * as constants from '../../constants';

export default class MapService implements IMapService {

    private context: IWebPartContext;
    constructor(context: IWebPartContext, serviceScope: ServiceScope) {
        this.context = context;
    }

    public getLocation(address: string, city: string, state: string, zip: string):
        Promise<IMapLocation> {

        // Remove "." and trim address to make Bing maps happy
        const adjustedAddress = address.replace('.',' ').trim();
        var result = new Promise<IMapLocation>((resolve, reject) => {
            this.context.httpClient
                .fetch(`https://dev.virtualearth.net/REST/v1/Locations/US/${state}/${zip}/${city}/${adjustedAddress}?key=${constants.mapApiKey}`,
                    HttpClient.configurations.v1,
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
                .then((o: IMapLocation) => {
                    resolve(o);
                })
                .catch((error: any) => {
                    reject(error);
                });

        });

        return result;
    }

    public getMapApiKey(): string {
        return constants.mapApiKey;
    }

    public getMapImageUrl(address: string, city: string, state: string,
        country: string, postalCode: string):
        Promise<string> {

        return new Promise<string>((resolve, reject) => {

            if (country &&
                country.toLowerCase() == "usa" &&
                postalCode) {

                const locationSignature = this.getLocationSignature(
                    address, city, state, country, postalCode);

                if (this.locationSignature === locationSignature) {

                    // If here, the cached location is valid
                    resolve (this.getMapImageUrlFromLocation(this.location));

                } else {

                    // If here we have no location cached; call the web service
                    this.getLocation(address, city, state, postalCode)
                        .then((location: IMapLocation) => {
                            this.location = location;
                            this.locationSignature = locationSignature;
                            resolve (this.getMapImageUrlFromLocation(this.location));
                        })
                        .catch ((error: string) => {
                            resolve('#');
                        });
                    }
            }
        });
    }

    private locationSignature: string;
    private location: IMapLocation;

    private getLocationSignature(address: string, city: string, state: string,
        country: string, postalCode: string) {
        return `${address}**${city}**${state}**${country}**${postalCode}`;
    }

    private getMapImageUrlFromLocation(location: IMapLocation) {

        const coordinates =
            location.resourceSets[0].resources[0].point.coordinates;
        const latitude = coordinates[0];
        const longitude = coordinates[1];

        const apiKey = this.getMapApiKey();

        return `https://dev.virtualearth.net/REST/v1/Imagery/Map/Road/${latitude},${longitude}/16?mapSize=450,600&pp=${latitude},${longitude}&key=${apiKey}`;
    }

}
