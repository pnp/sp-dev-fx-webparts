import * as React from 'react';

import {
  Stack,
  Text,
} from 'office-ui-fabric-react';

import { IAirport } from '../../models/IAirport';
import { useSelectAirportStyles } from './useSelectAirportStyles';

export interface IAirportProps {
  airport: IAirport;
  onSelected?: (airport: IAirport) => void;
}

export const Airport: React.FunctionComponent<IAirportProps> = (props: React.PropsWithChildren<IAirportProps>) => {
  const { airport, onSelected } = props;
  const city =  React.useMemo(() => airport?.municipality ? `${airport?.municipality},` : "", [airport]);
  const { IATACodeStyle, airportContainerStyles, airportItemStyles, controlStyles, airportNameStyles } = useSelectAirportStyles();
  return (
    <>
      <Stack
       styles={airportItemStyles}
        onClick={(ev) => {
         if (onSelected) {onSelected(airport); }
        }}
      >
        <Stack styles={airportContainerStyles}>
          <Stack horizontal verticalAlign="center" horizontalAlign="start" tokens={{ childrenGap: 10 }}>
            <Text styles={IATACodeStyle}>{airport.iata_code}</Text>
            <Text variant="medium" styles={airportNameStyles}>{city} {airport.name}</Text>
          </Stack>
        </Stack>
        <div className={controlStyles.separator} />
      </Stack>
    </>
  );
};
