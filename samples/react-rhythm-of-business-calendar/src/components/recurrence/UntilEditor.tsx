import moment from "moment";
import React, { FC, FormEvent, useCallback } from "react";
import { ChoiceGroup, DatePicker, IChoiceGroupOption, IChoiceGroupOptionProps, IChoiceGroupOptionStyles, ITextFieldStyles } from "@fluentui/react";
import { firstTextPart, Localize, Validation } from "common/components";
import { Event, RecurUntilType } from "model";
import { ChoiceGroupOptionStack } from "./ChoiceGroupOptionStack";
import { NumberTextField } from "./NumberTextField";

import { RecurrencePatterns as strings } from "ComponentStrings";

const choiceStyles: IChoiceGroupOptionStyles = {
    root: { minHeight: 32 },
    field: { margin: 5 }
};

const countTextFieldStyles: Partial<ITextFieldStyles> = {
    root: { width: 125 }
};

const formatDatePickerDate = (date: Date) => { const m = moment(date); return m.isValid() ? m.format('l') : ''; };

interface IProps {
    entity: Event;
    showValidationFeedback: boolean;
    updateField: (update: (entity: Event) => void, callback?: () => any) => void;
}

export const UntilEditor: FC<IProps> = ({
    entity,
    showValidationFeedback,
    updateField
}) => {
    const { recurrence: { until } } = entity;
    const { type, count, date } = until;

    const onChangedChoice = useCallback(
        (ev: FormEvent, opt: IChoiceGroupOption) => updateField(() => until.type = parseInt(opt.key)),
        [updateField]
    );

    const onChangedCount = useCallback(
        (val: number) => updateField(() => until.count = val),
        [updateField]
    );

    const onDecrementCount = useCallback(
        () => updateField(() => until.count--),
        [updateField]
    );

    const onIncrementCount = useCallback(
        () => updateField(() => until.count++),
        [updateField]
    );

    const onChangedDate = useCallback(
        (val: Date) => {
            const m = moment(val);
            updateField(() => until.date = m.isValid() ? m : undefined);
        },
        [updateField]
    );

    const onRenderFieldForeverChoiceGroupOption = useCallback((props: IChoiceGroupOptionProps, render: FC<IChoiceGroupOptionProps>) =>
        <ChoiceGroupOptionStack>
            {render(props)}
        </ChoiceGroupOptionStack>,
        []
    );

    const onRenderFieldCountChoiceGroupOption = useCallback((props: IChoiceGroupOptionProps, render: FC<IChoiceGroupOptionProps>) =>
        <Validation active={showValidationFeedback} entity={entity} rules={Event.Count_Until_Recurrence_Validations}>
            <ChoiceGroupOptionStack>
                {render(props)}
                <Localize phrase={strings.Until_Count} skipFirstTextPart components={{
                    count: <NumberTextField
                        number={count}
                        onNumberChanged={onChangedCount}
                        onDecrement={onDecrementCount}
                        onIncrement={onIncrementCount}
                        ariaLabel={strings.Field_UntilCount.AriaLabel}
                        styles={countTextFieldStyles}
                    />
                }} />
            </ChoiceGroupOptionStack>
        </Validation>,
        [entity, showValidationFeedback, count, onChangedCount, onDecrementCount, onIncrementCount]
    );

    const onRenderFieldDateChoiceGroupOption = useCallback((props: IChoiceGroupOptionProps, render: FC<IChoiceGroupOptionProps>) =>
        <Validation active={showValidationFeedback} entity={entity} rules={Event.EndDate_Until_Recurrence_Validations}>
            <ChoiceGroupOptionStack>
                {render(props)}
                <Localize phrase={strings.Until_Date} skipFirstTextPart components={{
                    date: <DatePicker
                        allowTextInput
                        ariaLabel={strings.Field_UntilDate.AriaLabel}
                        formatDate={formatDatePickerDate}
                        value={date?.toDate()}
                        onSelectDate={onChangedDate}
                    />
                }} />
            </ChoiceGroupOptionStack>
        </Validation>,
        [entity, showValidationFeedback, date, onChangedDate]
    );

    const choiceGroupOptions = useCallback(() =>
        [
            {
                key: RecurUntilType.forever.toString(),
                text: firstTextPart(strings.Until_Forever),
                styles: choiceStyles,
                onRenderField: onRenderFieldForeverChoiceGroupOption
            }, {
                key: RecurUntilType.count.toString(),
                text: firstTextPart(strings.Until_Count),
                styles: choiceStyles,
                onRenderField: onRenderFieldCountChoiceGroupOption
            }, {
                key: RecurUntilType.date.toString(),
                text: firstTextPart(strings.Until_Date),
                styles: choiceStyles,
                onRenderField: onRenderFieldDateChoiceGroupOption
            }
        ],
        [onRenderFieldForeverChoiceGroupOption, onRenderFieldCountChoiceGroupOption, onRenderFieldDateChoiceGroupOption]
    );

    return <ChoiceGroup
        label={strings.Until}
        selectedKey={type.toString()}
        onChange={onChangedChoice}
        options={choiceGroupOptions()}
    />;
};