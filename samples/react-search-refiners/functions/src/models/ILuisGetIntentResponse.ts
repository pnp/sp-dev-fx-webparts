import { LuisIntents, LuisEntities } from "../functions/enhanceQuery/config/ILuisMappingsDefinition";

export interface ILuisGetIntentResponse {
    query: string;
    entities: Array<ILuisResponseEntity>;
    alteredQuery?: string;
    topScoringIntent: ILuisResponseIntent;
    /**
     * Intents scores. Only visible in verbose mode
     */
    intents?: Array<ILuisResponseIntent>;
}

export interface ILuisResponseIntent {
    intent: LuisIntents;
    score: number;
}

export interface ILuisResponseEntity {
    entity: string;
    type: LuisEntities;
    startIndex: number;
    endIndex: number;
    resolution?: {
        values: Array<string>;
    };
    role?: string;
}
