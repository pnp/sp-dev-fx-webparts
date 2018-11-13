export interface ILuisMappingsDefinition {
    apps: Array<{
        appId: string;
        language: string;
        version: string;
    }>;
}

export enum LuisEntities {
    KeyPhrase = 'builtin.keyPhrase'
}

export enum LuisIntents {
    SearchByKeywords = 'PnP.SearchByKeywords',
    None = 'None'
}