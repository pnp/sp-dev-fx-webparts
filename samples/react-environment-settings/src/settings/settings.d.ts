declare interface ISettings {
    MessageOfTheDay: string;
}

declare module '*.settings' {
    const settings: ISettings;
    export = settings;
}