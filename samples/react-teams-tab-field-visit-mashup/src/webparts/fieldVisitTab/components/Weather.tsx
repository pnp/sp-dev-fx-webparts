import * as React from 'react';
import styles from './FieldVisits.module.scss';

import { IWeatherService } from '../services/WeatherService/IWeatherService';
import { IWeatherConditions } from '../model/IWeatherConditions';

export interface IWeatherProps {
    service: IWeatherService;
    country: string;
    postalCode: string;
}

export interface IWeatherState {
    conditions?: IWeatherConditions;
    locationSignature?: string;
}

export class Weather extends React.Component<IWeatherProps, IWeatherState> {

    constructor(props: IWeatherProps) {
        super(props);
        this.state = {
            conditions: undefined,
            locationSignature: undefined
        };
    }

    public render(): React.ReactElement<IWeatherProps> {

        if (this.props.country &&
            this.props.country.toLowerCase() == "usa" &&
            this.props.postalCode) {

            const locationSignature = this.getLocationSignature(
                this.props.country, this.props.postalCode);

            if (this.state.conditions &&
                this.state.locationSignature === locationSignature ) {
                
                const c = this.state.conditions;
                const tempC = c.main.temp-273;
                const tempF = Math.round(9/5*tempC+32);

                return (
                <div className={styles.weather}>
                  <div className={styles.weatherContainer}>
                    <div className={styles.weatherrow}>
                      Weather conditions in {c.name}<hr />
                      <div className={styles.weathercolumn1 + ' ' + styles.weatherTemp}>
                        {tempF}&deg; F<br />
                        <img src={`http://openweathermap.org/img/w/${c.weather[0].icon}.png`} />
                      </div>
                      <div className={styles.weathercolumn2}>
                         {`${c.weather[0].main}`}<br />
                         {`Barometric pressure ${c.main.pressure}`}<br />
                         {`Humidity ${c.main.humidity}%`}<br />
                         {`Wind at ${c.wind.speed} MPH`}<br />
                      </div>
                    </div>
                  </div>
                </div>);
            } else {
                this.props.service.getConditions(this.props.postalCode)
                    .then((conditions: IWeatherConditions) => {
                        this.setState({
                            conditions: conditions,
                            locationSignature: locationSignature
                        });
                    });

                return (<div>Loading</div>);
            }
        } else {
            return (
                <div></div>
            );
        }
    }

    private getLocationSignature(country: string, postalCode: string) {
            return `${country}**${postalCode}`;
        }
}