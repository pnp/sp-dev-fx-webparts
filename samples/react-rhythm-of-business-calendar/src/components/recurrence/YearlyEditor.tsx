import React, { FC, FormEvent, useCallback } from "react";
import { ChoiceGroup, Dropdown, IChoiceGroupOption, IChoiceGroupOptionProps, IChoiceGroupOptionStyles, IDropdownOption, ITextFieldStyles, TextField } from "@fluentui/react";
import { firstTextPart, Localize, Validation } from "common/components";
import { Event, RecurPatternOption } from "model";
import { monthDropdownOptions, recurDayDropdownOptions, recurWeekOfDropdownOptions } from "./SharedDropdownOptions";
import { ChoiceGroupOptionStack } from "./ChoiceGroupOptionStack";

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

const monthTextFieldStyles: Partial<ITextFieldStyles> = {
    root: { width: 110 }
};

interface IProps {
    entity: Event;
    showValidationFeedback: boolean;
    updateField: (update: (entity: Event) => void, callback?: () => any) => void;
}

export const YearlyEditor: FC<IProps> = ({
    entity,
    showValidationFeedback,
    updateField
}) => {
    const { recurrence: { yearly } } = entity;
    const { option, byDate, byDay, month } = yearly;

    const onChangedChoice = useCallback(
        (ev: FormEvent, opt: IChoiceGroupOption) => updateField(() => yearly.option = parseInt(opt.key)),
        [updateField]
    );

    const onChangedDate = useCallback(
        (ev: FormEvent, val: string) => updateField(() => yearly.byDate.date = parseInt(val)),
        [updateField]
    );

    const onChangedWeekOf = useCallback(
        (ev: FormEvent, opt: IDropdownOption) => updateField(() => yearly.byDay.weekOf = opt.key as number),
        [updateField]
    );

    const onChangedDay = useCallback(
        (ev: FormEvent, opt: IDropdownOption) => updateField(() => yearly.byDay.day = opt.key as number),
        [updateField]
    );

    const onChangedMonth = useCallback(
        (ev: FormEvent, opt: IDropdownOption) => updateField(() => yearly.month = opt.key as number),
        [updateField]
    );

    const onRenderFieldByDateChoiceGroupOption = useCallback((props: IChoiceGroupOptionProps, render: FC<IChoiceGroupOptionProps>) =>
        <Validation active={showValidationFeedback} entity={entity} rules={Event.Date_YearlyByDate_Recurrence_Validations}>
            <ChoiceGroupOptionStack>
                {render(props)}
                <Localize phrase={strings.Yearly_ByDate} skipFirstTextPart components={{
                    month: <Dropdown
                        selectedKey={month}
                        options={monthDropdownOptions}
                        onChange={onChangedMonth}
                        ariaLabel={strings.Field_Month.AriaLabel}
                        styles={monthTextFieldStyles}
                    />,
                    date: <TextField
                        value={byDate.date ? byDate.date.toString() : ''}
                        onChange={onChangedDate}
                        ariaLabel={strings.Field_Date.AriaLabel}
                        styles={dateTextFieldStyles}
                    />
                }} />
            </ChoiceGroupOptionStack>
        </Validation>,
        [entity, showValidationFeedback, month, byDate, onChangedMonth, onChangedDate]
    );

    const onRenderFieldByDayChoiceGroupOption = useCallback((props: IChoiceGroupOptionProps, render: FC<IChoiceGroupOptionProps>) =>
        <ChoiceGroupOptionStack>
            {render(props)}
            <Localize phrase={strings.Yearly_ByDay} skipFirstTextPart components={{
                weekof: <Dropdown
                    selectedKey={byDay.weekOf}
                    options={recurWeekOfDropdownOptions}
                    onChange={onChangedWeekOf}
                    ariaLabel={strings.Field_WeekOf.AriaLabel}
                    styles={weekOfTextFieldStyles}
                />,
                day: <Dropdown
                    selectedKey={byDay.day}
                    options={recurDayDropdownOptions}
                    onChange={onChangedDay}
                    ariaLabel={strings.Field_Day.AriaLabel}
                    styles={dayTextFieldStyles}
                />,
                month: <Dropdown
                    selectedKey={month}
                    options={monthDropdownOptions}
                    onChange={onChangedMonth}
                    ariaLabel={strings.Field_Month.AriaLabel}
                    styles={monthTextFieldStyles}
                />
            }} />
        </ChoiceGroupOptionStack>,
        [byDay, month, onChangedWeekOf, onChangedDay, onChangedMonth]
    );

    const choiceGroupOptions = useCallback(() =>
        [
            {
                key: RecurPatternOption.byDate.toString(),
                text: firstTextPart(strings.Yearly_ByDate),
                styles: byDateChoiceStyles,
                onRenderField: onRenderFieldByDateChoiceGroupOption
            }, {
                key: RecurPatternOption.byDay.toString(),
                text: firstTextPart(strings.Yearly_ByDay),
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