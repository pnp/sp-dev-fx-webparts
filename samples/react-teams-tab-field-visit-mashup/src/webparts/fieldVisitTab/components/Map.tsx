import * as React from 'react';
import styles from './FieldVisits.module.scss';

import { IMapService } from '../services/MapService/IMapService';

export interface IMapProps {
    service: IMapService;
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
}

export interface IMapState {
    locationSignature?: string;
    mapUrl?: string;
}

export class Map extends React.Component<IMapProps, IMapState> {

    constructor(props: IMapProps) {
        super(props);
        this.state = {
            locationSignature: undefined,
            mapUrl: undefined
        };
    }

    public render(): React.ReactElement<IMapProps> {

        if (this.props.country &&
            this.props.country.toLowerCase() == "usa" &&
            this.props.postalCode) {

            const locationSignature = this.getLocationSignature(
                this.props.address, this.props.city, 
                this.props.state, this.props.country, 
                this.props.postalCode);
            
            if (locationSignature === this.state.locationSignature) {
                if (this.state.mapUrl !== '#') {
                    return (
                        <div className={styles.map}>
                            <img className={styles.mapImage}
                             src={this.state.mapUrl} />
                            <br />{`Map at ${this.props.address}, ${this.props.city}, ${this.props.state}`}
                        </div>);        
                } else {
                    return (<div>Map not found</div>);
                }

            } else {
                this.props.service.getMapImageUrl(this.props.address,
                    this.props.city, this.props.state, this.props.country,
                    this.props.postalCode)
    
                    .then((mapUrl) => {
                        this.setState({
                            locationSignature: locationSignature,
                            mapUrl: mapUrl
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

    private getLocationSignature(address: string, city: string, state: string,
        country: string, postalCode: string) {
        return `${address}**${city}**${state}**${country}**${postalCode}`;
    }

}