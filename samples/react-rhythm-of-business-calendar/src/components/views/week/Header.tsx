import { weekdays, weekdaysMin, weekdaysShort } from 'moment-timezone';
import React, { FC } from "react";
import { css, IStackItemStyles, IStackStyles, mergeStyleSets, Stack, StackItem, useTheme } from "@fluentui/react";
import { blockStyles } from './blockStyles';
import styles from './WeekView.module.scss';

export const Header: FC = () => {
    const { palette: { neutralTertiary, neutralLight } } = useTheme();

    const stackStyles: IStackStyles = {
        root: {
            borderBottom: '1px solid ' + neutralTertiary
        }
    };

    const stackItemStylesFirstItem = mergeStyleSets(
        blockStyles(1), {
            root: {
            }
        } as IStackItemStyles
    );

    const stackItemStyles = mergeStyleSets(
        blockStyles(1), {
            root: {
                borderLeft: '1px solid ' + neutralLight
            }
        } as IStackItemStyles
    );

    return <>
        <Stack horizontal className={css(styles.header, styles.full)} styles={stackStyles}>
            {weekdays().map((name, idx) => <StackItem key={name} styles={idx > 0 ? stackItemStyles : stackItemStylesFirstItem}>{name}</StackItem>)}
        </Stack>
        <Stack horizontal className={css(styles.header, styles.short)} styles={stackStyles}>
            {weekdaysShort().map((name, idx) => <StackItem key={name} styles={idx > 0 ? stackItemStyles : stackItemStylesFirstItem}>{name}</StackItem>)}
        </Stack>
        <Stack horizontal className={css(styles.header, styles.min)} styles={stackStyles}>
            {weekdaysMin().map((name, idx) => <StackItem key={name} styles={idx > 0 ? stackItemStyles : stackItemStylesFirstItem}>{name}</StackItem>)}
        </Stack>
    </>;
}