/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';

import * as strings from 'FlightTrackerWebPartStrings';
import { useAtom } from 'jotai';
import {
  IImageProps,
  Stack,
} from 'office-ui-fabric-react';

import { EInformationType } from '../../constants/EInformationType';
import { globalState } from '../../jotai/atoms';
import { IFlightTrackerListItem } from '../../models/IFlightTrackerListItem';
import { FlightStatus } from '../FlightStatus/FlightStatus';
import {
  FlightTrackerListItemAttribute,
} from './FlightTrackerListItemAttribute';
import { RenderAttribute } from './RenderAttribute';
import { useFlightTrackerStyles } from './useFlightTrackerStyles';

export interface IFlightTrackerListItemProps {
  flights: IFlightTrackerListItem;
  flightInformationType: EInformationType;
}

export const FlightTrackerListItem: React.FunctionComponent<IFlightTrackerListItemProps> = (
  props: React.PropsWithChildren<IFlightTrackerListItemProps>
) => {
  const { flights, flightInformationType } = props;
  const { itemContainer, controlStyles } = useFlightTrackerStyles();
  const [appState, setGlobalState] = useAtom(globalState);
  const imageProps: IImageProps = React.useMemo(() => {
    return { src: flights.flightCompanyImage, width: 22, height: 22 };
  }, [flights.flightCompanyImage]);
  const divRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (divRef.current) {
      setGlobalState((prevState) => {
        return {
          ...prevState,
          itemHeight: divRef.current.clientHeight,
        };
      });
    }
  }, [divRef.current, setGlobalState]);

  return (
    <>
      <div ref={divRef}>
        <Stack styles={itemContainer}>
          <div className={controlStyles.attributeContainerGrid}>
            <RenderAttribute>
              <FlightTrackerListItemAttribute
                attribute={{
                  attributeName: strings.AirLineLabel,
                  attributeValue: flights.flightCompany,
                  iconProps: { imageProps: imageProps },
                }}
              />
            </RenderAttribute>

            <RenderAttribute>
              <FlightTrackerListItemAttribute
                attribute={{
                  attributeName: strings.FlightLabel,
                  attributeValue: flights.flightNumber,
                }}
              />
            </RenderAttribute>

            <RenderAttribute>
              <FlightTrackerListItemAttribute
                attribute={{
                  attributeName: strings.StartTimeLabel,
                  attributeValue: flights.flightTime,
                }}
              />
            </RenderAttribute>

            <RenderAttribute>
              <FlightTrackerListItemAttribute
                attribute={{
                  attributeName: strings.TerminalLabel,
                  attributeValue: flights.flightTerminal,
                }}
              />
            </RenderAttribute>

            <RenderAttribute>
              <FlightTrackerListItemAttribute
                attribute={{
                  attributeName: flightInformationType === EInformationType.ARRIVALS ? "Origin " : "Destination",
                  attributeValue: flights.flightOrigin,
                }}
              />
            </RenderAttribute>

            <RenderAttribute>
              <FlightTrackerListItemAttribute
                attribute={{
                  attributeName: "",
                  attributeValue: (
                    <Stack style={{ paddingTop: 4 }}>
                      <FlightStatus
                        flightInfo={{
                          flightId: flights.flightNumber,
                          status: flights.flightTimeStatusText,
                          date: flights.flightRealTime,
                        }}
                      />
                    </Stack>
                  ),
                }}
              />
            </RenderAttribute>
          </div>
        </Stack>
      </div>
    </>
  );
};
