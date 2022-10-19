import * as React from 'react';
import { ICascadingManagedMetadataProps } from './ICascadingManagedMetadataProps';
import { MSGraph } from '../services/MSGraph';
import { ICMMDDropdownOption, IProperty, ITerms } from '../../interfaces';

import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { Map, ICoordinates } from "@pnp/spfx-controls-react/lib/Map";
import { MMDService } from '../services/MMDService';
import { find, isEmpty } from '@microsoft/sp-lodash-subset';


const CascadingManagedMetadata: React.SFC<ICascadingManagedMetadataProps> = (props) => {

  const [countriesList, setCountriesList] = React.useState<IDropdownOption[]>([]);
  const [citiesList, setCitiesList] = React.useState<ICMMDDropdownOption[]>([]);
  const [selectedCityKey, setselectedCityKey] = React.useState<string>(null);
  const [selectedCity, setSelectedCity] = React.useState<string>(null);
  const [showMap, setShowMap] = React.useState<boolean>(false);
  const [coordinates, setCoordinates] = React.useState<ICoordinates>({ latitude: null, longitude: null });
  const [messageBarStatus, setMessageBarStatus] = React.useState({
    type: MessageBarType.info,
    message: <span></span>,
    show: false
  });

  const LOG_SOURCE: string = "Cascading MMD -";

  //* Check if the term set has a property called UsedForShowingMaps
  const _checkIfTermsetIsUsedForShowingMaps = async (): Promise<boolean> => {
    try {
      const termsetData = await MSGraph.Call('get', `/termStore/sets/${props.termSetId}`, "beta", {}, ["properties"]);
      const termsetProperties: IProperty[] = termsetData.properties;
      console.debug("%s Retrieved termset properties. %o", LOG_SOURCE, termsetProperties);

      if (isEmpty(termsetProperties)) {
        return false;
      }
      return find(termsetProperties, (p: IProperty) => p.key === "UsedForShowingMaps")?.value === "true";

    }
    catch (error) {
      console.error("%s Error retrieving termset properties. Details - %o", LOG_SOURCE, error);
      setMessageBarStatus({
        type: MessageBarType.error,
        message: <span>Error retrieving termset properties. Please contact admin.</span>,
        show: true
      });
      return null;
    }
  };

  //* Get the country terms i.e. level 1 children using Graph
  const _getCountries = async (): Promise<ITerms> => {
    try {
      let countries: ITerms = await MSGraph.Call('get', `/termStore/sets/${props.termSetId}/children`, "beta");
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
  const _onCountryChange = async (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): Promise<void> => {

    try {
      clearData();
      let countryTermId: string = item.key.toString();

      let cities: ICMMDDropdownOption[] = await MMDService
        .GetTermsAsDropdownOptions(
          `/termStore/sets/${props.termSetId}/terms/${countryTermId}/children`,
          ["id", "labels", "properties"],
          countryTermId,
          true);
      setCitiesList(cities);
      setMessageBarStatus({
        type: MessageBarType.warning,
        message: cities.length > 0 ?
          <span>To see the map, please select a city. </span> :
          <span> No city terms in the selected country.</span>,
        show: true
      });
      console.debug("%s Retrieved cities. %o", LOG_SOURCE, cities);
    }
    catch (error) {
      console.error("%s Error retrieving cities. Details - %o", LOG_SOURCE, error);
      setMessageBarStatus({
        type: MessageBarType.error,
        message: <span>Error in retrieving cities. Please contact admin.</span>,
        show: true
      });
      setCitiesList([]);
    }

  };


  const _onCityChange = (event: React.FormEvent<HTMLDivElement>, item: ICMMDDropdownOption): void => {

    const { text, key, data } = item;

    setSelectedCity(text);
    setselectedCityKey(key.toString());
    setCoordinates(data);

    console.debug("%s Retrieved coordinates. %o", LOG_SOURCE, data);

    if (data.latitude && data.longitude) {
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
    setselectedCityKey(null);
    setSelectedCity(null);
    setCitiesList([]);
    setShowMap(false);
  };

  const _start = async (): Promise<void> => {

    let isTermsetUsedForShowingMaps: boolean = await _checkIfTermsetIsUsedForShowingMaps();

    if(isTermsetUsedForShowingMaps === null) {
      return;
    }

    if (!isTermsetUsedForShowingMaps) {
      setCountriesList([]);
      clearData();
      setMessageBarStatus({
        type: MessageBarType.warning,
        message: <span>The selected term set is not used for showing maps.</span>,
        show: true
      });
      return;
    }

    let countries: ITerms = await _getCountries();

    if(countries === null) {
      return;
    }

    if (isEmpty(countries.value)) {
      setCountriesList([]);
      clearData();
      setMessageBarStatus({
        type: MessageBarType.warning,
        message: <span>No country terms in the selected termset. Please contact admin.</span>,
        show: true
      });
      return;
    }

    // Renamed to avoid shadowed variables
    let localCountriesList: IDropdownOption[] = countries.value.map(c => ({ key: c.id, text: c.labels[0].name }));
    setCountriesList(localCountriesList);

  };

  React.useEffect(() => {
    _start();
  }, [props.termSetId]); //* Run this also when the property termSetId changes



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
        selectedKey={selectedCityKey}
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
