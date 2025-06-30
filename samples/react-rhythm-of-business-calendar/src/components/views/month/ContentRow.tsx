import React, { FC } from "react";
import { Stack, StackItem } from "@fluentui/react";
import { EventOccurrence } from "model";
import { ContentRowInfo, EventItemInfo } from "./Builder";
import { EventItem } from "./EventItem";
import { ShimItem } from "./ShimItem";
import { blockStyles } from './blockStyles';

import styles from './MonthView.module.scss';

interface IProps {
    row: ContentRowInfo;
    onActivate: (cccurrence: EventOccurrence, target: HTMLElement) => void;
    selectedTemplateKeys?: string[];
}

export const ContentRow: FC<IProps> = ({ row: { items }, onActivate, selectedTemplateKeys }) =>
    <Stack horizontal className={styles.content}>
        {items.map((item, idx) =>
            <StackItem key={idx} styles={blockStyles(item.duration)}>
                {item instanceof EventItemInfo
                    ? <EventItem eventInfo={item} onActivate={onActivate} selectedTemplateKeys={selectedTemplateKeys} />
                    : <ShimItem duration={item.duration} />
                }
            </StackItem>
        )}
    </Stack>