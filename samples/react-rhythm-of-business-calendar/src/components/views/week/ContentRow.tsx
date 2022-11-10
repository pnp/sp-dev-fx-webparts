import React, { FC } from "react";
import { Stack, StackItem } from "@fluentui/react";
import { IViewCommands } from "../IViewCommands";
import { ContentRowInfo, EventItemInfo } from "./Builder";
import { EventItem } from "./EventItem";
import { ShimItem } from "./ShimItem";
import { blockStyles } from './blockStyles';

import styles from './WeekView.module.scss';

interface IProps {
    row: ContentRowInfo;
    commands: IViewCommands;
}

export const ContentRow: FC<IProps> = ({ row: { items }, commands }) =>
    <Stack horizontal className={styles.content}>
        {items.map((item, idx) =>
            <StackItem key={idx} styles={blockStyles(item.duration)}>
                {item instanceof EventItemInfo
                    ? <EventItem eventInfo={item} commands={commands} />
                    : <ShimItem duration={item.duration} />
                }
            </StackItem>
        )}
    </Stack>