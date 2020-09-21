import * as React from 'react';
export interface IErrorDialogProps {
    title?: string;
    subText?: string;
}
export interface IErrorDialogState {
    showDialog: boolean;
}
/**
 * Error dialog for the workbench.
 */
export default class ErrorDialog extends React.Component<IErrorDialogProps, IErrorDialogState> {
    constructor(props: IErrorDialogProps);
    render(): React.ReactElement<IErrorDialogProps>;
    open(): void;
    private _close;
}
//# sourceMappingURL=ErrorDialog.d.ts.map