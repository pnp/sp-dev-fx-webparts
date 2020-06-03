import { IWeatherService } from './IWeatherService';
import { IWeatherConditions } from '../../model/IWeatherConditions';

export default class WeatherServiceMock implements IWeatherService {

    // US customers from Northwind database
    private mockData: IWeatherConditions =
        {
            "coord": {
                "lon": -71.24,
                "lat": 42.4
            },
            "weather": [
                {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10d"
                },
                {
                    "id": 701,
                    "main": "Mist",
                    "description": "mist",
                    "icon": "50d"
                },
                {
                    "id": 721,
                    "main": "Haze",
                    "description": "haze",
                    "icon": "50d"
                }
            ],
            "base": "stations",
            "main": {
                "temp": 300.61,
                "pressure": 1016,
                "humidity": 66,
                "temp_min": 297.15,
                "temp_max": 304.15
            },
            "visibility": 16093,
            "wind": {
                "speed": 7.2,
                "deg": 180,
                "gust": 10.8
            },
            "clouds": {
                "all": 75
            },
            "dt": 1532542500,
            "sys": {
                "type": 1,
                "id": 1272,
                "message": 0.0051,
                "country": "US",
                "sunrise": 1532511070,
                "sunset": 1532563874
            },
            "id": 420016955,
            "name": "Boston",
            "cod": 200
        };

    public getConditions(customerID: string): Promise<IWeatherConditions> {

        var result = this.mockData;

        return new Promise<IWeatherConditions>((resolve) => {
            resolve(result);
        });
    }
}
