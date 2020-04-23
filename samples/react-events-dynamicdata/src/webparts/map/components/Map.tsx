import * as React from 'react';
import styles from './Map.module.scss';
import { IMapProps, IMapState } from './';
import { HttpClient } from '@microsoft/sp-http';
import { Placeholder } from '@pnp/spfx-controls-react/lib/Placeholder';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { WebPartTitle } from '@pnp/spfx-controls-react/lib/WebPartTitle';

/**
 * Map component. Renders map for the specified location
 */
export class Map extends React.Component<IMapProps, IMapState> {
  constructor(props: IMapProps) {
    super(props);

    // set default state
    this.state = {
      error: undefined,
      loading: false,
      coordinates: []
    };
  }

  /**
   * Resolves coordinates for the address set through component's properties
   */
  private _resolveCoordinates(): void {
    // nothing to do if the parent web part hasn't been configured
    if (this.props.needsConfiguration) {
      return;
    }

    if (!this.props.address) {
      return;
    }

    // indicate that the component will be loading its data
    this.setState({
      error: undefined,
      loading: true,
      coordinates: []
    });

    // get coordinates for the address specified through component's properties
    this.props.httpClient
      .get(`https://dev.virtualearth.net/REST/v1/Locations?q=${this.props.address}&key=${this.props.bingMapsApiKey}`, HttpClient.configurations.v1)
      .then((res) => {
        return res.json();
      })
      .then((data): void => {
        if (data &&
          data.statusCode === 200) {
          // store coordinates and indicate that loading data is finished
          this.setState({
            loading: false,
            coordinates: data.resourceSets[0].resources[0].point.coordinates
          });
        }
        else {
          // communicate error from Bing maps API
          this.setState({
            loading: false,
            error: data.statusDescription
          });
        }
      }, (error: any): void => {
        // communicate generic errors
        this.setState({
          loading: false,
          error: error
        });
      });
  }

  public componentDidMount(): void {
    // get coordinates for the current address after the component has been
    // instantiated
    this._resolveCoordinates();
  }

  public componentDidUpdate?(prevProps: IMapProps, prevState: IMapState, snapshot: any): void {
    if (prevProps.address !== this.props.address)  {
      // get coordinates for the new address
      this._resolveCoordinates();
    }
  }

  public render(): React.ReactElement<IMapProps> {
    const { needsConfiguration, address, onConfigure, dynamicAddress, width, height, displayMode, title, updateProperty } = this.props;
    const { coordinates, loading } = this.state;

    return (
      <div className={styles.map}>
        <WebPartTitle displayMode={displayMode}
          title={title}
          updateProperty={updateProperty} />
        {needsConfiguration &&
          <Placeholder
            iconName='Edit'
            iconText='Configure your web part'
            description='Please configure the web part.'
            buttonLabel='Configure'
            onConfigure={onConfigure} />
        }
        {!needsConfiguration &&
          !loading &&
          !address &&
          dynamicAddress &&
          <Placeholder
            iconName='Globe2'
            iconText='Map'
            description='Select a location' />
        }
        {!needsConfiguration &&
          loading &&
          <Spinner size={SpinnerSize.large} label='Loading map...' />}
        {!needsConfiguration &&
          address &&
          coordinates.length > 0 &&
          <iframe width={width} height={height} frameBorder="0" src={`https://www.bing.com/maps/embed?h=400&w=500&cp=${coordinates[0]}~${coordinates[1]}&lvl=15&typ=d&sty=r&src=SHELL&FORM=MBEDV8`} scrolling="no">
          </iframe>
        }
      </div>
    );
  }
}
