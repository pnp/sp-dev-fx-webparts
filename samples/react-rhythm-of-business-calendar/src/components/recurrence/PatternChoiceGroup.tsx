import React, { FC, useMemo } from "react";
import { ChoiceGroup, IChoiceGroupOption, IChoiceGroupProps, useTheme } from "@fluentui/react";
import { RecurPattern } from "model";
import { EventPanel as strings } from "ComponentStrings";

export const PatternChoiceGroup: FC<IChoiceGroupProps> = (props) => {
    const { palette: { neutralLighterAlt } } = useTheme();

    const recurrenceIntervalOptions: IChoiceGroupOption[] = useMemo(() =>
        [{
            key: RecurPattern.daily.toString(),
            text: strings.Recurrence.Daily,
            iconProps: { iconName: 'Calendar' },
            styles: { root: { backgroundColor: neutralLighterAlt } }
        }, {
            key: RecurPattern.weekly.toString(),
            text: strings.Recurrence.Weekly,
            iconProps: { iconName: 'CalendarAgenda' },
            styles: { root: { backgroundColor: neutralLighterAlt } }
        }, {
            key: RecurPattern.monthly.toString(),
            text: strings.Recurrence.Monthly,
            iconProps: { iconName: 'CalendarWeek' },
            styles: { root: { backgroundColor: neutralLighterAlt } }
        }, {
            key: RecurPattern.yearly.toString(),
            text: strings.Recurrence.Yearly,
            iconProps: { iconName: 'CalendarWorkWeek' },
            styles: { root: { backgroundColor: neutralLighterAlt } }
        }],
        [neutralLighterAlt]
    );

    return <ChoiceGroup {...props} options={recurrenceIntervalOptions} />;
};