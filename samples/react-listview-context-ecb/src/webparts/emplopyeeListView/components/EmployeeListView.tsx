import * as React from 'react';
import styles from './EmployeeListView.module.scss';
import { ListView, IViewField } from "@pnp/spfx-controls-react/lib/ListView";
// import {
//   Environment,
//   EnvironmentType
// } from '@microsoft/sp-core-library';
import { IListItem } from '../../../model/IListItem';
import { ECB } from './ECB';
import { IECBProps } from './IECBProps';
import { IEmployeeListViewProps } from './IEmployeeListViewProps';
import { IEmployeeListViewState } from './IEmployeeListViewState';

export default class EmployeeListView extends React.Component<IEmployeeListViewProps, IEmployeeListViewState> {
  private items : IListItem[];

  private ViewFields: IViewField[] = [
    {
      name: "Firstname",
      sorting : true,
      maxWidth:50
    },
    {
      name: "Lastname",
      sorting : true,
      maxWidth:50
    },
    {         
      name: "",         
      sorting: false,         
      maxWidth: 40,         
      render: (rowitem: IListItem) => { 
        const element:React.ReactElement<IECBProps> = React.createElement(             
          ECB, { 
            item:rowitem
          }           
        );           
        return element;         
      }      
    },
    {      
      name: "Street",
      sorting : true,
      maxWidth:90
    },
    {
      name: "StreetNo",
      displayName: 'No',
      sorting: false,
      maxWidth: 20
    },
    {
      name: "Salary",
      sorting: true,
      maxWidth: 50
    },
    {
      name: "EmployeeLocation.Title",
      displayName: 'Location',
      sorting: true,
      maxWidth: 50
    }
  ];

  constructor(props: IEmployeeListViewProps) {
    super(props);
    
    this.state = {
      items: []
    };     
  }

  public render(): React.ReactElement<IEmployeeListViewProps> {
    return (
      <div className={styles.employeeListView}>            
        <div className={styles.ecbParent}>         
          <ListView items={this.state.items}
              iconFieldName="ServerRelativeUrl"
              viewFields={this.ViewFields}
              compact={true}                  
          />            
        </div>
      </div>
    );
  }

  public componentDidMount() {
    // Load the items
    this.getListItems();
  }

  private getListItems() {  
    // if (Environment.type == EnvironmentType.SharePoint || 
    //   Environment.type == EnvironmentType.ClassicSharePoint) {
    //     this.getSPListItems();
    // }
    // else {
      this.getMockUpListItems();
    // }
  }

  // private getSPListItems() {
  //   var self: EmployeeListView = this;
  //   const apiUrl = `${this.props.siteUrl}/_api/web/lists/GetByTitle('Employees')/Items?$select=Firstname,Lastname,Street,StreetNo,Salary,EmployeeLocation/Title&$expand=EmployeeLocation`;
  //   this.props.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1)
  //     .then((response: HttpClientResponse) => {
  //       return response.json();
  //     })
  //     .then((response: { value: IListItem[] }): void => {    
  //       self.setState({
  //         items: response.value
  //       });
  //   });
  // }

  private getMockUpListItems () {
    this.items = [
      {
        Firstname : 'Hans',
        Lastname : 'Hansen',
        Street : 'Holstenstrasse',
        StreetNo : '76',
        Salary : '2100',
        EmployeeLocation: { Title: 'Hamburg' }
      },  
      {
        Firstname : 'Claus',
        Lastname : 'Clausen',
        Street : 'Rathenaustraße',
        StreetNo : '17',
        Salary : '2900',
        EmployeeLocation: { Title: 'Frankfurt' }
      },
      {
        Firstname : 'Jan',
        Lastname : 'Jansen',
        Street : 'Saseler Chaussee',
        StreetNo : '232',
        Salary : '3100',
        EmployeeLocation: { Title: 'Düsseldorf' }
      },
      {
        Firstname : 'John',
        Lastname : 'Johnson',
        Street : 'Lübecker Straße',
        StreetNo : '173',
        Salary : '2800',
        EmployeeLocation: { Title: 'München' }
      },
      {
        Firstname : 'Johann',
        Lastname : 'Johannson',
        Street : 'Königstraße',
        StreetNo : '17',
        Salary : '3050',
        EmployeeLocation: { Title: 'Stuttgart' }
      },
      {
        Firstname : 'Paul',
        Lastname : 'Paulsen',
        Street : 'Schnellerstraße',
        StreetNo : '256',
        Salary : '2550',
        EmployeeLocation: { Title: 'Berlin' }
      }
    ];
    this.setState({
      items: this.items
    });
  }
}
