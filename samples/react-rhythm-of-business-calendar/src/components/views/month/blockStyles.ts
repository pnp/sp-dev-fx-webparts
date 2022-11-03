import { memoize } from "lodash";
import { IStackItemStyles } from "@fluentui/react";

export const blockStyles: (count: number) => IStackItemStyles = memoize(count => {
    return { root: { width: (count / 7 * 100).toFixed(2) + '%' } };
});