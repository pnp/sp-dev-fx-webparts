import React, { FC } from "react";
import { FontWeights, IStackItemStyles, ITextStyles, Stack, StackItem, Text } from "@fluentui/react";
import { useConst } from "@fluentui/react-hooks";
import { EventOccurrence } from "model";
import { RefinerValueInfo } from "./Builder";
import { EventItem } from "./EventItem";

import { QuarterView as strings } from "ComponentStrings";

interface IProps {
    showTitle?: boolean;
    refinerValue: RefinerValueInfo;
    onActivate: (cccurrence: EventOccurrence, target: HTMLElement) => void;
}

export const RefinerValueEvents: FC<IProps> = ({ showTitle = false, refinerValue: { title, itemsByEvent }, onActivate }) => {
    const titleStyles: ITextStyles = useConst({ root: { margin: '5px 0', fontWeight: FontWeights.semibold } });
    const eventItemStyles: IStackItemStyles = useConst({ root: { marginRight: 10 } });

    return <>
        {showTitle && <Text block variant="medium" styles={titleStyles}>{title}</Text>}
        <Stack>
            {itemsByEvent.size === 0 &&
                <Text variant="small">{strings.NoEventsMessage}</Text>
            }
            {[...itemsByEvent.values()].map((items, idx) =>
                <StackItem key={idx} styles={eventItemStyles}>
                    <EventItem eventInfos={items} onActivate={onActivate} />
                </StackItem>
            )}
        </Stack>
    </>;
};