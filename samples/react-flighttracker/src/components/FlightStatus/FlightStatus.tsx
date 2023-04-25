import * as React from 'react';

import { Text } from 'office-ui-fabric-react';
import { Stack } from 'office-ui-fabric-react/lib/Stack';

import { EStatus } from '../../constants';
import { IFlightStatus } from '../../models/IFlightStatus';
import { useFlightStatusStyles } from './useFlightStatusStyles';

export interface IFlightStatusProps {
  flightInfo: IFlightStatus;
}

export const FlightStatus: React.FunctionComponent<IFlightStatusProps> = (
  props: React.PropsWithChildren<IFlightStatusProps>
) => {
  const { flightInfo } = props;
  const { status, date } = flightInfo;
  const { getFlightStatusStyles } = useFlightStatusStyles();


  const statusDescription = React.useMemo((): string => {
    switch (status) {
      case EStatus.Unknown:
      case EStatus.CanceledUncertain:
        return "Not Available";
        break;
      default:
        return status;
        break;
    }
  }, [status]);

  return (
    <>
      <Stack horizontalAlign="start">
        <Stack horizontalAlign="start" verticalAlign="center">
          <Text variant="medium" styles={getFlightStatusStyles(status)}>
            {statusDescription}
          </Text>
          <Text variant="small"> {date}</Text>
        </Stack>
      </Stack>
    </>
  );
};
