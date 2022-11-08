import React from "react";
import { css, Overlay, Spinner, SpinnerSize } from '@fluentui/react';

import * as cstrings from "CommonStrings";
import styles from "./styles/AsyncOverlay.module.scss";

export interface IAsyncOverlayProps {
    show: boolean;
    label?: string;
    className?: string;
    spinnerSize?: SpinnerSize;
}

export const AsyncOverlay: React.FC<IAsyncOverlayProps> = (props: IAsyncOverlayProps) => {
    const className: string = css(styles.asyncOverlay, props.className);
    return (props.show &&
        <Overlay className={className}>
            <Spinner size={props.spinnerSize} label={props.label} />
        </Overlay>
        || null
    );
};

AsyncOverlay.defaultProps = {
    label: cstrings.OneMoment,
    spinnerSize: SpinnerSize.large
};