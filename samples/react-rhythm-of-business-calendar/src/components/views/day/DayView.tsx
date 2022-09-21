import React, { FC } from 'react';
import { FocusZone, IStackItemStyles, Separator, Stack, StackItem, Text } from '@fluentui/react';
import { EventOccurrence, ViewKeys } from 'model';
import { useEventCommandActionButtons, useWindowSize } from '../../hooks';
import { EventOverview, IEventCommands } from '../../events';
import { IViewDescriptor } from '../IViewDescriptor';
import { IViewProps } from '../IViewProps';

import * as strings from 'ComponentStrings';

import styles from './DayView.module.scss';

const CommandOrientationBreakpoint = 1024;

const eventOverviewStackItemStyles: IStackItemStyles = {
    root: { minWidth: 0 }
};

const eventCommandsStackItemStyles: IStackItemStyles = {
    root: { minWidth: 160 }
};

interface IEventCardProps {
    occurrence: EventOccurrence;
    commands: IEventCommands,
}

const EventCard: FC<IEventCardProps> = ({ occurrence, commands }) => {
    const [
        viewCommand,
        addToOutlookCommand,
        getLinkCommand
    ] = useEventCommandActionButtons(commands, occurrence);

    const { width } = useWindowSize();
    const layoutCommandsHorizontally = width <= CommandOrientationBreakpoint;

    return (
        <Stack horizontal={!layoutCommandsHorizontally} data-is-focusable className={styles.event}>
            <StackItem grow styles={eventOverviewStackItemStyles}>
                <EventOverview event={occurrence} />
            </StackItem>
            <Separator vertical={!layoutCommandsHorizontally} />
            <StackItem styles={eventCommandsStackItemStyles}>
                <Stack horizontal={layoutCommandsHorizontally} wrap>
                    {viewCommand}
                    {addToOutlookCommand}
                    {getLinkCommand}
                </Stack>
            </StackItem>
        </Stack>
    );
};

const DayView: FC<IViewProps> = ({
    cccurrences,
    eventCommands,
}) => {
    if (cccurrences.length === 0) {
        return <Text variant='large'>{strings.DayView.NoEventsMessage}</Text>
    } else {
        const sortedEventOccurrences = [...cccurrences].sort(EventOccurrence.StartAscComparer);

        return (
            <FocusZone>
                {sortedEventOccurrences.map(occurrence =>
                    <EventCard
                        key={`${occurrence.event.id}-${occurrence.start.format('L')}`}
                        occurrence={occurrence}
                        commands={eventCommands}
                    />
                )}
            </FocusZone>
        );
    }
};

export const DayViewDescriptor: IViewDescriptor = {
    id: ViewKeys.daily,
    title: strings.ViewNames.Day,
    renderer: DayView,
    dateRotatorController: {
        previousIconProps: { iconName: 'ChevronLeft' },
        nextIconProps: { iconName: 'ChevronRight' },
        previousDate: date => date.clone().subtract(1, 'day'),
        nextDate: date => date.clone().add(1, 'day'),
        dateString: date => date.format('dddd, MMMM DD, YYYY')
    },
    dateRange: (date) => {
        return {
            start: date.clone().startOf('day'),
            end: date.clone().endOf('day')
        };
    }
};