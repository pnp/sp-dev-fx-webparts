import { inject, observer } from "mobx-react";
import * as React from 'react';
import { AppStore } from "../../../stores/AppStore";
import { Stores } from '../../../stores/RootStore';

type ProgressIndicatorStoreProps = {
    appStore: AppStore;
};

type ProgressIndicatorOwnProps = {};
type ProgressIndicatorProps = Partial<ProgressIndicatorStoreProps> & ProgressIndicatorOwnProps;

@inject(Stores.AppStore)
@observer
export class ProgressIndicator extends React.Component<ProgressIndicatorProps, {}> {
    public render(): React.ReactElement<ProgressIndicatorProps> {
        const { appStore } = this.props;
        return (<p>{appStore.appStatus}</p>);
    }
}
