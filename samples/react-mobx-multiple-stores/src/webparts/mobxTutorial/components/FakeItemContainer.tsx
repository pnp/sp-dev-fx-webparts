import { inject, observer } from "mobx-react";
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import * as React from 'react';
import { AppStore } from "../../../stores/AppStore";
import { Stores } from '../../../stores/RootStore';
import { DetailedFakeItemViewer } from "./DetailedFakeItemViewer";
import { FakeItemCreator } from "./FakeItemCreator";
import styles from "./MobxTutorial.module.scss";

type FakeItemContainerStoreProps = {
    appStore: AppStore;
};

type FakeItemContainerOwnProps = {};
type FakeItemContainerProps = Partial<FakeItemContainerStoreProps> & FakeItemContainerOwnProps;

@inject(Stores.AppStore)
@observer
export class FakeItemContainer extends React.Component<FakeItemContainerProps, {}> {
    public render(): React.ReactElement<FakeItemContainerProps> {
        const { appStore } = this.props;
        return (
            <div className={styles.grid}>

                <div className={styles.row}>
                    <div className={`${styles.columnCreateItems}`}>
                        <FakeItemCreator></FakeItemCreator>
                    </div>

                    <div className={`${styles.columnItemDetails}`}>
                        <p>Count items: {appStore.items.length} | Count important items: {appStore.importantItems.length}</p>
                        <DetailedFakeItemViewer items={appStore.items}></DetailedFakeItemViewer>
                    </div>
                </div>

                <div className={styles.row}>
                    <PrimaryButton
                        text="Confirm items"
                        onClick={() => { appStore.confirmItems(); }}
                        className={styles.inputElement}
                    />
                </div>

            </div>
        );
    }
}
