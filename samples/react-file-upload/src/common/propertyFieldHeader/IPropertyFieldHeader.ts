import * as React from 'react';

/**
 * Enum to describe possible events to show callout
 */
export enum CalloutTriggers {
    Click = 1,
    Hover
}

/**
 * Interface that discibes available settings of Header callout
 */
export interface IPropertyFieldHeaderCalloutProps {
    /**
     * Callout content - any HTML
    */
    calloutContent?: React.ReactNode;
    /**
     * Custom width for callout including borders. If value is 0, no width is applied.
     */
    calloutWidth?: number;
    /**
     * Event to show the callout
     */
    calloutTrigger?: CalloutTriggers;
    /**
     * The gap between the Callout and the target
     */
    gapSpace?: number;
}

/**
 * PropertyFieldHeader component props
 */
export interface IPropertyFieldHeaderProps extends IPropertyFieldHeaderCalloutProps {
    /**
     * The label to be shown in the header
     */
    label?: string;
}

/**
 * PropertyFieldHeader component state
 */
export interface IPropertyFieldHeaderState {
    /**
     * Flag if the callout is currently visible
     */
    isCalloutVisible?: boolean;
}
