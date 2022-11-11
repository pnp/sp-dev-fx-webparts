import React from "react";
import { Label, TextField, TooltipHost, ITooltipProps } from '@fluentui/react';
import { InfoSolidIcon } from "@fluentui/react-icons-mdl2";

import styles from './styles/LengthLimitedTextfield.module.scss';

export enum CharacterLimitLabelPosition {
    Top,
    Bottom
}

interface IProps {
    label: string;
    value: string;
    placeholder?: string;
    tooltipProps?: ITooltipProps;
    tooltipText?: string;
    characterLimit: number;
    autoFocus?: boolean;
    required?: boolean;
    multiline?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    rows?: number;
    characterLimitLabelPosition?: CharacterLimitLabelPosition;
    onChanged: (newValue: string) => void;
}

const renderLabel = (label: string, required: boolean, tooltipText: string, tooltipProps: ITooltipProps, remainingCharCount: number, showCharacterLimitLabel: boolean) => {
    return (
        <div className={styles.labelContainer}>
            <Label required={required}>{label}</Label>
            <TooltipHost content={tooltipProps ? undefined : tooltipText} tooltipProps={tooltipProps} calloutProps={{ gapSpace: 0 }}>
                <InfoSolidIcon aria-label={tooltipText} tabIndex={0} className={styles.toolTipIcon} />
            </TooltipHost>
            {showCharacterLimitLabel &&
                <Label className={styles.remainingCharCountTop}>({remainingCharCount} characters left)</Label>
            }
        </div>
    );
};

export const LengthLimitedTextField: React.FC<IProps> = (props: IProps) => {
    const text = props.value;
    const remainingCharCount = Math.max(props.characterLimit - text.length, 0);
    const onRenderLabel = () => renderLabel(props.label, props.required, props.tooltipText, props.tooltipProps, remainingCharCount, props.characterLimitLabelPosition === CharacterLimitLabelPosition.Top);

    return (
        <div className={styles.lengthLimitedTextField}>
            <TextField
                value={text}
                ariaLabel={props.required ? props.label + ". Required." : props.label}
                onRenderLabel={onRenderLabel}
                placeholder={props.placeholder}
                multiline={props.multiline}
                maxLength={props.characterLimit}
                rows={props.rows}
                autoFocus={props.autoFocus}
                onChange={(ev, val) => props.onChanged(val)}
                disabled={props.disabled}
                readOnly={props.readonly}
            />
            {props.characterLimitLabelPosition === CharacterLimitLabelPosition.Bottom &&
                <Label className={styles.remainingCharCountBottom}>{remainingCharCount} characters left</Label>
            }
        </div>
    );
};

LengthLimitedTextField.defaultProps = {
    characterLimitLabelPosition: CharacterLimitLabelPosition.Bottom
};
