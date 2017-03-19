export declare const items: ({
    key: string;
    name: string;
    icon: string;
    ariaLabel: string;
    onClick: () => void;
    ['data-automation-id']: string;
    items: ({
        key: string;
        name: string;
        icon: string;
        ['data-automation-id']: string;
    } | {
        key: string;
        name: string;
        icon: string;
    })[];
} | {
    key: string;
    name: string;
    icon: string;
    onClick: () => void;
    ['data-automation-id']: string;
} | {
    key: string;
    name: string;
    icon: string;
    onClick: () => void;
} | {
    key: string;
    name: string;
    icon: string;
    disabled: boolean;
    onClick: () => void;
})[];
export declare const textOnlyItems: ({
    key: string;
    name: string;
    onClick: () => void;
} | {
    key: string;
    name: string;
    disabled: boolean;
    onClick: () => void;
})[];
export declare const iconOnlyItems: ({
    key: string;
    name: string;
    icon: string;
    onClick: () => void;
} | {
    key: string;
    icon: string;
    disabled: boolean;
    onClick: () => void;
})[];
export declare const overflowItems: {
    key: string;
    name: string;
    icon: string;
}[];
export declare const farItems: {
    key: string;
    name: string;
    icon: string;
    onClick: () => void;
}[];
