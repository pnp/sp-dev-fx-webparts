import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart, WebPartContext } from '@microsoft/sp-webpart-base';
import * as strings from 'TeamsMembershipUpdaterWebPartStrings';
import TeamsMembershipUpdater from './components/TeamsMembershipUpdater';
import { ITeamsMembershipUpdaterProps } from './components/ITeamsMembershipUpdaterProps';
import { IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { IPropertyFieldList, PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';
import { PropertyFieldMessage } from '@pnp/spfx-property-controls/lib/PropertyFieldMessage';
import { MessageBarType } from 'office-ui-fabric-react';

export interface ITeamsMembershipUpdaterWebPartProps {
  title: string;
  items: IDropdownOption[];
  loglist: IPropertyFieldList;
  context: WebPartContext;
}


export default class TeamsMembershipUpdaterWebPart extends BaseClientSideWebPart <ITeamsMembershipUpdaterWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ITeamsMembershipUpdaterProps> = React.createElement(
      TeamsMembershipUpdater,
      {
        title: this.properties.title,
        items: [],
        loglist: this.properties.loglist,
        context: this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected async onInit(): Promise<void> {
    await super.onInit();
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('title', {
                  label: strings.TitleFieldLabel
                }),
                PropertyFieldListPicker('loglist', {  label: strings.LoglistFieldLabel,
                  selectedList: this.properties.loglist,
                  includeHidden: false,
                  includeListTitleAndUrl: true,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  disabled: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'listPickerFieldId',
                }),
                PropertyFieldMessage("", {
                  key: "LogListDescription",
                  text: strings.LoglistDescription,
                  messageType:  MessageBarType.info,
                  isVisible:  true,
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
