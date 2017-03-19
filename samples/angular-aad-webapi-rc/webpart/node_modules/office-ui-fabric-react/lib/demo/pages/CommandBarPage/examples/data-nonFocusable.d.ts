export declare const itemsNonFocusable: ({
    key: string;
    name: string;
    icon: string;
    ariaLabel: string;
    onClick: () => void;
    items: {
        key: string;
        name: string;
        icon: string;
    }[];
} | {
    key: string;
    name: string;
    icon: string;
    onClick: () => void;
    ['data-automation-id']: string;
})[];
export declare const farItemsNonFocusable: ({
    key: string;
    name: string;
    icon: string;
    ['data-automation-id']: string;
} | {
    key: string;
    name: string;
    icon: string;
    onClick: () => void;
})[];
