import * as React from 'react';

import * as strings from 'FlightTrackerWebPartStrings';
import {
  IconButton,
  Stack,
  Text,
} from 'office-ui-fabric-react';

import { IAirport } from '../../models/IAirport';
import { useSelectAirportStyles } from './useSelectAirportStyles';

export interface IAirportProps {
  airport: IAirport;
  onRemove?: (airport: IAirport) => void;
}

export const SelectedAirport: React.FunctionComponent<IAirportProps> = (
  props: React.PropsWithChildren<IAirportProps>
) => {
  const { airport, onRemove } = props;

  const {
    selectedAirPortIATACodeStyle,
    selectedAirportContainerStyles,
    selectedAirportItemStyles,

    airportNameStyles,
  } = useSelectAirportStyles();
  return (
    <>
      <Stack styles={selectedAirportItemStyles}>
        <Stack styles={selectedAirportContainerStyles}>
          <Stack horizontal verticalAlign="center" horizontalAlign="start" tokens={{ childrenGap: 10 }}>
            <Text styles={selectedAirPortIATACodeStyle}>{airport.iata_code}</Text>
            <Text variant="medium" block nowrap styles={airportNameStyles} title={airport.name}>
              {airport.name}
            </Text>
            <IconButton
              iconProps={{ iconName: "Cancel" }}
              title={strings.Remove}
              onClick={(ev) => {
                 onRemove(airport);
              }}
            />
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};
