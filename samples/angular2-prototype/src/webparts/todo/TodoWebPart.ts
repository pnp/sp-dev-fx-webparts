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
  * Include all subcomponent view classes (components, directives, and pipes) in this array.
  */
  protected get appDeclarationTypes(): any {
    return [ListComponent];
  }

  /*
  * Save's all component properties to the property bag of the WebPart.
  */
  public onBeforeSerialize(): IHtmlProperties {
    this.properties.description = this.rootComponent.description;
    this.properties.todos = this.rootComponent.todos;
    return undefined;
  }

  public onPropertyChange(propertyPath: string, newValue: any): void {
    // Update values changed from the property pane here
    if (propertyPath === "description") {
      this.rootComponent.description = newValue;
    }

    super.onPropertyChange(propertyPath, newValue);
  }

  protected updateChanges(): void {
    // Saves all properties from the WebPart property bag to the Angular component instance
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
