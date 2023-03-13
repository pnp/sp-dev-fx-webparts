import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneChoiceGroup,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-webpart-base';
import { IPropertyPaneChoiceGroupOption } from '@microsoft/sp-property-pane';
import * as strings from 'MicrosoftGroupsWebPartStrings';
import MicrosoftGroups from './components/MicrosoftGroupsTeams';

export interface IMicrosoftGroupsWebPartProps {
  description: string;
  GroupDisplayTable: any;
  GroupDisplayCard: any;
  StyleToggle: boolean;
}

export default class MicrosoftGroupsWebPart extends BaseClientSideWebPart<IMicrosoftGroupsWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IMicrosoftGroupsWebPartProps > = React.createElement(
      MicrosoftGroups,
      {
        context: this.context,
        GroupDisplayTable: this.properties.GroupDisplayTable,
        GroupDisplayCard: this.properties.GroupDisplayCard,
        StyleToggle: this.properties.StyleToggle
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
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupFields: [
                PropertyPaneToggle('StyleToggle', {
                 label: 'Style',
                 onText: 'Cards',
                 offText: 'Table'
               }),
                PropertyPaneChoiceGroup('GroupDisplayTable', {
                  label: 'Group Display - Table Style',
                  options: [
                   { key: 5, text: '5 Groups', checked: true },
                   { key: 10, text: '10 Groups'},
                   { key: 15, text: '15 Groups' }
                 ]
               }),
                PropertyPaneChoiceGroup('GroupDisplayCard', {
                  label: 'Group Display - Card Style',
                  options: [
                   { key: 6, text: '6 Groups', checked: true },
                   { key: 9, text: '9 Groups'},
                   { key: 12, text: '12 Groups' }
                  ]
               })
              ]
            }
          ]
        }
      ]
    };
  }
}
