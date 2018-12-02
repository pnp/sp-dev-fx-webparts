export interface INlpResponse {

    /**
     * The detected language of the query ('fr', 'en', etc.)
     */
    detectedLanguage: string;

    /**
     * The corrected query if the original query had grammar syntax mistakes 
     */
    alteredQuery?: string;

    /**
     * The recognized intent from the query
     */
    topScoringIntent: NlpIntent;

    /**
     * Recognized entities in the query
     */
    entities: INlpEntity[];

    /**
     * The resulting SharePoint search query
     */
    enhancedQuery: string;
}

export interface INlpEntity {

    /**
     * The LUIS entitiy name
     */
    entity: string;

    /**
     * Type of the entity
     */
    type: string;

    /**
     * All resolutions for the entitiy (i.e. recognized occurences)
     */
    resolution: {
        values: string[];
    };
}

export interface NlpIntent {
    detectedIntent: string;
    confidence: number;
}