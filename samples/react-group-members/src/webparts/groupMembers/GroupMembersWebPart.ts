import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'GroupMembersWebPartStrings';
import GroupMembers from './components/GroupMembers';
import { IGroupMembersProps } from './components/IGroupMembersProps';
import { IPropertyFieldGroupOrPerson, PrincipalType, PropertyFieldPeoplePicker } from '@pnp/spfx-property-controls';

export interface IGroupMembersWebPartProps {
  groups: IPropertyFieldGroupOrPerson[];
  ignorePeople: IPropertyFieldGroupOrPerson[];
}

export default class GroupMembersWebPart extends BaseClientSideWebPart<IGroupMembersWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

  protected onInit(): Promise<void> {
    this._environmentMessage = this._getEnvironmentMessage();

    return super.onInit();
  }

  public render(): void {
    const element: React.ReactElement<IGroupMembersProps> = React.createElement(
      GroupMembers,
      {
        groups: this.properties.groups,
        ignorePeople: this.properties.ignorePeople,
        context: this.context,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  private _getEnvironmentMessage(): string {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams
      return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
    }

    return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment;
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;
    this.domElement.style.setProperty('--bodyText', semanticColors.bodyText);
    this.domElement.style.setProperty('--link', semanticColors.link);
    this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered);

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: ""
          },
          groups: [
            {
              groupName: "",
              groupFields: [
                PropertyFieldPeoplePicker('groups', {
                  label: "Select a group, please don't select a person",
                  initialData: this.properties.groups,
                  allowDuplicate: false,
                  principalType: [PrincipalType.SharePoint, PrincipalType.Security],
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  context: this.context,
                  properties: this.properties,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'groups'
                }),
                PropertyFieldPeoplePicker('ignorePeople', {
                  label: "Select any users you wish to ignore",
                  initialData: this.properties.ignorePeople,
                  allowDuplicate: false,
                  principalType: [PrincipalType.Users],
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  context: this.context,
                  properties: this.properties,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'ignorePeople'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
