import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle,
  PropertyPaneDropdown,
  IPropertyPaneDropdownOption
} from '@microsoft/sp-property-pane';
import { sp } from "@pnp/sp";
import 'core-js/es6/array';
import 'es6-map/implement';
import 'core-js/modules/es6.array.find';
import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';

import * as strings from 'ReactAccordionWebPartStrings';
import ReactAccordion from './components/ReactAccordion';
import { IReactAccordionProps } from './components/IReactAccordionProps';
import { string } from 'prop-types';

export interface IReactAccordionWebPartProps {
  listId: string;
  accordionTitle: string;
  allowZeroExpanded: boolean;
  allowMultipleExpanded: boolean;
}

export default class ReactAccordionWebPart extends BaseClientSideWebPart<IReactAccordionWebPartProps> {

  public onInit(): Promise<void> {
    return super.onInit().then(_ => {
      sp.setup({
        spfxContext: this.context
      });
    });
  }

  public render(): void {
    const element: React.ReactElement<IReactAccordionProps > = React.createElement(
      ReactAccordion,
      {
        listId: this.properties.listId,
        accordionTitle: this.properties.accordionTitle,
        allowZeroExpanded: this.properties.allowZeroExpanded,
        allowMultipleExpanded: this.properties.allowMultipleExpanded,
        displayMode: this.displayMode,
        updateProperty: (value: string) => {
          this.properties.accordionTitle = value;
        },
        onConfigure: () => {
          this.context.propertyPane.open();
        }
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
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyFieldListPicker('listId', {
                  label: 'Select a list',
                  selectedList: this.properties.listId,
                  includeHidden: false,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  disabled: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'listPickerFieldId'
                }),
                PropertyPaneToggle('allowZeroExpanded', {
                  label: 'Allow zero expanded',
                  checked: this.properties.allowZeroExpanded,
                  key: 'allowZeroExpanded',
                }),
                PropertyPaneToggle('allowMultipleExpanded', {
                  label: 'Allow multiple expand',
                  checked: this.properties.allowMultipleExpanded,
                  key: 'allowMultipleExpanded',
                }),
              ]
            }
          ]
        }
      ]
    };
  }

  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {

    /**
     * This section is used to determine when to refresh the pane options
     */
    let updateOnThese = [
      'allowZeroExpanded','allowMultipleExpanded','listId',
    ];
    //alert('props updated');
    console.log('onPropertyPaneFieldChanged:', propertyPath, oldValue, newValue);
    if (updateOnThese.indexOf(propertyPath) > -1 ) {
      this.properties[propertyPath] = newValue;
      this.context.propertyPane.refresh();

    } else { //This can be removed if it works

    }
    this.render();
  }

}
