import * as React from 'react';
import styles from './Telephonedirectory.module.scss';
import { ITelephoneDirectoryProps } from './ITelephonedirectoryProps';
import { ITelephoneDirectoryState } from "./ITelephoneDirectoryState";
import * as strings from 'TelephonedirectoryWebPartStrings';
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import { ByFirstName } from "./ByFirstName/ByFirstName";
import { ByLastName } from "./ByLastName/ByLastName";
import { ByEmail } from "./ByEmail/ByEmail";
import { Pivot, PivotItem,PivotLinkFormat, PivotLinkSize } from 'office-ui-fabric-react/lib/Pivot';
import { IColumn } from 'office-ui-fabric-react/lib/DetailsList';
const LOG_SOURCE = "TelephoneDirectory";
export default class Telephonedirectory extends React.Component<ITelephoneDirectoryProps, ITelephoneDirectoryState> {
  private headers = [
    { label: 'Name', key: 'displayName' },
    { label: 'Email', key: 'email' },
    { label:'Mobile Phone',key:'mobilePhone'},
    { label:'JobTitle',key:'JobTitle'},
    { label:'OfficeLocation',key:'OfficeLocation'},
    { label:'Business Phone',key:'businessPhone'
  }];

  constructor(props:ITelephoneDirectoryProps){
    super(props);

    const  columns: IColumn[] = [
      {
        key: 'column1',
        name: strings.DisplayName,
        isRowHeader: true,
        isSorted: true,
        isSortedDescending: false,
        sortAscendingAriaLabel: 'Sorted A to Z',
        sortDescendingAriaLabel: 'Sorted Z to A',
        fieldName: 'displayName',
        minWidth: 100,
        maxWidth: 300,
        isResizable: false
      },
      {
        key: 'column2',
        name: strings.Email,
        fieldName: 'email',
        isSorted: true,
        isSortedDescending: false,
        minWidth: 200,
        maxWidth: 300,
        isResizable: false
      },
      {
        key: 'column3',
        name: strings.MobilePhone,
        fieldName: 'mobilePhone',
        isSorted: true,
        isSortedDescending: false,
        minWidth: 200,
        maxWidth: 300,
        isResizable: false
      },
      {
        key: 'column5',
        name: strings.JobTitle,
        fieldName: 'JobTitle',
        isSorted: true,
        isSortedDescending: false,
        minWidth: 200,
        maxWidth: 300,
        isResizable: false
      },
      {
        key: 'column6',
        name: strings.OfficeLocation,
        fieldName: 'OfficeLocation',
        isSorted: true,
        isSortedDescending: false,
        minWidth: 100,
        maxWidth: 300,
        isResizable: true
      },
      {
        key: 'column7',
        name: strings.businessPhone,
        fieldName: 'businessPhone',
        isSorted: true,
        isSortedDescending: false,
        minWidth: 100,
        maxWidth: 300,
        isResizable: true
      }
    ];
    
    this.state={
      loading:false,
      selectedKey:"byFirstName",
      columns:columns
    };
  }

  private _handleLinkClick = (item: PivotItem): void => {
    this.setState({
      selectedKey: item.props.itemKey
    });
  }

  public render(): React.ReactElement<ITelephoneDirectoryProps> {

    return(
    <div className={ styles.telephonedirectory }>
       <div>
          <div>
            <div>
            <WebPartTitle displayMode={this.props.DisplayMode}
              title={this.props.WebpartTitle}
              updateProperty={this.props.updateProperty} />
            
            <Pivot headersOnly={true}
              selectedKey ={this.state.selectedKey}
              onLinkClick = {this._handleLinkClick}
              linkSize={PivotLinkSize.normal}
              linkFormat={PivotLinkFormat.tabs}>
                <PivotItem
                headerText='Search User By First Name'
                itemKey='byFirstName'
                itemIcon="Group" ></PivotItem>
                <PivotItem
                  headerText='Search User By Last Name'
                  itemKey='byLastName'
                  itemIcon="Group"></PivotItem>
                <PivotItem
                  headerText='Search User By Email'
                  itemKey="byEmail"
                  itemIcon="Group"></PivotItem>
              </Pivot><br/>
              {this.state.selectedKey === "byFirstName" &&
               <ByFirstName 
                  MSGraphClient={this.props.MsGraphClient} 
                  MSGraphServiceInstance={this.props.MSGraphServiceInstance}
                  context={this.props.context}
                  Columns={this.state.columns}></ByFirstName>
              }
              {this.state.selectedKey === "byLastName" &&
               <ByLastName
                  MSGraphClient = {this.props.MsGraphClient}
                  MSGraphServiceInstance= {this.props.MSGraphServiceInstance}
                  context={this.props.context}
                  columns={this.state.columns}></ByLastName>
              }
              {this.state.selectedKey === "byEmail" &&
               <ByEmail
                  MSGraphClient = {this.props.MsGraphClient}
                  MSGraphServiceInstance= {this.props.MSGraphServiceInstance}
                  context={this.props.context}
                  columns={this.state.columns}></ByEmail>
              }
          </div>
        </div>
      </div>
    </div>
    );
  }
}
