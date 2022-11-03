import React, { FC, FormEvent, useCallback } from "react";
import { ChoiceGroup, Dropdown, IChoiceGroupOption, IChoiceGroupOptionProps, IChoiceGroupOptionStyles, IDropdownOption, ITextFieldStyles, TextField } from "@fluentui/react";
import { firstTextPart, Localize, Validation } from "common/components";
import { Event, RecurPatternOption } from "model";
import { recurDayDropdownOptions, recurWeekOfDropdownOptions } from "./SharedDropdownOptions";
import { ChoiceGroupOptionStack } from "./ChoiceGroupOptionStack";
import { NumberTextField } from "./NumberTextField";

import { RecurrencePatterns as strings } from "ComponentStrings";

const byDateChoiceStyles: IChoiceGroupOptionStyles = {
    root: { minHeight: 32 },
    field: { margin: 5 }
};

const byDayChoiceStyles: IChoiceGroupOptionStyles = {
    root: { minHeight: 32, marginTop: 16 },
    field: { margin: 5 }
};

const dateTextFieldStyles: Partial<ITextFieldStyles> = {
    root: { width: 60 }
};

const weekOfTextFieldStyles: Partial<ITextFieldStyles> = {
    root: { width: 85 }
};

const dayTextFieldStyles: Partial<ITextFieldStyles> = {
    root: { width: 125 }
};

const everyTextFieldStyles: Partial<ITextFieldStyles> = {
    root: { width: 100 }
};

interface IProps {
    entity: Event;
    showValidationFeedback: boolean;
    updateField: (update: (entity: Event) => void, callback?: () => any) => void;
}

export const MonthlyEditor: FC<IProps> = ({
    entity,
    showValidationFeedback,
    updateField
}) => {
    const { recurrence: { monthly } } = entity;
    const { option, byDate, byDay, every } = monthly;

    const onChangedChoice = useCallback(
        (ev: FormEvent, opt: IChoiceGroupOption) => updateField(() => monthly.option = parseInt(opt.key)),
        [updateField]
    );

    const onChangedDate = useCallback(
        (ev: FormEvent, val: string) => updateField(() => monthly.byDate.date = parseInt(val)),
        [updateField]
    );

    const onChangedWeekOf = useCallback(
        (ev: FormEvent, opt: IDropdownOption) => updateField(() => monthly.byDay.weekOf = opt.key as number),
        [updateField]
    );

    const onChangedDay = useCallback(
        (ev: FormEvent, opt: IDropdownOption) => updateField(() => monthly.byDay.day = opt.key as number),
        [updateField]
    );

    const onChangedEvery = useCallback(
        (val: number) => updateField(() => monthly.every = val),
        [updateField]
    );

    const onDecrementEvery = useCallback(
        () => updateField(() => monthly.every--),
        [updateField]
    );

    const onIncrementEvery = useCallback(
        () => updateField(() => monthly.every++),
        [updateField]
    );

    const onRenderFieldByDateChoiceGroupOption = useCallback((props: IChoiceGroupOptionProps, render: FC<IChoiceGroupOptionProps>) =>
        <Validation active={showValidationFeedback} entity={entity} rules={[...Event.Date_MonthlyByDate_Recurrence_Validations, ...Event.EveryN_MonthlyByDate_Recurrence_Validations]}>
            <ChoiceGroupOptionStack>
                {render(props)}
                <Localize phrase={strings.Monthly_ByDate} skipFirstTextPart components={{
                    date: <TextField
                        value={isFinite(byDate.date) ? byDate.date.toString() : ''}
                        onChange={onChangedDate}
                        ariaLabel={strings.Field_Date.AriaLabel}
                        styles={dateTextFieldStyles}
                    />,
                    every: <NumberTextField
                        number={every}
                        onNumberChanged={onChangedEvery}
                        onDecrement={onDecrementEvery}
                        onIncrement={onIncrementEvery}
                        ariaLabel={strings.Field_EveryNMonths.AriaLabel}
                        styles={everyTextFieldStyles}
                    />
                }} />
            </ChoiceGroupOptionStack>
        </Validation>,
        [showValidationFeedback, entity, byDate, every, onChangedDate, onChangedEvery, onDecrementEvery, onIncrementEvery]
    );

    const onRenderFieldByDayChoiceGroupOption = useCallback((props: IChoiceGroupOptionProps, render: FC<IChoiceGroupOptionProps>) =>
        <Validation active={showValidationFeedback} entity={entity} rules={Event.EveryN_MonthlyByDay_Recurrence_Validations}>
            <ChoiceGroupOptionStack>
                {render(props)}
                <Localize phrase={strings.Monthly_ByDay} skipFirstTextPart components={{
                    weekof: <Dropdown
                        options={recurWeekOfDropdownOptions}
                        selectedKey={byDay.weekOf}
                        onChange={onChangedWeekOf}
                        ariaLabel={strings.Field_WeekOf.AriaLabel}
                        styles={weekOfTextFieldStyles}
                    />,
                    day: <Dropdown
                        options={recurDayDropdownOptions}
                        selectedKey={byDay.day}
                        onChange={onChangedDay}
                        ariaLabel={strings.Field_Day.AriaLabel}
                        styles={dayTextFieldStyles}
                    />,
                    every: <NumberTextField
                        number={every}
                        onNumberChanged={onChangedEvery}
                        onDecrement={onDecrementEvery}
                        onIncrement={onIncrementEvery}
                        ariaLabel={strings.Field_EveryNMonths.AriaLabel}
                        styles={everyTextFieldStyles}
                    />
                }} />
            </ChoiceGroupOptionStack>
        </Validation>,
        [showValidationFeedback, entity, byDay, every, onChangedWeekOf, onChangedDay, onChangedEvery, onDecrementEvery, onIncrementEvery]
    );

    const choiceGroupOptions = useCallback(() =>
        [
            {
                key: RecurPatternOption.byDate.toString(),
                text: firstTextPart(strings.Monthly_ByDate),
                styles: byDateChoiceStyles,
                onRenderField: onRenderFieldByDateChoiceGroupOption
            }, {
                key: RecurPatternOption.byDay.toString(),
                text: firstTextPart(strings.Monthly_ByDay),
                styles: byDayChoiceStyles,
                onRenderField: onRenderFieldByDayChoiceGroupOption
            }
        ],
        [onRenderFieldByDateChoiceGroupOption, onRenderFieldByDayChoiceGroupOption]
    );

    return <ChoiceGroup
        label={strings.Pattern}
        selectedKey={option.toString()}
        onChange={onChangedChoice}
        options={choiceGroupOptions()}
    />;
};