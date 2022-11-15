/* eslint-disable @typescript-eslint/no-var-requires */
import * as React from 'react';

import * as strings from 'FlightTrackerWebPartStrings';
import { Icon } from 'office-ui-fabric-react';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { Text } from 'office-ui-fabric-react/lib/Text';

import { useFlightTrackerStyles } from './useFlightTrackerStyles';

const  image = require("../../assets/Departing-bro.png");
export interface IFlightTrackerNoDataProps {}

export const FlightTrackerNoData: React.FunctionComponent<IFlightTrackerNoDataProps> = (
  props: React.PropsWithChildren<IFlightTrackerNoDataProps>
) => {
  const { controlStyles } = useFlightTrackerStyles();
  return (
    <>
      <Stack horizontalAlign="center" verticalAlign="center" tokens={{ childrenGap: 10 }} >
        <Text variant="large">{strings.NoDataAvailableForAirport}</Text>
       <Icon imageProps={{src: image , width:'100%'}} className={controlStyles.noDataFoundStyles}  />
      </Stack>
    </>
  );
};
