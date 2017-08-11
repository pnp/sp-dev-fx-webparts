declare interface IAppSettings {
    tenantUrl: string;
    assetsUrl: string;
    webSearchUrl: string;
}

declare module 'appSettings' {
    const appSettings: IAppSettings;
    export = appSettings;
}