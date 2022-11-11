import React from "react";
import { css, Label } from '@fluentui/react';

import styles from "./styles/WebPartTitle.module.scss";

export interface IWebPartTitleProps {
    title: string;
    className?: string;
    show?: boolean;
    children?: React.ReactNode;
}

export const WebPartTitle: React.FC<IWebPartTitleProps> = ({ className, show = true, title, children }: IWebPartTitleProps) => {
    return (
        <div className={css(styles.webPartTitle, className)}>
            {show && <Label><h2 role="heading" aria-level={2} tabIndex={0}>{title}</h2></Label>}
            {children}
        </div>
    );
};