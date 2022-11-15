/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';

import { useAtomValue } from 'jotai';
import {
  IconButton,
  ScrollablePane,
  ScrollbarVisibility,
  Text,
} from 'office-ui-fabric-react';
import { Stack } from 'office-ui-fabric-react/lib/Stack';

import { globalState } from '../../jotai/atoms';
import { IFlightTrackerListItem } from '../../models';
import {
  FlightTrackerListItem,
} from '../FlightTrackerList/FlightTrackerListItem';
import { FlightTrackerNoData } from '../FlightTrackerList/FlightTrackerNoData';
import {
  useFlightTrackerStyles,
} from '../FlightTrackerList/useFlightTrackerStyles';

export interface IShowListProps {
  listItems: IFlightTrackerListItem[];
  showList: boolean;
  onScroll: () => Promise<void>;
  onRefresh: () => Promise<void>;
}

export const ShowList: React.FunctionComponent<IShowListProps> = (props: React.PropsWithChildren<IShowListProps>) => {
  const { listItems, showList, onScroll, onRefresh } = props;
  const {
    noDataContainerStyles,
    listHeaderStyles,
    scollableContainerStyles,
    stackContainerStyles,
  } = useFlightTrackerStyles();

  const appState =useAtomValue(globalState);
  const { selectedAirPort, selectedInformationType,  } = appState;
  const scrollablePaneRef: any = React.createRef<HTMLDivElement>();
  const [isScrolling, setIsScrolling] = React.useState<boolean>(false);

  const listHeader = React.useMemo(() => {
    if (selectedAirPort?.municipality) {
      return `${selectedAirPort?.municipality}, ${selectedAirPort?.name} - ${selectedInformationType}`;
    } else {
      return `${selectedAirPort?.name} - ${selectedInformationType}`;
    }
  }, [selectedAirPort, selectedInformationType]);

  const getScrollPosition = React.useCallback((divContainerRef: any) => {
    const { scrollTop, scrollHeight, clientHeight } = divContainerRef;
    const percentNow = (scrollTop / (scrollHeight - clientHeight)) * 100;
    return percentNow;
  }, []);

  const onScrollList = React.useCallback(async () => {
    if (isScrolling) {
      return;
    }
    setIsScrolling(true);
    const scrollPosition = getScrollPosition(scrollablePaneRef.current.contentContainer);
    if (scrollPosition > 90) {
      await onScroll();
    }
    setIsScrolling(false);
  }, [onScroll, isScrolling, getScrollPosition, scrollablePaneRef]);

  if (!showList) {
    return null;
  }

  return (
    <>
      <Stack tokens={{ childrenGap: 25 }} styles={stackContainerStyles}>
        <Stack verticalAlign="center" horizontal horizontalAlign="space-between">
          <Text styles={listHeaderStyles} variant="large">
            {listHeader}
          </Text>
          <Stack style={{ paddingRight: 20 }}>
            <IconButton
              iconProps={{ iconName: "Refresh" }}
              title="Refresh"
              ariaLabel="Refresh"
              onClick={async (ev) => {
                ev.preventDefault();
                await onRefresh();
              }}
            />
          </Stack>
        </Stack>

        <ScrollablePane
          scrollbarVisibility={ScrollbarVisibility.auto}
          styles={scollableContainerStyles}
          onScroll={onScrollList}
          componentRef={scrollablePaneRef}
        >
          {listItems && listItems.length  ? (
            listItems.map((item, index) => {
              return (
                <FlightTrackerListItem key={index} flights={item} flightInformationType={selectedInformationType} />
              );
            })
          ) : (
            <Stack horizontalAlign="center" verticalAlign="center" styles={noDataContainerStyles}>
              <FlightTrackerNoData />
            </Stack>
          )}
        </ScrollablePane>
      </Stack>
    </>
  );
};
