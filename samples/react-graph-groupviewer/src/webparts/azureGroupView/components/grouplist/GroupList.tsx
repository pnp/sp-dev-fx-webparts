import * as React from 'react';
import { IGroupListProps } from './IGroupListProps';
import { IGroupListState } from './IGroupListState';
import { ListView, IViewField, SelectionMode } from "@pnp/spfx-controls-react/lib/ListView";
import { PrimaryButton } from 'office-ui-fabric-react';
import { IAzureGroup } from '../../models';
import { GroupDetails } from '../groupdetails/GroupDetails';

const view: IViewField[] = [
    {
        name: 'displayName',
        displayName: 'Group Name',
        minWidth: 150,
        isResizable: true
    }
];

export class GroupList extends React.Component<IGroupListProps, IGroupListState> {

    constructor(props: IGroupListProps){
        super(props);

        this.state = {
            selectedGroup: null
        };

    }

    public render(): React.ReactElement<IGroupListProps> {
        return (
            <div>
                <ListView 
                 items={this.props.results}
                 viewFields={view}
                 selectionMode={SelectionMode.single}
                 selection={this._getSelection}
                />
                { this.state.selectedGroup === null ? 
                      <div></div>
                    : <GroupDetails selectedGroup={this.state.selectedGroup} /> 
                }
            </div>
        );
    }

    private _getSelection = (items: any[]) :void => {
        console.log(items);
        if(items.length !== 0){
            const selected: IAzureGroup = {
                displayName: items[0].displayName,
                description: items[0].description,
                id: items[0].id
            };
            this.setState({
                selectedGroup: selected
            });
        }
    }

}