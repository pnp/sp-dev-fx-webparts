import * as React from 'react';
import * as ReactDom from 'react-dom';
import { DisplayMode, Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'SampleTargetedComponentWebPartStrings';
import SampleTargetedComponent from './components/SampleTargetedComponent';
import { ISampleTargetedComponentProps } from './components/ISampleTargetedComponentProps';
import { PropertyFieldPeoplePicker, IPropertyFieldGroupOrPerson, PrincipalType } from '@pnp/spfx-property-controls/lib/PropertyFieldPeoplePicker';
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
export interface ISampleTargetedComponentWebPartProps {
  description: string;
  groups: IPropertyFieldGroupOrPerson[];
}

export default class SampleTargetedComponentWebPart extends BaseClientSideWebPart<ISampleTargetedComponentWebPartProps> {

  public render(): void {
    if (
      this.displayMode === DisplayMode.Edit &&
      this.properties.groups.length === 0
    ) {
      const placeHolderElement = React.createElement(Placeholder, {
        iconName: "Edit",
        iconText: "Configure your web part",
        description: "Please configure the web part.",
        buttonLabel: "Configure",
        onConfigure: this._onConfigure,
      });
      ReactDom.render(placeHolderElement, this.domElement);
    } else {
      const element: React.ReactElement<ISampleTargetedComponentProps> = React.createElement(
        SampleTargetedComponent,
        {
          pageContext: this.context.pageContext,
          groupIds: this.properties.groups,
          description: this.properties.description,
        }
      );
      ReactDom.render(element, this.domElement);
    }
  }
  protected _onConfigure = () => {
    // Context of the web part
    this.context.propertyPane.open();
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
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyFieldPeoplePicker('groups', {
                  label: 'Target Audience',
                  initialData: this.properties.groups,
                  allowDuplicate: false,
                  principalType: [PrincipalType.SharePoint],
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  context: this.context,
                  properties: this.properties,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'peopleFieldId'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}