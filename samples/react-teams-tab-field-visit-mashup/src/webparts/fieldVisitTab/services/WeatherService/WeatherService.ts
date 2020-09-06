import { IWeatherService } from './IWeatherService';
import { IWeatherConditions } from '../../model/IWeatherConditions';

import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { ServiceScope } from '@microsoft/sp-core-library';
import { HttpClient } from '@microsoft/sp-http';
import * as constants from '../../constants';

export default class WeatherService implements IWeatherService {

    private context: IWebPartContext;
    constructor(context: IWebPartContext, serviceScope: ServiceScope) {
        this.context = context;
    }

    public getConditions (zip: string) : Promise<IWeatherConditions> {
        
        var result: Promise<IWeatherConditions> = new Promise<IWeatherConditions>
            ((resolve, reject) => {

            this.context.httpClient
            .fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${constants.owmApiKey}`,
                    HttpClient.configurations.v1,
                    {
                        method: 'GET',
                        headers: {"accept": "application/json"},
                        mode: 'cors',
                        cache: 'default'
                    })
            .then ((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw (`Error ${response.status}: ${response.statusText}`);
                }
            })
            .then ((o: IWeatherConditions) => {
                resolve(o);
            });
            // TODO: Handle exception
        });
        return result;
    }
}
