import { duration } from "moment-timezone";
import React, { FC } from "react";
import { Label, Text } from "@fluentui/react";
import { useId } from "@fluentui/react-hooks";
import { now } from "common";
import { ListItemEntity } from "common/sharepoint";

import { ListItemTechnicals as strings } from "ComponentStrings";

interface IProps {
    entity: ListItemEntity<any>;
}

export const ListItemTechnicals: FC<IProps> = ({ entity: { isNew, modified, created } }) => {
    const createdLabelId = useId();
    const modifiedLabelId = useId();

    return !isNew && <>
        {!modified.isSame(created) && <>
            <Label id={modifiedLabelId}>{strings.Field_Modified.Label}</Label>
            <Text variant='small' block aria-labelledby={modifiedLabelId} tabIndex={0} data-is-focusable>
                {modified.format('ddd MMM Do, YYYY [at] h:mm A')} ({duration(modified.diff(now())).humanize(true)})
            </Text>
        </>}
        <Label id={createdLabelId}>{strings.Field_Created.Label}</Label>
        <Text variant='small' block aria-labelledby={createdLabelId} tabIndex={0} data-is-focusable>
            {created.format('ddd MMM Do, YYYY [at] h:mm A')}
        </Text>
    </>;
}