import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneToggle,
  PropertyPaneTextField,
  PropertyPaneSlider,
  PropertyPaneChoiceGroup
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import GroupMembers from './components/GroupMembers';
import { IGroupMembersProps } from './types/interfaces';
import { IGroupMembersWebPartProps } from './types/webPartProps';

export default class GroupMembersWebPart extends BaseClientSideWebPart<IGroupMembersWebPartProps> {
  protected onInit(): Promise<void> {
    // Set default values for new properties if they're undefined
    if (this.properties.showPresenceIndicator === undefined) {
      this.properties.showPresenceIndicator = true;
    }
    if (this.properties.showSearchBox === undefined) {
      this.properties.showSearchBox = true;
    }
    return super.onInit();
  }

  public render(): void {
    // Convert toggle states to array of roles
    const roles = [
      this.properties.showAdmins && 'admin',
      this.properties.showMembers && 'member',
      this.properties.showVisitors && 'visitor'
    ].filter(Boolean) as string[];
  
    const element: React.ReactElement<IGroupMembersProps> = React.createElement(
      GroupMembers,
      {
        context: this.context,
        roles: roles,
        itemsPerPage: this.properties.itemsPerPage || 10,
        sortField: this.properties.sortField || 'name',
        showPresenceIndicator: this.properties.showPresenceIndicator,
        showSearchBox: this.properties.showSearchBox,
        adminLabel: this.properties.adminLabel,
        memberLabel: this.properties.memberLabel,
        visitorLabel: this.properties.visitorLabel
      }
    );
  
    ReactDom.render(element, this.domElement);
  }
  

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: "Configure Group Members Web Part"
          },
          groups: [
            {
              groupName: "Role Settings",
              groupFields: [
                PropertyPaneToggle('showAdmins', {
                  label: "Show Administrators",
                  onText: "Yes",
                  offText: "No",
                  checked: this.properties.showAdmins
                }),
                PropertyPaneToggle('showMembers', {
                  label: "Show Members",
                  onText: "Yes",
                  offText: "No",
                  checked: this.properties.showMembers
                }),
                PropertyPaneToggle('showVisitors', {
                  label: "Show Visitors",
                  onText: "Yes",
                  offText: "No",
                  checked: this.properties.showVisitors
                })
              ]
            },
            {
              groupName: "Role Labels",
              groupFields: [
                PropertyPaneTextField('adminLabel', {
                  label: "Administrators Label",
                  description: "Enter a label for the administrators role",
                  value: this.properties.adminLabel || 'Administrators'
                }),
                PropertyPaneTextField('memberLabel', {
                  label: "Members Label",
                  description: "Enter a label for the members role",
                  value: this.properties.memberLabel || 'Members'
                }),
                PropertyPaneTextField('visitorLabel', {
                  label: "Visitors Label",
                  description: "Enter a label for the visitors role",
                  value: this.properties.visitorLabel || 'Visitors'
                })
              ]
            },
            {
              groupName: "Display Settings",
              groupFields: [
                PropertyPaneSlider('itemsPerPage', {
                  label: "Items per page",
                  min: 5,
                  max: 50,
                  step: 1
                }),
                PropertyPaneChoiceGroup('sortField', {
                  label: "Sort By",
                  options: [
                    { key: 'name', text: 'Name' },
                    { key: 'jobTitle', text: 'Job Title' }
                  ]
                })
              ]
            },
            {
              groupName: "UI Settings",
              groupFields: [
                PropertyPaneToggle('showSearchBox', {
                  label: "Show Search Box",
                  onText: "Yes",
                  offText: "No",
                  checked: this.properties.showSearchBox
                }),
                PropertyPaneToggle('showPresenceIndicator', {
                  label: "Show Teams Presence",
                  onText: "Yes",
                  offText: "No",
                  checked: this.properties.showPresenceIndicator
                })
              ]
            }
          ]
        }
      ]
    };
  }
  
  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
}