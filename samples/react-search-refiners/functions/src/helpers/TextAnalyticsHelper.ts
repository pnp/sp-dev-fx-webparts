import fetch, { RequestInit } from 'node-fetch';
import * as format from 'sprintf-js';

export class TextAnalyticsHelper {

    readonly BASE_URL = 'https://%s.api.cognitive.microsoft.com';
    readonly SCORE_THRESHOLD = 0.70;

    private _subscriptionKey: string;
    private _baseUrl: string;

    constructor(subscriptionKey: string, azureRegion: string) {

        this._subscriptionKey = subscriptionKey;
        this._baseUrl = format.sprintf(this.BASE_URL, azureRegion);
    }

    /**
     * Detects the input query language using the Microsoft Text Analytics Service
     * @param query the query to analyze
     */
    async detectLanguage(query: string): Promise<string> {

        const request: RequestInit = {
            headers: {
                'Ocp-Apim-Subscription-Key': this._subscriptionKey,
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=utf-8'
            },
            method: 'POST',
            body: JSON.stringify(
                    {
                        documents: [{
                            id: 1,
                            text: query
                        }]
                    })
        };

        const url = `${this._baseUrl}/text/analytics/v2.0/languages`;

        try {
            const response = await fetch(url, request);
            const json = await response.json();

            // tslint:disable-next-line:curly
            if (json.statusCode) {
                throw new Error(json.message);
            } else {
                // Get only language with confidence geater than 70%
                const isoLanguageName = json.documents[0].detectedLanguages.filter(language => {
                    return language.score >  this.SCORE_THRESHOLD;
                });

                return isoLanguageName.length > 0 ? isoLanguageName[0].iso6391Name : undefined;
            }

        } catch (error) {
            throw new Error(error);
        }
    }
}
