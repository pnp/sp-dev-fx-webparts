import React, { CSSProperties, FC } from 'react';
import { FocusZone, useTheme } from '@fluentui/react';
import { ViewKeys } from 'model';
import { IViewDescriptor } from '../IViewDescriptor';
import { IViewProps } from '../IViewProps';
import { Builder } from './Builder';
import { Background } from './Background';
import { ContentRow } from './ContentRow';
import { Header } from './Header';

import { ViewNames as strings } from 'ComponentStrings';

import styles from './WeekView.module.scss';

const WeekView: FC<IViewProps> = ({ anchorDate, viewCommands, cccurrences }) => {
    const range = Builder.dateRange(anchorDate);
    const contentRows = Builder.build(cccurrences, anchorDate);

    const { palette: { neutralTertiary } } = useTheme();

    const style: CSSProperties = {
        borderBottom: '1px solid ' + neutralTertiary
    };

    return (
        <FocusZone>
            <Header />
            <div className={styles.week} style={style}>
                <Background anchorDate={anchorDate} commands={viewCommands} range={range} />
                {contentRows.map((row, idx) =>
                    <ContentRow key={idx} row={row} commands={viewCommands} />
                )}
            </div>
        </FocusZone>
    );
};

export const WeekViewDescriptor: IViewDescriptor = {
    id: ViewKeys.weekly,
    title: strings.Week,
    renderer: WeekView,
    dateRotatorController: {
        previousIconProps: { iconName: 'ChevronLeft' },
        nextIconProps: { iconName: 'ChevronRight' },
        previousDate: date => date.clone().subtract(1, 'week'),
        nextDate: date => date.clone().add(1, 'week'),
        dateString: date => {
            const startOfWeek = date.clone().startOf('week');
            const endOfWeek = date.clone().endOf('week');
            if (startOfWeek.isSame(endOfWeek, 'year')) {
                if (startOfWeek.isSame(endOfWeek, 'month')) {
                    return `${startOfWeek.format('MMM DD')} - ${endOfWeek.format('DD, YYYY')}`;
                } else {
                    return `${startOfWeek.format('MMM DD')} - ${endOfWeek.format('MMM DD, YYYY')}`;
                }
            } else {
                return `${startOfWeek.format('MMM DD, YYYY')} - ${endOfWeek.format('MMM DD, YYYY')}`;
            }
        }
    },
    dateRange: Builder.dateRange
};