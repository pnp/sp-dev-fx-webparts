import { IWeatherConditions } from '../../model/IWeatherConditions';

// US only for now
export interface IWeatherService {
    getConditions (zip: string) : Promise<IWeatherConditions>;
}