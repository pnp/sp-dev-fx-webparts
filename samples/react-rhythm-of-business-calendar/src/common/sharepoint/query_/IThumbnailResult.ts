export interface IThumbnailResult {
    readonly fileName: string;
    readonly id: string;
    readonly serverRelativeUrl: string;
    readonly serverUrl: string;
    readonly thumbnailRenderer: {
        readonly fileVersion: number;
        readonly spItemUrl: string;
        readonly sponsorToken: string;
    };
}