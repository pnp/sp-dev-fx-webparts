import React, { FC, FormEvent, useCallback } from "react";
import { ChoiceGroup, IChoiceGroupOption, IChoiceGroupOptionProps, IChoiceGroupOptionStyles, ITextFieldStyles } from "@fluentui/react";
import { firstTextPart, Localize, Validation } from "common/components";
import { Event } from "model";
import { ChoiceGroupOptionStack } from "./ChoiceGroupOptionStack";
import { NumberTextField } from "./NumberTextField";

import { RecurrencePatterns as strings } from "ComponentStrings";

const dailyChoiceStyles: IChoiceGroupOptionStyles = {
    root: { minHeight: 32 },
    field: { margin: 5 }
};

const weekdayChoiceStyles: IChoiceGroupOptionStyles = {
    root: { minHeight: 32, marginTop: 16 },
    field: { margin: 5 }
};

const everyTextFieldStyles: Partial<ITextFieldStyles> = {
    root: { width: 100 }
};

interface IProps {
    entity: Event;
    showValidationFeedback: boolean;
    updateField: (update: (entity: Event) => void, callback?: () => any) => void;
}

export const DailyEditor: FC<IProps> = ({
    entity,
    showValidationFeedback,
    updateField
}) => {
    const { recurrence: { daily } } = entity;
    const { weekdaysOnly, every } = daily;

    const onChangedChoice = useCallback(
        (ev: FormEvent, opt: IChoiceGroupOption) => updateField(() => daily.weekdaysOnly = (opt.key === 'weekday')),
        [updateField]
    );

    const onChangedEvery = useCallback(
        (val: number) => updateField(() => daily.every = val),
        [updateField]
    );

    const onDecrementEvery = useCallback(
        () => updateField(() => daily.every--),
        [updateField]
    );

    const onIncrementEvery = useCallback(
        () => updateField(() => daily.every++),
        [updateField]
    );

    const onRenderFieldDailyChoiceGroupOption = useCallback((props: IChoiceGroupOptionProps, render: FC<IChoiceGroupOptionProps>) =>
        <Validation active={showValidationFeedback} entity={entity} rules={Event.EveryN_Daily_Recurrence_Validations}>
            <ChoiceGroupOptionStack>
                {render(props)}
                <Localize phrase={strings.Daily_EveryNDays} skipFirstTextPart components={{
                    every: <NumberTextField
                        number={every}
                        onNumberChanged={onChangedEvery}
                        onDecrement={onDecrementEvery}
                        onIncrement={onIncrementEvery}
                        ariaLabel={strings.Field_EveryNDays.AriaLabel}
                        styles={everyTextFieldStyles}
                    />
                }} />
            </ChoiceGroupOptionStack>
        </Validation>,
        [showValidationFeedback, entity, every, onChangedEvery, onDecrementEvery, onIncrementEvery]
    );

    const onRenderFieldWeekdayChoiceGroupOption = useCallback((props: IChoiceGroupOptionProps, render: FC<IChoiceGroupOptionProps>) =>
        <ChoiceGroupOptionStack>
            {render(props)}
        </ChoiceGroupOptionStack>,
        []
    );

    const choiceGroupOptions = useCallback(() =>
        [
            {
                key: 'daily',
                text: firstTextPart(strings.Daily_EveryNDays),
                styles: dailyChoiceStyles,
                onRenderField: onRenderFieldDailyChoiceGroupOption
            }, {
                key: 'weekday',
                text: firstTextPart(strings.Daily_Weekdays),
                styles: weekdayChoiceStyles,
                onRenderField: onRenderFieldWeekdayChoiceGroupOption
            }
        ],
        [onRenderFieldDailyChoiceGroupOption, onRenderFieldWeekdayChoiceGroupOption]
    );

    return <ChoiceGroup
        label={strings.Pattern}
        selectedKey={weekdaysOnly ? 'weekday' : 'daily'}
        onChange={onChangedChoice}
        options={choiceGroupOptions()}
    />;
};