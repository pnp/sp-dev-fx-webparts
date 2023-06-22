import { aliasPattern } from "./constants";
import { endsWith, isEmpty, startsWith, trimEnd, trimStart } from 'lodash';

export function formatAlias(alias: string): string {
    if (!alias || isEmpty(alias)) {
        return alias;
    }

    let formattedAlias = alias.replace(aliasPattern, '').toLowerCase()

    while (endsWith(formattedAlias, '.')) {
        formattedAlias = trimEnd(formattedAlias, '.');
    }

    while (startsWith(formattedAlias, '.')) {
        formattedAlias = trimStart(formattedAlias, '.');
    }

    return formattedAlias;
}