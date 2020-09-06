import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { Provider } from 'mobx-react';

import * as strings from 'reactMobxStrings';
import DefaultContainer from './containers/DefaultContainer';
import { IReactMobxWebPartProps } from './IReactMobxWebPartProps';
import Store from './store';

export default class ReactMobxWebPart extends BaseClientSideWebPart<IReactMobxWebPartProps> {
  private store = new Store();

  public constructor(context: IWebPartContext) {
    super(context);
  }

  public render(): void {
    if (this.renderedOnce) { return; }

    const element = (
      <Provider {...this.store}>
        <DefaultContainer />
      </Provider>
    );

    ReactDom.render(element, this.domElement);
  }

  protected get disableReactivePropertyChanges() {
    return this.properties ? this.properties.disableReactive : false;
  }

  protected onPropertyChanged(propertyPath, oldValue, newValue) {
    if (!this.disableReactivePropertyChanges) {
      this.store.webpart.properties.set(propertyPath, newValue);
    }
  }

  protected onInit() {
    this.store.webpart.properties.clear();
    this.store.webpart.properties.merge(this.properties as {});

    return Promise.resolve(true);
  }

  protected onAfterPropertyPaneChangesApplied() {
    this.store.webpart.properties.merge(this.properties as {});
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
                PropertyPaneTextField('name', {
                  label: strings.NameFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
