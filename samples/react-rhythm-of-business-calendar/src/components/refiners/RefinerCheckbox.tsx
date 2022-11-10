import React, { FC, FormEvent, useCallback, useMemo } from "react";
import { Checkbox, ICheckboxProps, mergeThemes, useTheme } from "@fluentui/react";
import { RefinerValue } from "model";
import { Color } from "common";

interface IProps extends ICheckboxProps {
    label?: string;
    value: RefinerValue;
    checked: boolean;
    enableColors: boolean;
    overrideColor?: Color;
    onCheckChanged: (value: RefinerValue, checked: boolean) => void;
}

export const RefinerCheckbox: FC<IProps> = (props) => {
    const { label, value, checked, enableColors, overrideColor, onCheckChanged } = props;
    const color = overrideColor || value.color;
    const currentTheme = useTheme();
    const hoverColor = useMemo(() => currentTheme.isInverted ? color.lighten(0.25) : color.darken(0.25), [currentTheme, color]);
    const theme = mergeThemes(currentTheme, enableColors && {
        semanticColors: {
            inputBackgroundChecked: color.toCssString(),
            inputBackgroundCheckedHovered: hoverColor.toCssString()
        }
    });

    const onChange = useCallback(
        (ev: FormEvent, checked: boolean) => onCheckChanged(value, checked),
        [value, onCheckChanged]
    );

    return <Checkbox
        checked={checked}
        label={label || value.displayName}
        onChange={onChange}
        theme={theme}
        {...props}
    />;
};