/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * @file Workbench.tsx
 * The top level file for the Workbench. The Workbench is a tool that SharePoint
 * developers use to test their Web Parts. It is designed to make development
 * efficient by providing a production-like evironment for the developer to
 * test their Web Part and quickly make changes.
 */
import * as React from 'react';
import { A11yManager } from '@ms/sp-a11y';
import { PageStore } from './../../stores/PageStore';
import { DeviceType } from '../mobilePreview/mobilePreview/MobilePreview';
export interface IWorkBenchProps {
    pageStore: PageStore;
    a11yManagerId?: string;
}
export interface IWorkBenchState {
    displayMobilePreview?: boolean;
    showSerializedCanvasView?: boolean;
    mobilePreviewDeviceType?: DeviceType;
    isEditing?: boolean;
    officeHeaderTitle?: string;
    hasOfficeHeader?: boolean;
    hasCommandBar?: boolean;
}
export interface IWorkBenchContext {
    a11yManager: A11yManager;
}
export declare class WorkBench extends React.Component<IWorkBenchProps, IWorkBenchState> {
    static childContextTypes: React.ValidationMap<IWorkBenchContext>;
    private static readonly _applicationTag;
    private _a11yManager;
    constructor(props: IWorkBenchProps, context: IWorkBenchContext);
    getChildContext(): IWorkBenchContext;
    render(): React.ReactElement<IWorkBenchProps>;
    componentDidMount(): void;
    componentDidUpdate(prevProps: IWorkBenchProps, prevState: IWorkBenchState): void;
    private _toggleEdit;
    private _onClickMobileView;
    private _onClickSerializeCanvasView;
    private _closeClickSerializeCanvasView;
    private _onClickTabletView;
    private _closeMobilePreview;
    /**
     * Sets the z-index of the suite nav.
     * Purpose of this is so that the suite nav doesn't cover up the mobile preview header.
     * Should find a better way to achieve this.
     */
    private _setSuiteNavZIndex;
}
//# sourceMappingURL=Workbench.d.ts.map