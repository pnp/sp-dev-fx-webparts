import { minBy, maxBy, throttle } from 'lodash';
import moment, { Moment, Duration, MomentZone } from "moment-timezone";
import { sp, extractWebUrl } from "@pnp/sp";
import "@pnp/sp/folders";
import "@pnp/sp/webs";
import { IWeb, Web } from "@pnp/sp/webs/types";
import { BaseSyntheticEvent, ChangeEvent } from "react";
import { ISelectableOption, format } from "@fluentui/react";
import sanitizeHTML from 'sanitize-html';

import { Humanize as strings } from "CommonStrings";


export type ArrayType<A> = A extends Array<infer T> ? T : never;
export type UnionToIntersectionType<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;

export type PropsOfType<T, TProp> = keyof Pick<T, { [Key in keyof T]: T[Key] extends TProp ? Key : never }[keyof T]>;

export type PartlyPartial<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>;

export const perf = async <T = void>(label: string, action: () => Promise<T>): Promise<T> => {
    console.time(label);
    const result = await action();
    console.timeEnd(label);
    return result;
};

export const sleep = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

export const now = (zoneName?: string): Moment => {
    const n = moment();
    const defaultZone = (moment as any).defaultZone as MomentZone;
    const zone = zoneName || (defaultZone && defaultZone.name);
    if (zone) n.tz(zone);
    return n;
};

export const throttleOnSearchChange = (fn: (search: string) => void) => throttle(
    (event?: ChangeEvent, search: string = '') => fn(search),
    500,
    { leading: false, trailing: true }
);

export const parseIntOrDefault = (val: string, _default: number = 0.0, radix: number = 10): number => {
    const num = parseInt(val, radix);
    return isNaN(num) ? _default : num;
};

export const parseFloatOrDefault = (val: string, _default: number = 0.0): number => {
    const num = parseFloat(val);
    return isNaN(num) ? _default : num;
};

export const nameofFactory = <T extends {}>() => (name: keyof T) => name;

export const stringToEnum = <T extends string>(o: Array<T>): { [K in T]: K } => {
    return o.reduce((res, key) => {
        res[key] = key;
        return res;
    }, Object.create(null));
};

export const mapToArray = <K, V>(map: ReadonlyMap<K, V>): V[] => {
    return Array.from(map.values());
};

export const mapGetOrAdd = <K, V>(map: Map<K, V>, key: K, create: () => V): V => {
    if (map.has(key)) {
        return map.get(key);
    } else {
        const value = create();
        map.set(key, value);
        return value;
    }
};

export const arrayToMap = <K, V>(items: readonly V[], mapFn: (val: V) => K): Map<K, V> => {
    return new Map<K, V>(items.map(item => [mapFn(item), item] as [K, V]));
};

export const distinct = <K, V>(items: readonly V[], keyFn?: (val: V) => K): V[] => {
    if (keyFn) {
        const map = new Map<K, V>();
        items.forEach(item => mapGetOrAdd(map, keyFn(item), () => item));
        return mapToArray(map);
    } else {
        return [...new Set(items)];
    }
};

export const groupBy = <K, V>(items: readonly V[], mapFn: (val: V) => K): Map<K, V[]> => {
    const groups = new Map<K, V[]>();
    items.forEach(item => {
        mapGetOrAdd(groups, mapFn(item), () => [])
            .push(item);
    });
    return groups;
};

export type Filter<T> = (item: T) => boolean;
export const aggregateFilter = <T>(...filters: Filter<T>[]): Filter<T> =>
    (item: T) => filters.reduce((result, filter) => result && filter(item), true);
export function multifilter<T>(items: T[], ...filters: Filter<T>[]): T[];
export function multifilter<T>(items: readonly T[], ...filters: Filter<T>[]): readonly T[];
export function multifilter<T>(items: (T[] | readonly T[]), ...filters: Filter<T>[]) {
    return items.filter(aggregateFilter(...filters));
}
export const inverseFilter = <T>(filter: Filter<T>): Filter<T> =>
    (item: T) => !filter(item);

export type Comparer<T> = (a: T, b: T) => number;
export const aggregateComparer = <T>(...comparers: Comparer<T>[]): Comparer<T> =>
    (a: T, b: T) => comparers.reduce((result, compare) => result || compare(a, b), 0);
export const multisort = <T>(items: T[], ...comparers: Comparer<T>[]): T[] =>
    items.sort(aggregateComparer(...comparers));
export const reverseComparer = <T>(comparer: Comparer<T>): Comparer<T> =>
    (a: T, b: T) => -comparer(a, b);

export const dropdownTextAscComparer = (opt_a: ISelectableOption, opt_b: ISelectableOption): number => {
    if (opt_a.text === opt_b.text)
        return 0;
    else
        return opt_a.text > opt_b.text ? 1 : -1;
};

export const dateAscComparer: Comparer<Date> = (date_a, date_b) => (date_a?.valueOf() || 0) - (date_b?.valueOf() || 0);

export const momentAscComparer: Comparer<Moment> = (date_a, date_b) => date_a.diff(date_b);

export const durationAscComparer: Comparer<Duration> = (duration_a, duration_b) => ((duration_a && duration_a.isValid() && duration_a.asMilliseconds()) || 0) - ((duration_b && duration_b.isValid() && duration_b.asMilliseconds()) || 0);

export const distinctMoments = (dates: readonly Moment[], granularity: moment.unitOfTime.StartOf = 'day'): Moment[] => {
    return dates.filter((d1, idx1) => dates.every((d2, idx2) => idx1 >= idx2 || !d1.isSame(d2, granularity)));
};

export const todayOrAfter = (date: Moment) => {
    return moment.max(now(date.tz()).startOf('day'), date);
};

export const timeAsDuration = (date: Moment): Duration => {
    return moment.duration(date.diff(moment(date).startOf('day')));
};

export const minDuration = (...durations: Duration[]) => minBy(durations, d => d.asMinutes());
export const maxDuration = (...durations: Duration[]) => maxBy(durations, d => d.asMinutes());

export const countAsString = (val: number, singularUnit: string, pluralUnit: string) => {
    return val === 0 ? format(strings.ZeroCount, pluralUnit) : [val, val > 1 ? pluralUnit : singularUnit].join(' ');
};

export const humanizeDuration = (duration: Duration) => {
    const totalMinutes = duration.asMinutes();
    const totalHours = duration.asHours();

    if (totalMinutes % 60 > 0 && totalMinutes > 60) {
        return [
            countAsString(Math.floor(totalHours), strings.HourShort, strings.HoursShort),
            countAsString(duration.minutes(), strings.MinuteShort, strings.MinutesShort)
        ].join(' ').trim();
    } else if (totalMinutes < 60) {
        return countAsString(totalMinutes, strings.MinuteShort, strings.MinutesShort).trim();
    } else if (duration.asHours() > 0) {
        return countAsString(totalHours, strings.HourShort, strings.HoursShort).trim();
    } else {
        return '';
    }
};

export const humanizeList = (items: readonly string[], separator: string = strings.ListSeparator, conjunction: string = strings.ListConjunction) => {
    if (items.length <= 1) {
        return items[0] || '';
    }
    else if (items.length === 2) {
        return `${items[0]} ${conjunction} ${items[1]}`;
    }
    else {
        return `${items.slice(0, -1).join(separator + ' ')}${separator} ${conjunction} ${items.slice(-1)}`;
    }
};

export const humanizeFixedList = <T>(items: readonly T[], domain: readonly T[], toString: (item: T) => string, sort: boolean = true, allString: string = strings.ListAllItems, exceptString: string = strings.ListExcept, conjunction: string = strings.ListConjunction, separator: string = strings.ListSeparator) => {
    const diff = new Set<T>(domain);
    items.forEach(item => diff.delete(item));

    if (diff.size === 0) {
        return allString;
    }
    else if (items.length <= 3) {
        const itemStrings = items.map(toString);
        if (sort) itemStrings.sort();
        return humanizeList(itemStrings, separator, conjunction);
    }
    else if (diff.size <= 2) {
        const itemStrings = Array.from(diff).map(toString);
        if (sort) itemStrings.sort();
        return `${allString} ${exceptString} ${humanizeList(itemStrings, separator, conjunction)}`;
    }
    else {
        const itemStrings = items.map(toString);
        if (sort) itemStrings.sort();
        return humanizeList(itemStrings, separator, conjunction);
    }
};

export const buildCSVString = <T>(headings: string[], items: T[], valuesForItem: (items: T) => string[]): string => {
    const buildCell = (value: string) => (value || '').replace(/"/g, '""');
    const buildRow = (values: string[]) => `"${values.map(buildCell).join('","')}"`;

    const headerRow = buildRow(headings);
    const itemRows = items.map(valuesForItem).map(buildRow);
    const csv = [headerRow, ...itemRows].join('\n');

    return csv;
};

export const buildCSVBlob = <T>(headings: string[], items: T[], valuesForItem: (items: T) => string[]): Blob => {
    const csv = buildCSVString(headings, items, valuesForItem);
    return new Blob([csv], { type: "text/plain;charset=utf-8" });
};

export const isExecutingInWorkbench = () => window.location.pathname.includes('/_layouts/15/workbench.aspx');
export const isExecutingInTeamsTab = () => window.location.pathname.includes('/_layouts/15/teamshostedapp.aspx');

export const scrollParent = (element: Element): Element => {
    if (isExecutingInWorkbench()) return document.getElementById('workbenchPageContent').children[0];

    const overflowRegex = /(auto|scroll)/;

    try {
        let style = getComputedStyle(element);
        const excludeStaticParent = style.position === "absolute";

        if (style.position !== "fixed") {
            for (let parent = element; (parent = parent.parentElement);) {
                style = getComputedStyle(parent);

                if (excludeStaticParent && style.position === "static") {
                    continue;
                }

                if (overflowRegex.test(style.overflow + style.overflowY + style.overflowX)) {
                    return parent;
                }
            }
        }
    }
    catch (e) {
        // swallow any errors
    }

    return document.scrollingElement || document.documentElement;
};

export const publicMembersOnlyReplacer = (key: string, val: any) => key[0] === '_' ? undefined : val;

export const stopPropagation = (handler: (e?: BaseSyntheticEvent) => void) => (e: BaseSyntheticEvent) => { handler(e); e.stopPropagation(); };

export const currentPageServerRelativeUrl = async (): Promise<string> => {
    const pathname = window.location.pathname;
    if (pathname.indexOf(".aspx") > 0) {
        return pathname;
    } else {
        const href = window.location.href;
        const rootFolder = await sp.web.rootFolder.get();
        return new URL(rootFolder.ServerRelativeUrl + rootFolder.WelcomePage, href).pathname;
    }
};

export const sanitizeSharePointFolderName = (name: string): string =>
    name.replace(/[~'"#%&*:<>?/\\{|}.]/g, '-').trim(); // folder name cannot have certain characters

export const sanitizeSharePointGroupName = (name: string): string =>
    name.replace(/[\\/[\]|<>+=:;,?*'"@]/g, '-').trim(); // security group name cannot have certain characters

export const siteCollectionTermGroupName = (siteUrl: string): string =>
    "Site Collection - " + siteUrl.replace(/^https?:\/\//, '').replace(/\//g, "-");

export const sanitizeHTMLWithDefaults = (value: string) => {
    return sanitizeHTML(value, {
        allowedTags: ['div', 'span', 'strong', 'b', 'p', 'a', 'title', 'h1', 'h2', 'h3', 'h4', 'h5', 'i', 'u',
            'strike', 'ol', 'ul', 'li', 'font', 'br', 'hr', 'link',
            'table', 'th', 'tr', 'td'],
        allowedAttributes: {
            a: ['href', 'target', 'data-interception']
        },
        allowedStyles: {
            '*': {
                // Match HEX and RGB
                'color': [/^#(0x)?[0-9a-f]+$/i, /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/],
                'text-align': [/^left$/, /^right$/, /^center$/],
                'font-size': [/^\d+(?:px|em|rem|%)$/], // Match any number with px, em, rem, or %
                'height': [/^0|\d+(?:px|em|%)$/], // Match '0' or any number with px, em, or %
                'max-height': [/^0|\d+(?:px|em|%)$/],
                'width': [/^0|\d+(?:px|em|%)$/],
                'max-width': [/^0|\d+(?:px|em|%)$/]
            },
            'p': {
                'font-size': [/^\d+(?:px|em|rem|%)$/]
            },
            'table': {
                'table-layout': [/^fixed$/]
            }
        }
    });
};

export const cloneWeb = (web?: IWeb) =>
    web ? Web(extractWebUrl(web.toUrl())) : sp.web;