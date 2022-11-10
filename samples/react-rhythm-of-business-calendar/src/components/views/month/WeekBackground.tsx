import { Moment } from 'moment-timezone';
import React, { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ActionButton, css, FontSizes, FontWeights, IButtonProps, IButtonStyles, IconButton, IStackItemStyles, mergeStyleSets, Stack, StackItem, useTheme } from '@fluentui/react';
import { MomentRange, now } from 'common';
import { ViewKeys } from 'model';
import { useWindowSize } from '../../hooks';
import { IViewCommands } from '../IViewCommands';
import { blockStyles } from './blockStyles';

import { MonthView as strings } from 'ComponentStrings';

import styles from './MonthView.module.scss';

const newEventButtonStyles: IButtonStyles = {
    root: {
        fontSize: 12,
        height: 'unset'
    },
    icon: {
        fontSize: 12,
        margin: '0 2px'
    },
    label: {
        margin: 0
    }
};

const enumerateDates = (startDate: Moment, endDate: Moment): Moment[] => {
    const dates: Moment[] = [];
    let date = startDate.clone();
    do {
        dates.push(date);
        date = date.clone().add(1, 'days');
    } while (date < endDate);

    return dates;
}

interface IProps {
    anchorDate: Moment;
    range: MomentRange;
    commands: IViewCommands;
}

export const WeekBackground: FC<IProps> = ({ anchorDate, commands: { newEvent, setAnchorDate }, range: { start, end } }) => {
    const { palette: { themePrimary, themeDarkAlt, neutralLight, neutralLighterAlt }, semanticColors: { bodyBackground } } = useTheme();

    const navigate = useNavigate();

    return (
        <Stack className={styles.background} horizontal>
            {enumerateDates(start, end).map((date, idx) => {
                const dateIsInThisMonth = date.isSame(anchorDate, 'month');
                const includeMonthName = date.date() === 1 || (idx === 0 && !dateIsInThisMonth);
                const isToday = date.isSame(now(), 'day');

                const dateButtonStyles: IButtonStyles = {
                    root: {
                        color: dateIsInThisMonth ? themePrimary : themeDarkAlt,
                        fontSize: FontSizes.size10,
                        fontWeight: isToday ? FontWeights.bold : (dateIsInThisMonth ? FontWeights.semibold : FontWeights.regular),
                        height: 'unset',
                        padding: 0
                    }
                }

                const stackItemStyles = mergeStyleSets(
                    blockStyles(1), {
                        root: {
                            color: themePrimary,
                            backgroundColor: dateIsInThisMonth ? bodyBackground : neutralLighterAlt,
                            borderLeft: idx > 0 ? '1px solid ' + neutralLight : undefined,
                            borderTop: '3px solid ' + (isToday ? themePrimary : 'transparent'),
                            padding: '1px 8px 4px 8px'
                        }
                    } as IStackItemStyles
                );

                const onClickDate = () => {
                    setAnchorDate(date);
                    navigate(`/${ViewKeys.daily}`);
                };

                const onClickNewEvent = () => {
                    setAnchorDate(date);
                    newEvent(date);
                };

                const { width } = useWindowSize();

                const newEventButtonProps: IButtonProps = useMemo(() => {
                    return {
                        className: css(styles.newEventButton, 'ms-motion-fadeIn'),
                        iconProps: { iconName: 'Add' },
                        styles: newEventButtonStyles,
                        onClick: onClickNewEvent
                    };
                }, [onClickNewEvent]);

                return (
                    <StackItem key={date.format('L')} className={styles.date} styles={stackItemStyles}>
                        <Stack horizontal>
                            <StackItem grow styles={{ root: { lineHeight: 10 } }}>
                                <ActionButton styles={dateButtonStyles} onClick={onClickDate}>
                                    {includeMonthName && <>{date.format("MMM")}&nbsp;</>}
                                    {date.date()}
                                </ActionButton>
                            </StackItem>
                            {width >= 640
                                ? <ActionButton {...newEventButtonProps}>{strings.Command_NewEvent.Text}</ActionButton>
                                : <IconButton {...newEventButtonProps} />
                            }
                        </Stack>
                    </StackItem>
                );
            })}
        </Stack>
    );
};