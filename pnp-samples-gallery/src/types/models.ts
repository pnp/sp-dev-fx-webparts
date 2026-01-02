export type SampleMetadataKey =
    | "SAMPLE-TYPE"
    | "CLIENT-SIDE-DEV"
    | "SPFX-VERSION";

export interface SampleMetadataEntry {
    key: string;
    value: string;
}

export interface SampleThumbnail {
    url: string;
    alt?: string;
}

export interface SampleAuthor {
    gitHubAccount?: string;
    name?: string;
    pictureUrl?: string;
}

export interface PnPSample {
    name: string;
    source?: string;
    title: string;
    shortDescription?: string;
    url: string;
    downloadUrl?: string;
    updateDateTime?: string;
    metadata?: SampleMetadataEntry[];
    thumbnails?: SampleThumbnail[];
    authors?: SampleAuthor[];
    categories?: string[];
}
