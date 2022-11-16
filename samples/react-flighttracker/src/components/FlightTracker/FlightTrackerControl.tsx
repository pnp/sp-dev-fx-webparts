import * as React from 'react';

import { useAtom } from 'jotai';
import { Stack } from 'office-ui-fabric-react';

import { WebPartTitle } from '@pnp/spfx-controls-react/lib/WebPartTitle';

import { globalState } from '../../jotai/atoms/globalState';
import { FlightSelector } from '../FlightSelector/FlightSelector';
import { FlightTrackerList } from '../FlightTrackerList/FlightTrackerList';
import { IFlightTrackerProps } from './IFlightTrackerProps';

export const FlightTrackerControl: React.FunctionComponent<IFlightTrackerProps> = (
  props: React.PropsWithChildren<IFlightTrackerProps>
) => {
  const { isDarkTheme, hasTeamsContext, currentTheme, context, title, updateProperty, displayMode,numberItemsPerPage , webpartContainerWidth } = props;
  const  [,setGlobalState] = useAtom(globalState);

  React.useEffect(() => {
    setGlobalState((prevState) =>  { return {
     ...prevState,
      isDarkTheme: isDarkTheme,
      hasTeamsContext: hasTeamsContext,
      currentTheme: currentTheme,
      context: context,
      numberItemsPerPage: numberItemsPerPage,
      webpartContainerWidth: webpartContainerWidth,

  }});
  }, [isDarkTheme, hasTeamsContext, currentTheme, context,   webpartContainerWidth, numberItemsPerPage]);

  return (
    <>
    <WebPartTitle displayMode={displayMode} title={title} updateProperty={updateProperty}  themeVariant={currentTheme}/>
      <Stack tokens={{ childrenGap: 10 }}>
        <FlightSelector />
        <FlightTrackerList   />
      </Stack>
    </>
  );
};
