/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * Todo web part.
 */

import BaseAngular2WebPart from './core/BaseAngular2WebPart';
import TodoComponent from './TodoComponent';
import ListComponent from './ListComponent';
import {
  IPropertyPaneSettings,
  PropertyPaneTextField,
  IHtmlProperties
} from '@microsoft/sp-client-preview';

import * as strings from 'mystrings';
import { ITodoWebPartProps } from './ITodoWebPartProps';

export default class TodoWebPart extends BaseAngular2WebPart<ITodoWebPartProps> {

  protected get rootComponentType(): any {
    return TodoComponent;
  }

  /*
  * Include all subcomponent classes in this array.
  */
  protected get appDeclarationTypes(): any {
    return [ListComponent];
  }

  public onBeforeSerialize(): IHtmlProperties {
    this.properties.todos = this.rootComponent.todos;
    return undefined;
  }

  public onPropertyChange(propertyPath: string, newValue: any): void {
    // Update value
    if (propertyPath === "description") {
      console.log('prop change');
      this.rootComponent.description = newValue;
    }

    super.onPropertyChange(propertyPath, newValue);
  }

  protected updateChanges(): void {
    this.rootComponent.description = this.properties.description;
    this.rootComponent.todos = this.properties.todos;
  }

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
