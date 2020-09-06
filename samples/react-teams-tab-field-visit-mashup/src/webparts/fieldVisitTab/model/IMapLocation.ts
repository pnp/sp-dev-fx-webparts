export interface IPoint {
    type: string;
    coordinates: number[];
}

export interface IAddress {
    addressLine: string;
    adminDistrict: string;
    adminDistrict2: string;
    countryRegion: string;
    formattedAddress: string;
    locality: string;
    postalCode: string;
}

export interface IGeocodePoint {
    type: string;
    coordinates: number[];
    calculationMethod: string;
    usageTypes: string[];
}

export interface IResource {
    __type: string;
    bbox: number[];
    name: string;
    point: IPoint;
    address: IAddress;
    confidence: string;
    entityType: string;
    geocodePoints: IGeocodePoint[];
    matchCodes: string[];
}

export interface IResourceSet {
    estimatedTotal: number;
    resources: IResource[];
}

export interface IMapLocation {
    authenticationResultCode: string;
    brandLogoUri: string;
    copyright: string;
    resourceSets: IResourceSet[];
    statusCode: number;
    statusDescription: string;
    traceId: string;
}
