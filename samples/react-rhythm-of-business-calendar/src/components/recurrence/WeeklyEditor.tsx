import React, { FC, useCallback } from "react";
import { ITextFieldStyles, Label } from "@fluentui/react";
import { GridCol, GridRow, Localize, ResponsiveGrid, Validation } from "common/components";
import { Event } from "model";
import { ChoiceGroupOptionStack } from "./ChoiceGroupOptionStack";
import { NumberTextField } from "./NumberTextField";
import { WeekdayCheckbox } from "./WeekdayCheckbox";

import { RecurrencePatterns as strings } from "ComponentStrings";

import styles from './Recurrence.module.scss';

const everyTextFieldStyles: Partial<ITextFieldStyles> = {
    root: { width: 100 }
};

interface IProps {
    entity: Event;
    showValidationFeedback: boolean;
    updateField: (update: (entity: Event) => void, callback?: () => any) => void;
}

export const WeeklyEditor: FC<IProps> = ({
    entity,
    showValidationFeedback,
    updateField
}) => {
    const { recurrence: { weekly } } = entity;
    const { days, every } = weekly;

    const onChangedEvery = useCallback(
        (val: number) => updateField(() => weekly.every = val),
        [updateField]
    );

    const onDecrementEvery = useCallback(
        () => updateField(() => weekly.every--),
        [updateField]
    );

    const onIncrementEvery = useCallback(
        () => updateField(() => weekly.every++),
        [updateField]
    );

    const onWeekdayIncludedChanged = useCallback(
        (day: number, included: boolean) => updateField(() => weekly.days[day] = included),
        [updateField]
    );

    return <>
        <Label>{strings.Pattern}</Label>
        <Validation active={showValidationFeedback} entity={entity} rules={Event.EveryN_Weekly_Recurrence_Validations}>
            <ChoiceGroupOptionStack>
                <Localize phrase={strings.Weekly} components={{
                    every: <NumberTextField
                        number={every}
                        onNumberChanged={onChangedEvery}
                        onDecrement={onDecrementEvery}
                        onIncrement={onIncrementEvery}
                        ariaLabel={strings.Field_EveryNWeeks.AriaLabel}
                        styles={everyTextFieldStyles}
                    />
                }} />
            </ChoiceGroupOptionStack>
        </Validation>
        <Validation active={showValidationFeedback} entity={entity} rules={Event.Days_Weekly_Recurrence_Validations}>
            <ResponsiveGrid className={styles.recurrenceWeekdays}>
                <GridRow>
                    {days.map((included, idx) =>
                        <GridCol key={idx} sm={6} md={4} lg={3}>
                            <WeekdayCheckbox
                                day={idx}
                                included={included}
                                onIncludedChanged={onWeekdayIncludedChanged}
                            />
                        </GridCol>
                    )}
                </GridRow>
            </ResponsiveGrid>
        </Validation>
    </>;
};