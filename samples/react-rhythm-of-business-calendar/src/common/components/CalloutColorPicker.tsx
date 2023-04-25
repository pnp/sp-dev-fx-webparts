import React, { FC, KeyboardEvent, SyntheticEvent, useCallback, useRef } from "react";
import { ColorPicker, Callout, Label, IColor } from "@fluentui/react";
import { useBoolean } from "@fluentui/react-hooks";
import { Color } from "../Color";

import styles from "./styles/CalloutColorPicker.module.scss";

interface IProps {
    label?: string;
    ariaLabel?: string;
    required?: boolean;
    hideAlpha?: boolean;
    color: Color;
    onChanged: (value: Color) => void;
}

export const CalloutColorPicker: FC<IProps> = ({
    label,
    ariaLabel,
    color,
    required,
    hideAlpha = true,
    onChanged
}) => {
    const [isOpen, { toggle: toggleCallout, setFalse: closeCallout }] = useBoolean(false);
    const colorPreviewRef = useRef<HTMLDivElement>();

    const onColorPickerChange = useCallback((ev: SyntheticEvent, { str }: IColor) => {
        onChanged(Color.parse(str));
    }, [onChanged]);

    const onColorPreviewKeyPress = useCallback((ev: KeyboardEvent) => {
        if (ev.key === "Enter" || ev.key === " ") toggleCallout();
    }, [toggleCallout]);

    return (
        <div className={styles.calloutColorPicker}>
            {label && <Label required={required}>{label}</Label>}
            <div
                aria-label={ariaLabel}
                style={{ backgroundColor: color.toHexString() }}
                className={styles.colorPreview}
                ref={colorPreviewRef}
                onClick={toggleCallout}
                onKeyPress={onColorPreviewKeyPress}
                tabIndex={0}
            />
            {isOpen &&
                <Callout
                    isBeakVisible={false}
                    onDismiss={closeCallout}
                    target={colorPreviewRef.current}
                    gapSpace={0}
                >
                    <ColorPicker
                        showPreview
                        color={color.toCssString()}
                        alphaType="none"
                        onChange={onColorPickerChange}
                    />
                </Callout>
            }
        </div>
    );
};