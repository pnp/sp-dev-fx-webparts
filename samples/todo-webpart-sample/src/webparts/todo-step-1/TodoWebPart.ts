import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  PropertyPaneTextField
} from '@microsoft/sp-client-preview';

import * as strings from 'todoStep1Strings';
import Todo, { ITodoProps } from './components/Todo';
import { ITodoWebPartProps } from './ITodoWebPartProps';

/**
 * This is the todo sample web part built using the SharePoint Framework.
 *
 * Find out more docs and tutorials at:
 * https://github.com/SharePoint/sp-dev-docs/wiki
 */
export default class TodoWebPart extends BaseClientSideWebPart<ITodoWebPartProps> {
  /**
   * Override the base render() implementation to render the todo sample web part.
   */
  public render(): void {
    const element: React.ReactElement<ITodoProps> = React.createElement(Todo, {
      description: this.properties.description
    });

    ReactDom.render(element, this.domElement);
  }

  /**
   * The PropertyPane settings for properties to be configured in PropertyPane.
   */
  protected get propertyPaneSettings(): IPropertyPaneSettings {
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
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
