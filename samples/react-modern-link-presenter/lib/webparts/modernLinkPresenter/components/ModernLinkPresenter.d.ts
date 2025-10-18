import * as React from 'react';
import type { IModernLinkPresenterProps } from './IModernLinkPresenterProps';
export default class ModernLinkPresenter extends React.Component<IModernLinkPresenterProps, {
    search: string;
    dialogOpen: boolean;
    dialogUrl: string;
    dialogTitle: string;
    dialogMaximized: boolean;
}> {
    constructor(props: IModernLinkPresenterProps);
    private openDialog;
    private closeDialog;
    private toggleDialogMaximize;
    private filterLinks;
    render(): React.ReactElement<IModernLinkPresenterProps>;
}
//# sourceMappingURL=ModernLinkPresenter.d.ts.map