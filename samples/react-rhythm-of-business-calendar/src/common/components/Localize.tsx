import React, { FC, ReactElement } from "react";
import { Text } from '@fluentui/react';

interface IProps {
    phrase: string;
    skipFirstTextPart?: boolean;
    components: { [token: string]: ReactElement };
}

export const Localize: FC<IProps> = ({ phrase, skipFirstTextPart, components }) => {
    const matches = [...phrase.matchAll(/{(?<token>.+?)}|(?<text>[^{]+)/g)];
    return <>{matches.map(({ groups: { text: textPart, token: componentPart } }, idx) => {
        textPart = textPart?.trim();
        if (textPart && (!skipFirstTextPart || idx > 0))
            return <Text>{textPart}</Text>;
        else if (componentPart)
            return components[componentPart];
    })}</>;
};

export const firstTextPart = (phrase: string) =>
    phrase.match(/{.+?}|(?<text>[^{]+)/).groups.text