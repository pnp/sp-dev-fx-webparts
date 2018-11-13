import { ILuisResponseEntity, ILuisResponseIntent } from './ILuisGetIntentResponse';

export interface INlpResponse {

    /**
     * The corrected query is applicable.
     */
    alteredQuery: string;

    /**
     * The detected language of the input query.
     */
    detectedLanguage: string;

    /**
     * The recognized intent from the query
     */
    topScoringIntent: INlpIntent;

    /**
     * The list of entities recognized in the query.
     */
    entities: Array<ILuisResponseEntity>;

    /**
     * The final transformed query.
     */
    enhancedQuery: string;
}

export interface INlpIntent {
    detectedIntent: string;
    confidence: number;
}
