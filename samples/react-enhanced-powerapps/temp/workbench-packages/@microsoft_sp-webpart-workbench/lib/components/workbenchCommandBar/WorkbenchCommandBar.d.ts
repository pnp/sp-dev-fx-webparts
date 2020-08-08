import * as React from 'react';
export interface IWorkbenchCommandBarProps {
    isEditing: boolean;
    onClickMobileView: () => void;
    onClickTabletView: () => void;
    toggleEdit: () => void;
    clearPage: () => void;
    savePage: () => void;
    onClickSerializeCanvasView: () => void;
}
export default class WorkbenchCommandBar extends React.Component<IWorkbenchCommandBarProps, {}> {
    render(): React.ReactElement<IWorkbenchCommandBarProps>;
}
//# sourceMappingURL=WorkbenchCommandBar.d.ts.map