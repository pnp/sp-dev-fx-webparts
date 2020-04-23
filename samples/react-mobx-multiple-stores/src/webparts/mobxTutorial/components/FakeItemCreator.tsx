import { inject, observer } from "mobx-react";
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { TextField } from "office-ui-fabric-react/lib/TextField";
import * as React from 'react';
import { AppStore } from "../../../stores/AppStore";
import { Stores } from '../../../stores/RootStore';
import styles from "./MobxTutorial.module.scss";
import { ConfigStore } from "../../../stores/ConfigStore";

type FakeItemCreatorStoreProps = {
    appStore: AppStore;
    configStore: ConfigStore;
};

type FakeItemCreatorOwnProps = {};

type FakeItemCreatorState = {
    itemTitle: string;
    isImportant: boolean;
    requiredTitle: string;
    isLoading: boolean;
};

type FakeItemCreatorProps = Partial<FakeItemCreatorStoreProps> & FakeItemCreatorOwnProps;

const initialState: FakeItemCreatorState = {
    itemTitle: "",
    isImportant: false,
    requiredTitle: undefined,
    isLoading: false
};

@inject(Stores.AppStore, Stores.ConfigurationStore)
@observer
export class FakeItemCreator extends React.Component<FakeItemCreatorProps, FakeItemCreatorState> {
    public state = initialState;

    public render(): React.ReactElement<FakeItemCreatorProps> {
        const { configStore } = this.props;
        return (
            <>
                <TextField
                    label="Title"
                    errorMessage={this.state.requiredTitle}
                    onChange={this._onChangeItemTitle}
                    value={this.state.itemTitle}
                    className={styles.inputElement}
                    required
                />

                <Checkbox
                    label="Important?"
                    onChange={this._onIsImportantCheckboxChange}
                    className={styles.inputElement}
                    checked={configStore.allowImportantItems && this.state.isImportant}
                    disabled={!configStore.allowImportantItems}
                />

                <DefaultButton
                    onClick={() => this._onAddFakeItem()}
                    iconProps={{ iconName: 'Add' }}
                    allowDisabledFocus={true}
                    className={styles.inputElement}
                    disabled={this.state.isLoading}
                >{this.state.isLoading ? "Adding..." : "Add"}</DefaultButton>
            </>
        );
    }

    private async _onAddFakeItem(): Promise<void> {
        if (this.state.itemTitle === "" && this.state.itemTitle.length === 0) {
            this.setState({ ...this.state, requiredTitle: "Required" });
            return;
        }

        const { appStore, configStore } = this.props;
        this.setState({ ...this.state, isLoading: true });
        await appStore.addListItem({
            title: this.state.itemTitle,
            important: configStore.allowImportantItems && this.state.isImportant
        });
        this.setState(initialState);
    }

    private _onChangeItemTitle = (ev: React.FormEvent<HTMLInputElement>, newValue?: string): void => {
        if (newValue === "" && newValue.length === 0) {
            this.setState({ ...this.state, itemTitle: newValue, requiredTitle: "Required" });
        }
        else {
            this.setState({ ...this.state, itemTitle: newValue, requiredTitle: undefined });
        }
    }

    private _onIsImportantCheckboxChange = (ev: React.FormEvent<HTMLElement>, isChecked: boolean): void => {
        this.setState({ ...this.state, isImportant: isChecked });
    }
}
