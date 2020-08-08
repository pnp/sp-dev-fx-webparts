import * as React from "react";
import { ByLastNameProps } from "./ByLastNameProps";
import styles from '../Telephonedirectory.module.scss';
import { ByLastNameState } from "./ByLastNameState";
import { autobind } from "office-ui-fabric-react/lib/Utilities";
import * as strings from 'TelephonedirectoryWebPartStrings';
import { Log } from "@microsoft/sp-core-library";
import { Stack, IStackProps, IStackStyles } from 'office-ui-fabric-react/lib/Stack';
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { DetailsList, DetailsListLayoutMode, IColumn, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
const LOG_SOURCE = "ByFirstName";
const stackTokens = { childrenGap: 50 };
const iconProps = { iconName: 'Calendar' };
const stackStyles: Partial<IStackStyles> = { root: { width: 650 } };
const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 700 } },
};

export class ByLastName extends React.Component<ByLastNameProps,ByLastNameState>{
    constructor(props:ByLastNameProps)
    {
        super(props);
        this.state={
            loading:false,
            searchFor: '',
            userProperties:[],
            isDataFound:true,
          };
    }

    @autobind
  private searchUsers(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void {
    try {
       this.setState({
          searchFor: newValue,
        });
        this.getUsers(newValue);
    } catch (error) {
      Log.error(LOG_SOURCE,error);
    }
  }

  @autobind
  private async getUsers(email:string) : Promise<any>{
   this.setState({loading:true},async()=>{
      await this.props.MSGraphServiceInstance
      .getUserPropertiesByLastName(email,this.props.MSGraphClient)
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

  @autobind
  private searchUsersError(value: string): string {
    // The search for text cannot contain spaces
      return (value == null || value.length == 0 || value.indexOf(" ") < 0)
      ? ''
      : 'Nothing matched';
  }

  public render(): React.ReactElement<ByLastNameProps> {
    return (
    <div className={styles.telephonedirectory}> 
      <div>
        <Stack horizontal tokens={stackTokens} styles={stackStyles}>
          <Stack {...columnProps}>
            <TextField
              label={strings.SearchUserByLastName}
              required={false}
              value={this.state.searchFor}
              onChange={this.searchUsers}
              onGetErrorMessage={this.searchUsersError}
            />
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

