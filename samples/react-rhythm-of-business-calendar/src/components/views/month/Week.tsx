import { Moment } from 'moment-timezone';
import React, { CSSProperties, FC } from 'react';
import { useTheme } from '@fluentui/react';
import { EventOccurrence } from 'model';
import { IViewCommands } from '../IViewCommands';
import { WeekInfo } from './Builder';
import { ContentRow } from './ContentRow';
import { WeekBackground } from './WeekBackground';

import styles from './MonthView.module.scss';

interface IProps {
    anchorDate: Moment;
    week: WeekInfo;
    onActivate: (cccurrence: EventOccurrence, target: HTMLElement) => void;
    viewCommands: IViewCommands;
}

export const Week: FC<IProps> = ({ anchorDate, week, onActivate, viewCommands }) => {
    const { palette: { neutralTertiary } } = useTheme();

    const style: CSSProperties = {
        borderBottom: '1px solid ' + neutralTertiary
    };

    return (
        <div className={styles.week} style={style}>
            <WeekBackground anchorDate={anchorDate} commands={viewCommands} range={week} />
            {week.contentRows.map((row, idx) =>
                <ContentRow key={idx} row={row} onActivate={onActivate} />
            )}
        </div>
    );
}