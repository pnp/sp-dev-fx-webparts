import React, { FC, FormEvent, useCallback } from "react";
import { IconButton, IIconProps, ITextFieldProps, ITextFieldStyles, TextField, mergeStyleSets, TooltipHost } from "@fluentui/react";

import { RecurrencePatterns as strings } from "ComponentStrings";

const decrementIconProps: IIconProps = { iconName: 'ChevronLeftSmall' };
const incrementIconProps: IIconProps = { iconName: 'ChevronRightSmall' };

const defaultStyles: Partial<ITextFieldStyles> = {
    prefix: { padding: 0 },
    suffix: { padding: 0 }
};

interface IProps extends ITextFieldProps {
    number: number;
    styles?: Partial<ITextFieldStyles>;
    onIncrement: () => void;
    onDecrement: () => void;
    onNumberChanged: (val: number) => void;
}

export const NumberTextField: FC<IProps> = (props) => {
    const { number, styles, onIncrement, onDecrement, onNumberChanged } = props;

    const onChange = useCallback((ev: FormEvent, val: string) =>
        onNumberChanged(parseInt(val)),
        [onNumberChanged]
    );

    const onRenderPrefix = useCallback(() =>
        <TooltipHost content={strings.Command_Decrement.Tooltip}>
            <IconButton iconProps={decrementIconProps} onClick={onDecrement} ariaLabel={strings.Command_Decrement.AriaLabel} />
        </TooltipHost>,
        [onDecrement]
    );
    const onRenderSuffix = useCallback(() =>
        <TooltipHost content={strings.Command_Increment.Tooltip}>
            <IconButton iconProps={incrementIconProps} onClick={onIncrement} ariaLabel={strings.Command_Increment.AriaLabel} />
        </TooltipHost>,
        [onIncrement]
    );

    return <TextField
        {...props}
        value={(number || '').toString()}
        onChange={onChange}
        onRenderPrefix={onRenderPrefix}
        onRenderSuffix={onRenderSuffix}
        styles={mergeStyleSets(defaultStyles, styles)}
    />;
};