import React, { FC } from "react";
import { StackItem } from "@fluentui/react";
import { blockStyles } from './blockStyles';

interface IProps {
    duration: number;
}

export const ShimItem: FC<IProps> = ({ duration }) =>
    <StackItem styles={blockStyles(duration)} />
