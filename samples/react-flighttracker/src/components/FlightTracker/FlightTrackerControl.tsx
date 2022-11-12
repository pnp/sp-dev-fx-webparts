import * as React from 'react';

import { Stack } from 'office-ui-fabric-react';
import { useRecoilState } from 'recoil';

import { WebPartTitle } from '@pnp/spfx-controls-react/lib/WebPartTitle';

import { globalState } from '../../recoil/atoms/globalState';
import { FlightSelector } from '../FlightSelector/FlightSelector';
import { FlightTrackerList } from '../FlightTrackerList/FlightTrackerList';
import { IFlightTrackerProps } from './IFlightTrackerProps';

export const FlightTrackerControl: React.FunctionComponent<IFlightTrackerProps> = (
  props: React.PropsWithChildren<IFlightTrackerProps>
) => {
  const { isDarkTheme, hasTeamsContext, currentTheme, context, title, updateProperty, displayMode,numberItemsPerPage , webpartContainerWidth } = props;
  const [appState, setGlobalState] = useRecoilState(globalState);

  React.useEffect(() => {
    setGlobalState({
      ...appState,
      isDarkTheme: isDarkTheme,
      hasTeamsContext: hasTeamsContext,
      currentTheme: currentTheme,
      context: context,
      numberItemsPerPage: numberItemsPerPage,
      webpartContainerWidth: webpartContainerWidth,
    });
  }, [isDarkTheme, hasTeamsContext, currentTheme, context, setGlobalState, webpartContainerWidth]);

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
