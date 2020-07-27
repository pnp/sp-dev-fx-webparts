import * as React from 'react';
import { DisplayMode } from '@microsoft/sp-core-library';
import { PageStore } from './../../stores/PageStore';
export interface ICanvasHostProps {
    store: PageStore;
    isEditing: boolean;
    hasOfficeHeader: boolean;
    hasCommandBar: boolean;
}
export default class CanvasHost extends React.Component<ICanvasHostProps, {}> {
    private _canvas;
    private _canvasElement;
    private _canvasPromise;
    componentDidMount(): void;
    componentDidUpdate(props: ICanvasHostProps): void;
    render(): React.ReactElement<ICanvasHostProps>;
    _getDisplayMode(): DisplayMode;
    private _clearPage;
    private _afterCanvasInitialized;
}
//# sourceMappingURL=CanvasHost.d.ts.map