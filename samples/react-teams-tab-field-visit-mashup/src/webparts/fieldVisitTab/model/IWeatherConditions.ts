export interface IWeatherCoord {
    lon: number;
    lat: number;
}

export interface IWeather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface IGauges {
    temp: number;
    pressure: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
}

export interface IWind {
    speed: number;
    deg: number;
    gust: number;
}

export interface IClouds {
    all: number;
}

export interface ISys {
    type: number;
    id: number;
    message: number;
    country: string;
    sunrise: number;
    sunset: number;
}

export interface IWeatherConditions {
    coord: IWeatherCoord;
    weather: IWeather[];
    base: string;
    main: IGauges;
    visibility: number;
    wind: IWind;
    clouds: IClouds;
    dt: number;
    sys: ISys;
    id: number;
    name: string;
    cod: number;
}
