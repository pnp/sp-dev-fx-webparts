import * as _ from 'lodash';
import fetch, { RequestInit } from 'node-fetch';
import { ILuisGetIntentResponse } from '../models/ILuisGetIntentResponse';
import { Utilities } from './Utilities';
import * as format from 'sprintf-js';

export class LuisHelper {

    readonly BASE_URL = 'https://%s.api.cognitive.microsoft.com';

    private _subscriptionKey: string;
    private _authoringKey: string;
    private _baseUrl: string;
    private _appId: string;
    private _appVersion: string;
    private _isStaging: boolean;
    private _bingSpellCheckerSubscriptionKey: string;

    get appId(): string {
        return this._appId;
    }

    set appId(value: string) {
        this._appId = value;
    }

    get appVersion(): string {
        return this._appVersion;
    }

    set appVersion(value: string) {
        this._appVersion = value;
    }

    get isStaging(): boolean {
        return this._isStaging;
    }

    set isStaging(value: boolean) {
        this._isStaging = value;
    }

    constructor(subscriptionKey: string, authoringKey: string, azureRegion: string, bingSpellCheckerSubscriptionKey?: string) {

        this._subscriptionKey = subscriptionKey;
        this._authoringKey = authoringKey;
        this._baseUrl = format.sprintf(this.BASE_URL, azureRegion);

        this._bingSpellCheckerSubscriptionKey = bingSpellCheckerSubscriptionKey ? bingSpellCheckerSubscriptionKey : undefined;
    }

    async getIntentFromQuery(query: string): Promise<ILuisGetIntentResponse> {

        const request: RequestInit = {
            headers: {
                'Ocp-Apim-Subscription-Key': this._subscriptionKey,
                'Content-Type': 'application/json; charset=utf-8'
            },
            method: 'POST',
            body: JSON.stringify(`"${query}"`)
        };

        let url = `${this._baseUrl}/luis/v2.0/apps/${this._appId}`;

        if (this._isStaging)
            url = Utilities.addOrReplaceQueryStringParam(url, 'staging', 'true');

        if (this._bingSpellCheckerSubscriptionKey) {
            url = Utilities.addOrReplaceQueryStringParam(url, 'spellCheck', 'true');
            url = Utilities.addOrReplaceQueryStringParam(url, 'bing-spell-check-subscription-key', this._bingSpellCheckerSubscriptionKey);
        }

        try {
            const response = await fetch(url, request);

            if (!response.ok) {
                throw new Error(await response.text());
            } else {
                const json = await response.json();

                if (json.errors)
                    throw new Error(json.errors);
    
                return json as ILuisGetIntentResponse;
            }   

        } catch (error) {
            throw new Error(error);
        }        
    }
}
