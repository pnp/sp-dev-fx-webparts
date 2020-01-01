import * as React from 'react';
import styles from '../O365GroupsManager/O365GroupsManager.module.scss';
import { INewGroupProps } from './INewGroupProps';
import { INewGroupState } from './INewGroupState';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { PeoplePicker, PrincipalType, IPeoplePickerUserItem } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { MessageBar, MessageBarType, IStackProps, Stack, ActionButton, IIconProps, DefaultButton } from 'office-ui-fabric-react';
import { autobind } from 'office-ui-fabric-react';
import O365GroupService from '../../../../services/O365GroupService';

const backIcon: IIconProps = { iconName: 'NavigateBack' };

const verticalStackProps: IStackProps = {
    styles: { root: { overflow: 'hidden', width: '100%' } },
    tokens: { childrenGap: 20 }
};

export default class NewGroup extends React.Component<INewGroupProps, INewGroupState> {

    constructor(props: INewGroupProps) {
        super(props);

        this.state = {
            name: '',
            description: '',
            visibility: 'Public',
            owners: [],
            members: [],
            showMessageBar: false
        };
    }

    public render(): React.ReactElement<INewGroupProps> {
        return (
            <div className={styles.o365GroupsManager}>
                <div className={styles.container}>

                    <div className={styles.row}>
                        <div className={styles.headerStyle}>
                            <h1 className={styles.headerMsgStyle}>
                                <span>Add New Group</span>
                                <ActionButton className={styles.newHeaderLinkStyle} iconProps={backIcon} allowDisabledFocus onClick={this.props.returnToMainPage}>
                                    Back to listing
                                </ActionButton>
                            </h1>
                        </div>

                        {
                            this.state.showMessageBar
                                ?
                                <div className="form-group">
                                    <Stack {...verticalStackProps}>
                                        <MessageBar messageBarType={this.state.messageType}>{this.state.message}</MessageBar>
                                    </Stack>
                                </div>
                                :
                                null
                        }

                        <div className="form-group">
                            <TextField label="Name" required onChanged={this.onchangedName} />
                        </div>

                        <div className="form-group">
                            <TextField label="Description" required multiline rows={3} onChanged={this.onchangedDescription} />
                        </div>

                        <div className="form-group">
                            <Label required={true}>Visibility</Label>
                            <ChoiceGroup
                                defaultSelectedKey="Public"
                                options={[
                                    {
                                        key: 'Public',
                                        text: 'Public - Anyone can see group content'
                                    },
                                    {
                                        key: 'Private',
                                        text: 'Private - Only members can see group content'
                                    }
                                ]}
                                onChange={this.onChangeVisibility}
                            />
                        </div>

                        <div className="form-group">
                            <PeoplePicker
                                context={this.props.context}
                                titleText="Owners"
                                personSelectionLimit={3}
                                showHiddenInUI={false}
                                principalTypes={[PrincipalType.User]}
                                selectedItems={this._getPeoplePickerOwners.bind(this)}
                                isRequired={true} />
                        </div>

                        <div className="form-group">
                            <PeoplePicker
                                context={this.props.context}
                                titleText="Members"
                                personSelectionLimit={3}
                                showHiddenInUI={false}
                                principalTypes={[PrincipalType.User]}
                                selectedItems={this._getPeoplePickerMembers}
                                isRequired={true} />
                        </div>

                        <div className={`${styles.buttonRow} form-group`}>
                            <DefaultButton text="Submit" onClick={this.createNewGroup} />
                            &nbsp; &nbsp;
                            <DefaultButton text="Cancel" onClick={this.props.returnToMainPage} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private _getPeoplePickerOwners(items: IPeoplePickerUserItem[]) {
        this.setState(() => {
            return {
                ...this.state,
                owners: items.map(x => x.id.replace('i:0#.f|membership|', ''))
            };
        });
    }

    @autobind
    private _getPeoplePickerMembers(items: IPeoplePickerUserItem[]) {
        this.setState(() => {
            return {
                ...this.state,
                members: items.map(x => x.id.replace('i:0#.f|membership|', ''))
            };
        });
    }

    @autobind
    private onchangedName(groupName: any): void {
        this.setState({ name: groupName });
    }

    @autobind
    private onchangedDescription(groupDescription: any): void {
        this.setState({ description: groupDescription });
    }

    @autobind
    private onChangeVisibility(ev: React.FormEvent<HTMLInputElement>, option: IChoiceGroupOption): void {
        this.setState({ visibility: option.key });
    }

    @autobind
    private createNewGroup(): void {
        try {
            O365GroupService.createGroup(this.state.name, this.state.description, this.state.visibility, this.state.owners, this.state.members);

            this.setState({
                message: "Group " + this.state.name + " is created successfully!",
                showMessageBar: true,
                messageType: MessageBarType.success
            });
        } catch (error) {
            this.setState({
                message: "Group " + this.state.name + " creation failed with error: " + error,
                showMessageBar: true,
                messageType: MessageBarType.error
            });
        }
    }
}