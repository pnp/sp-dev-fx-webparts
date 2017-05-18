import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import * as Vue from 'vue';
import TodoComponent from './components/todo/Todo.vue';

import * as strings from 'toDoStrings';
import { ITodoWebPartProps } from './ITodoWebPartProps';

export default class TodoWebPart extends BaseClientSideWebPart<ITodoWebPartProps> {

  public data: ITodoWebPartProps;

  public render(): void {
    this.domElement.innerHTML = `
      <div id="app-${this.context.instanceId}">
      </div>`;

    this.data = {
      message: this.properties.message,
      todos: this.properties.todos
    };

    new Vue({
      el: `#app-${this.context.instanceId}`,
      render: h => h(TodoComponent, {
        props: this.data
      })
    });
  }

  public onBeforeSerialize(): any {
    this.properties.message = this.data.message;
    this.properties.todos = this.data.todos;
    return undefined;
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
                PropertyPaneTextField('message', {
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
