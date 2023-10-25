import { Moment } from 'moment-timezone';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { ActionButton, FocusZone, FontSizes, FontWeights, IStackItemStyles, Stack, StackItem, useTheme } from '@fluentui/react';
import { useConst } from '@fluentui/react-hooks';
import { Entity } from 'common';
import { EventOccurrence, RefinerValue, ViewKeys } from 'model';
import { IViewCommands } from '../IViewCommands';
import { MonthInfo } from './Builder';
import { RefinerValueEvents } from './RefinerValueEvents';

interface IProps {
    anchorDate: Moment;
    month: MonthInfo;
    columnWidth: number;
    selectedRefinerValues: Set<RefinerValue>;
    onActivate: (cccurrence: EventOccurrence, target: HTMLElement) => void;
    viewCommands: IViewCommands;
}

export const Month: FC<IProps> = ({
    month: { refiner, refinerValues, start, blankValue },
    columnWidth,
    selectedRefinerValues,
    onActivate,
    viewCommands: { setAnchorDate }
}) => {
    const navigate = useNavigate();
    const { palette: { themeDarkAlt, neutralLighter, neutralPrimary } } = useTheme();

    const onClickMonth = () => {
        setAnchorDate(start);
        navigate(`/${ViewKeys.monthly}`);
    };

    const styles: IStackItemStyles = { root: { width: `${columnWidth}%`, paddingBottom: 10 } };

    return (
        <FocusZone>
            <div style={{ backgroundColor: neutralLighter, borderTop: '1px solid ' + neutralPrimary, padding: '2px 8px', marginBottom: 6 }}>
                <ActionButton
                    onClick={onClickMonth}
                    iconProps={useConst({ iconName: "CalendarWeek" })}
                    styles={useConst({
                        root: { color: themeDarkAlt, padding: 0 },
                        label: {
                            fontSize: FontSizes.size18, fontWeight: FontWeights.semibold
                        }
                    })}
                >
                    {start.format("MMMM")}
                </ActionButton>
            </div>
            <Stack horizontal wrap>
                {(!refiner || selectedRefinerValues.has(refiner.blankValue) || (refiner.required && blankValue.eventCount > 0)) &&
                    <StackItem styles={styles}>
                        <RefinerValueEvents showTitle={!!refiner} refinerValue={blankValue} onActivate={onActivate} />
                    </StackItem>
                }
                {refiner && refiner.values.filter(Entity.NotDeletedFilter).filter(value => selectedRefinerValues.has(value)).map(value => refinerValues.get(value)).map((value, idx) =>
                    <StackItem key={idx} styles={styles}>
                        <RefinerValueEvents showTitle refinerValue={value} onActivate={onActivate} />
                    </StackItem>
                )}
            </Stack>
        </FocusZone>
    );
}