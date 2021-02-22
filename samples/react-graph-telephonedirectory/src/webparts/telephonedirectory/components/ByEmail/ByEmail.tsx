import * as React from "react";
import { ByEmailProps } from "./ByEmailProps";
import styles from '../Telephonedirectory.module.scss';
import { ByEmailState } from "./ByEmailState";
import { autobind } from "office-ui-fabric-react/lib/Utilities";
import { PeoplePicker, PrincipalType } from '@pnp/spfx-controls-react/lib/PeoplePicker';
import {  } from "@pnp/spfx-controls-react/";
import { Stack, IStackProps, IStackStyles } from 'office-ui-fabric-react/lib/Stack';
import { DetailsList, DetailsListLayoutMode, IColumn, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
const LOG_SOURCE = "ByFirstName";
const stackTokens = { childrenGap: 50 };
const iconProps = { iconName: 'Calendar' };
const stackStyles: Partial<IStackStyles> = { root: { width: 650 } };
const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 700 } },
};

export class ByEmail extends React.Component<ByEmailProps,ByEmailState>{
    constructor(props:ByEmailProps){
        super(props);

        this.state={
            loading:false,
            searchFor: '',
            userProperties:[],
            isDataFound:true,
        };
    }

    @autobind
  private _getPeoplePickerItems(items: any[]) {
    if(items.length == 1){
      this.getUsers(items[0].secondaryText !== ""?items[0].secondaryText:items[0].id.split('|').pop());
    }
    else
    {
      this.setState({
        userProperties:[]
      });
    }
  }

  @autobind
  private async getUsers(email:string) : Promise<any>{
   this.setState({loading:true},async()=>{
      await this.props.MSGraphServiceInstance
      .getUserProperties(email,this.props.MSGraphClient)
      // tslint:disable-next-line: no-shadowed-variable
      .then((users)=>{
        if(users.length !== 0){
          this.setState({
            userProperties:users,
            isDataFound:true
          });
        }
        else
        {
          this.setState({
            userProperties:[],
            isDataFound:false
          });
        }
      });
    });
  }

  public render(): React.ReactElement<ByEmailProps> {
    return (
    <div className={styles.telephonedirectory}> 
      <div>
        <Stack horizontal tokens={stackTokens} styles={stackStyles}>
          <Stack {...columnProps}>
            <PeoplePicker
                context={this.props.context}
                placeholder=""
                titleText="Email"
                personSelectionLimit={1}
                showtooltip={false}
                disabled={false}
                principalTypes={[PrincipalType.User]}
                resolveDelay={1000} />
          </Stack>
        </Stack>
        <div>
        </div>
        <div id='detailedList'>
            {this.state.userProperties.length !== 0 && 
          <DetailsList
            items={this.state.userProperties}
            columns={this.props.columns}
            isHeaderVisible={true}
            layoutMode={DetailsListLayoutMode.justified}
          />
          }
          </div>
      </div>
    </div>
  );
}
}