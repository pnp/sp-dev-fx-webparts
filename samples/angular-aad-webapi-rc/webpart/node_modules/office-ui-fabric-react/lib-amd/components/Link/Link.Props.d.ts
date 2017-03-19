import * as React from 'react';
export interface ILink {
    /** Sets focus to the link. */
    focus(): void;
}
export interface ILinkProps extends React.HTMLProps<HTMLAnchorElement | HTMLButtonElement> {
    /**
     * Whether the link is disabled
     */
    disabled?: boolean;
}
