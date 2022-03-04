import { Callout } from '@microsoft/office-ui-fabric-react-bundle';
import { randomString } from '@spfxappdev/utility';
import * as strings from 'MapWebPartStrings';
import { Icon, Label, Separator } from 'office-ui-fabric-react';
import * as React from 'react';
import { IMarkerCategory } from '../../IMapProps';
import { MarkerIcon } from '../../MarkerIcon';
import styles from './LegendPlugin.module.scss';



export interface ILegendPluginProps {
    markerCategories: IMarkerCategory[];
    isZoomControlVisible: boolean;
}

interface ILegendPluginState {
    isCalloutVisible: boolean;
}

export default class LegendPlugin extends React.Component<ILegendPluginProps, ILegendPluginState> {

    public state: ILegendPluginState = {
        isCalloutVisible: false
    };

    private randomId: string;

    constructor(props: ILegendPluginProps) {
        super(props);
        this.randomId = `map_legend_${randomString(6)}`;
    }
    
    public render(): React.ReactElement<ILegendPluginProps> {

        let cssClass = styles['map-plugin-legend'];
        if(this.props.isZoomControlVisible) {
            cssClass += ' ' + styles['map-plugin-legend-bottom'];
        }

        return (
            <div className={`leaflet-top leaflet-left ${cssClass}`}>
                <div className="leaflet-control leaflet-bar">
                <button 
                    type="button" 
                    id={this.randomId} 
                    onClick={() => {
                        const isVisible: boolean = this.state.isCalloutVisible ? false : true;

                        this.setState({
                            isCalloutVisible: isVisible
                        });
                    }}
                >
                    <Icon iconName="Info" />
                </button>
                <Callout 
                    target={`#${this.randomId}`} 
                    onDismiss={() => { this.setState({ isCalloutVisible: false }); }}
                    hidden={!this.state.isCalloutVisible}>
                    <div className='map-legend'>
                        <Label className="map-legend-title">{strings.LegendLabel}</Label>
                        <Separator />
                        {this.props.markerCategories.map((cat: IMarkerCategory): JSX.Element => {
                        return (
                        <div key={`legend_${cat.id}`} className="map-legend-marker-item">
                            <div className='map-legend-marker-item-icon'>
                                <div className='map-legend-marker-wrapper'>
                                    <div style={{}}>
                                        <MarkerIcon {...cat.iconProperties} /> 
                                    </div>
                                </div>
                            </div>
                            <Label>{cat.name}</Label>
                        </div>);
                        })}
                    </div>
                </Callout>
                </div>
            </div>);
    }
}