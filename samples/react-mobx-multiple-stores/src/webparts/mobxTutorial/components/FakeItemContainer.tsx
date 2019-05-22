import { inject, observer } from "mobx-react";
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import * as React from 'react';
import { AppStore } from "../../../stores/AppStore";
import { Stores } from '../../../stores/RootStore';
import { DetailedFakeItemViewer } from "./DetailedFakeItemViewer";

export type FakeItemContainerStoreProps = {
    appStore: AppStore;
};

export type FakeItemContainerOwnProps = {};
export type FakeItemContainerProps = Partial<FakeItemContainerStoreProps> & FakeItemContainerOwnProps;

@inject(Stores.AppStore)
@observer
export class FakeItemContainer extends React.Component<FakeItemContainerProps, {}> {
    public render(): React.ReactElement<FakeItemContainerProps> {
        const { appStore } = this.props;
        return (
            <div>
                <PrimaryButton
                    text="Add Fake Item"
                    onClick={() => { appStore.addListItem({ title: "dsf", important: true }); }}
                    allowDisabledFocus={true}
                />
                Count items: {appStore.items.length} | Count important items: {appStore.importantItems.length}
                <DetailedFakeItemViewer items={appStore.items}></DetailedFakeItemViewer>
            </div>
        );
    }
}
