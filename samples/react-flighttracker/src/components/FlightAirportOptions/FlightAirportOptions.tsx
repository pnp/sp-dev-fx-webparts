import * as React from 'react';

import { SelectAirportPicker } from '../SelectAirport/SelectAirportPicker';
import { SelectDate } from '../SelectDate/SelectDate';
import {
  SelectInformationType,
} from '../SelectInformationType/SelectInformationType';
import {
  useFlightAeroportOptionsStyles,
} from './useFlightAirportOptionsStyles';

export interface IFlightAeroportOptionsProps { }

export const FlightAirportOptions: React.FunctionComponent<IFlightAeroportOptionsProps> = (
  props: React.PropsWithChildren<IFlightAeroportOptionsProps>
) => {
  const { controlsStyles } = useFlightAeroportOptionsStyles();
  return (
    <>
      <div className={controlsStyles.container}>
        <div className={controlsStyles.containerGrid}>
          <SelectAirportPicker />
          <SelectDate />

          <SelectInformationType />
        </div>
      </div>
    </>
  );
};
