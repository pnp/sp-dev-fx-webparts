import * as React from 'react';
import styles from './CascadingManagedMetadata.module.scss';
import { ICascadingManagedMetadataProps } from './ICascadingManagedMetadataProps';
import { MSGraph } from '../services/MSGraph';
import { ITerms } from '../../interfaces';

import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { Map, ICoordinates } from "@pnp/spfx-controls-react/lib/Map";
import { MMDService } from '../services/MMDService';


const CascadingManagedMetadata: React.SFC<ICascadingManagedMetadataProps> = (props) => {

  const [countriesList, setCountriesList] = React.useState<IDropdownOption[]>([]);
  const [citiesList, setCitiesList] = React.useState<IDropdownOption[]>([]);
  const [selectedCityCoordinates, setSelectedCityCoordinates] = React.useState<string>(null);
  const [selectedCity, setSelectedCity] = React.useState<string>(null);
  const [showMap, setShowMap] = React.useState<boolean>(false);
  const [coordinates, setCoordinates] = React.useState<ICoordinates>({ latitude: null, longitude: null });
  const [messageBarStatus, setMessageBarStatus] = React.useState({
    type: MessageBarType.info,
    message: <span></span>,
    show: false
  });

  const LOG_SOURCE: string = "Cascading MMD -";

  React.useEffect(() => {
    _getCountries().then(countries => {
      if (countries) {
        const options: IDropdownOption[] = countries.value.map(c => ({ key: c.id, text: c.labels[0].name }));
        setCountriesList(options);
      } else {
        setCountriesList([]);
        clearData();
      }
    });
  }, [props.termSetId]); //* Run this also when the property termSetId changes

  //* Get the country terms i.e. level 1 children using Graph
  const _getCountries = async (): Promise<ITerms> => {
    try {
      let countries: ITerms = await MSGraph.Get(`/termStore/sets/${props.termSetId}/children`, "beta");
      setMessageBarStatus(state => ({ ...state, show: false }));
      console.debug("%s Retrieved countries. %o", LOG_SOURCE, countries);
      return countries;
    }
    catch (error) {
      console.error("%s Error retrieving countries. Details - %o", LOG_SOURCE, error);
      setMessageBarStatus({
        type: MessageBarType.error,
        message: <span>Error in retrieving countries. Please contact admin.</span>,
        show: true
      });
      return null;
    }
  };

  //* Get the city terms under a country i.e. level 2 children using Graph
  const _onCountryChange = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
    clearData();
    let countryTermId: string = item.key.toString();

    MMDService.GetTermsAsDropdownOptions(`/termStore/sets/${props.termSetId}/terms/${countryTermId}/children`, countryTermId, true)
      .then(options => {
        setCitiesList(options);
        //setShowMap(false);
        console.debug("%s Retrieved cities. %o", LOG_SOURCE, options);
        setMessageBarStatus({
          type: MessageBarType.warning,
          message: options.length > 0 ?
            <span>To see the map, please select a city. </span> :
            <span> No city terms in the selected country.</span>,
          show: true
        });
      })
      .catch(error => {
        console.error("%s Error retrieving cities. Details - %o", LOG_SOURCE, error);
        setMessageBarStatus({
          type: MessageBarType.error,
          message: <span>Error in retrieving cities. Please contact admin.</span>,
          show: true
        });
        setCitiesList([]);
      });

  };

  //* Extract co-ordinates from key of the dropdown option
  //* The key will contain the description of the term
  //* The description of the term will be of the format latitude;longitude
  const _onCityChange = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
    setSelectedCity(item.text);
    setSelectedCityCoordinates(item.key.toString());
    const [lat, long] = item.key.toString().split(';');
    const coordinates: ICoordinates = {
      latitude: isNaN(Number(lat)) ? null : Number(lat),
      longitude: isNaN(Number(long)) ? null : Number(long)
    };
    setCoordinates(coordinates);

    console.debug("%s Retrieved coordinates. %o", LOG_SOURCE, coordinates);

    if (coordinates.latitude && coordinates.longitude) {
      setShowMap(true);
      setMessageBarStatus(state => ({ ...state, show: false }));
    } else {
      setShowMap(false);
      setMessageBarStatus({
        type: MessageBarType.error,
        message: <span>To see the map, please check if the coordinates have been configured correctly.</span>,
        show: true
      });
    }
  };

  //* Clear the data related to cities and maps
  const clearData = () => {
    setCoordinates({ latitude: null, longitude: null });
    setSelectedCityCoordinates(null);
    setSelectedCity(null);
    setCitiesList([]);
    setShowMap(false);
  }

  return (
    <div>
      <Dropdown
        label="Country"
        placeHolder="Select a country"
        options={countriesList}
        defaultSelectedKey=""
        onChange={_onCountryChange}
        disabled={!(countriesList.length > 0)} />

      <Dropdown
        label="City"
        selectedKey={selectedCityCoordinates}
        placeHolder="Select a city"
        options={citiesList}
        onChange={_onCityChange}
        disabled={!(citiesList.length > 0)} />

      {
        showMap &&
        <Map
          titleText={`Map of our office in ${selectedCity}`}
          coordinates={coordinates}
          zoom={15}
          enableSearch={false} />
      }

      {
        messageBarStatus.show &&
        <div style={{ marginTop: "15px" }}>
          <MessageBar messageBarType={messageBarStatus.type}>
            {messageBarStatus.message}
          </MessageBar>
        </div>
      }
    </div>
  );
};

export default CascadingManagedMetadata;
