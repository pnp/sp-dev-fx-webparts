import * as React from 'react';
export interface ITeachingBubbleBasicExampleState {
    isTeachingBubbleVisible?: boolean;
}
export declare class TeachingBubbleBasicExample extends React.Component<any, ITeachingBubbleBasicExampleState> {
    private _menuButtonElement;
    constructor();
    render(): JSX.Element;
    private _onDismiss(ev);
}
