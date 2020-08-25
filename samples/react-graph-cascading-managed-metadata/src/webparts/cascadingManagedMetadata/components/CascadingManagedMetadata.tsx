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
  const [coordinates, setCoordinates] = React.useState<ICoordinates>({ latitude: null, longitude: null });

  React.useEffect(() => {
    _getCountries().then(countries => {
      const options: IDropdownOption[] = countries.value.map(c => ({ key: c.id, text: c.labels[0].name }));
      setCountriesList(options);
    });
  }, []);

  //* Get the country terms i.e. level 1 children using Graph
  const _getCountries = async (): Promise<ITerms> => {
    let countries: ITerms = await MSGraph.Get(`/termStore/sets/${props.termSetId}/children`, "beta");
    return (countries);
  };

  //* Get the city terms under a country i.e. level 2 children using Graph
  const _onCountryChange = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
    setCoordinates({ latitude: null, longitude: null });
    setSelectedCityCoordinates(null);
    setSelectedCity(null);
    let countryTermId: string = item.key.toString();

    MMDService.GetTermsAsDropdownOptions(`/termStore/sets/${props.termSetId}/terms/${countryTermId}/children`, countryTermId, true).then(options => {
      setCitiesList(options);
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
  };

  return (
    <div>
      <Dropdown
        label="Country"
        placeHolder="Select a country"
        options={countriesList}
        onChange={_onCountryChange} />

      <Dropdown
        label="City"
        selectedKey={selectedCityCoordinates}
        placeHolder="Select a city"
        options={citiesList}
        onChange={_onCityChange} />
      {
        coordinates.latitude && coordinates.longitude ?
          (
            <React.Fragment>
              <Map
                titleText={`Map of our office in ${selectedCity}`}
                coordinates={coordinates}
                zoom={15}
                enableSearch={false} />
            </React.Fragment>
          ) :
          (
            <div style={{ marginTop: "15px" }}>
              <MessageBar messageBarType={MessageBarType.warning}>
                {selectedCity ? "To see the map, please check if the coordinates have been configured correctly."
                  : "To see the map, please select a city."}
              </MessageBar>
            </div>
          )
      }
    </div>
  );
};

export default CascadingManagedMetadata;
