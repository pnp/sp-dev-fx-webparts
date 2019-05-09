import { IMapService } from './IMapService';
import { IMapLocation } from '../../model/IMapLocation';
import * as constants from '../../constants';

export default class MapServiceMock implements IMapService {

    // US customers from Northwind database
    private mockData: IMapLocation =
        {
            "authenticationResultCode": "ValidCredentials",
            "brandLogoUri": "http://dev.virtualearth.net/Branding/logo_powered_by.png",
            "copyright": "Copyright © 2018 Microsoft and its suppliers. All rights reserved. This API cannot be accessed and the content and any results may not be used, reproduced or transmitted in any manner without express written permission from Microsoft Corporation.",
            "resourceSets": [
                {
                    "estimatedTotal": 1,
                    "resources": [
                        {
                            "__type": "Location:http://schemas.microsoft.com/search/local/ws/rest/v1",
                            "bbox": [
                                42.3640072824293,
                                -71.1962504127409,
                                42.3717327175707,
                                -71.1823095872591
                            ],
                            "name": "1 Main St, Watertown, MA 02472",
                            "point": {
                                "type": "Point",
                                "coordinates": [
                                    42.36787,
                                    -71.18928
                                ]
                            },
                            "address": {
                                "addressLine": "1 Main St",
                                "adminDistrict": "MA",
                                "adminDistrict2": "Middlesex County",
                                "countryRegion": "United States",
                                "formattedAddress": "1 Main St, Watertown, MA 02472",
                                "locality": "Watertown",
                                "postalCode": "02472"
                            },
                            "confidence": "High",
                            "entityType": "Address",
                            "geocodePoints": [
                                {
                                    "type": "Point",
                                    "coordinates": [
                                        42.36787,
                                        -71.18928
                                    ],
                                    "calculationMethod": "Rooftop",
                                    "usageTypes": [
                                        "Display"
                                    ]
                                },
                                {
                                    "type": "Point",
                                    "coordinates": [
                                        42.3682298194267,
                                        -71.1888233197147
                                    ],
                                    "calculationMethod": "Rooftop",
                                    "usageTypes": [
                                        "Route"
                                    ]
                                }
                            ],
                            "matchCodes": [
                                "Good"
                            ]
                        }
                    ]
                }
            ],
            "statusCode": 200,
            "statusDescription": "OK",
            "traceId": "98ce3776abf44779a9b55622ef8b4be7|BN1CD9C1AB|7.7.0.0|Ref A: 0409F12560074D0B806E088436EF5946 Ref B: BN3EDGE0208 Ref C: 2018-07-26T01:03:06Z"
        };

    public getLocation (address: string, city: string, state: string, zip: string):
        Promise<IMapLocation> {

        var result = this.mockData;

        return new Promise<IMapLocation>((resolve) => {
            resolve(result);
        });
    }

    public getMapApiKey(): string {
        return constants.mapApiKey;
    }

    public getMapImageUrl(address: string, city: string, state: string,
        country: string, postalCode: string): Promise<string> {

            return new Promise<string>((resolve, reject) => {
                const apiKey = this.getMapApiKey();
                const latitude = 42.36787;
                const longitude = -71.18928;
                resolve (`https://dev.virtualearth.net/REST/v1/Imagery/Map/Road/${latitude},${longitude}/16?mapSize=450,600&pp=${latitude},${longitude}&key=${apiKey}`);
        
            });
    }

}
