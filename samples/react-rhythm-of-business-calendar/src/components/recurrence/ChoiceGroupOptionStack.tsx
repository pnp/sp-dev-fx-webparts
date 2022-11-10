import React, { FC } from "react";
import { IStackTokens, Stack } from "@fluentui/react";

const tokens: IStackTokens = { childrenGap: 10 };

export const ChoiceGroupOptionStack: FC = ({ children }) =>
    <Stack horizontal wrap verticalAlign='center' tokens={tokens}>
        {children}
    </Stack>