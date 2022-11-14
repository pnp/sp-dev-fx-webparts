import { clamp } from 'lodash';
import React, { FC, useCallback, useRef } from 'react';
import { IStackItemStyles, Stack, StackItem } from '@fluentui/react';
import { Entity, multifilter } from 'common';
import { EventOccurrence, ViewKeys } from 'model';
import { useConfigurationService } from 'services';
import { useWindowSize } from '../../hooks';
import { EventDetailsCallout, IEventDetailsCallout } from '../../events';
import { IViewDescriptor } from '../IViewDescriptor';
import { IViewProps } from '../IViewProps';
import { Builder } from './Builder';
import { Month } from './Month';
import { getFiscalQuarter, getFiscalYear } from './Utils';

import { ViewNames as strings } from 'ComponentStrings';

const QuarterView: FC<IViewProps> = ({ anchorDate, cccurrences, refiners, selectedRefinerValues, viewCommands, eventCommands }) => {
    const { active: config } = useConfigurationService();

    const groupByRefiner = config.useRefiners ? refiners.find(r => r.id === config.quarterViewGroupByRefinerId) : undefined;
    const months = Builder.build(cccurrences, anchorDate, groupByRefiner, config);

    const detailsCallout = useRef<IEventDetailsCallout>();

    const onActivate = useCallback((cccurrence: EventOccurrence, target: HTMLElement) => {
        detailsCallout.current?.open(cccurrence, target);
    }, []);

    const { width } = useWindowSize();
    const columns = width < 640 ? 1 : (width < 1024 ? 2 : (width < 1366 ? 4 : 6));
    const refinerCount = groupByRefiner
        ? (multifilter([groupByRefiner.blankValue, ...groupByRefiner.values.get()], Entity.NotDeletedFilter, v => selectedRefinerValues.has(v))).length
        : 1;
    const monthWidth = 100 / clamp(Math.floor(columns / refinerCount), 1, 3);
    const columnWidth = 100 * Math.max(1 / refinerCount, 1 / columns);

    const styles: IStackItemStyles = { root: { width: `${monthWidth}%`, paddingBottom: 25 } };

    return (
        <div>
            <Stack horizontal wrap>
                {months.map(month =>
                    <StackItem key={month.start.format('L')} styles={styles}>
                        <Month
                            month={month}
                            columnWidth={columnWidth}
                            anchorDate={anchorDate}
                            selectedRefinerValues={selectedRefinerValues}
                            onActivate={onActivate}
                            viewCommands={viewCommands}
                        />
                    </StackItem>
                )}
            </Stack>
            <EventDetailsCallout
                commands={eventCommands}
                componentRef={detailsCallout}
            />
        </div>
    );
};

export const QuarterViewDescriptor: IViewDescriptor = {
    id: ViewKeys.quarter,
    title: strings.Quarter,
    renderer: QuarterView,
    dateRotatorController: {
        previousIconProps: { iconName: 'ChevronUp' },
        nextIconProps: { iconName: 'ChevronDown' },
        previousDate: date => date.clone().subtract(3, 'months'),
        nextDate: date => date.clone().add(3, 'months'),
        dateString: (date, { fiscalYearSartMonth }) => {
            const fy = getFiscalYear(date, fiscalYearSartMonth);
            const qtr = getFiscalQuarter(date, fiscalYearSartMonth);
            return `FY${fy} Q${qtr}`;
        }
    },
    dateRange: Builder.dateRange
};