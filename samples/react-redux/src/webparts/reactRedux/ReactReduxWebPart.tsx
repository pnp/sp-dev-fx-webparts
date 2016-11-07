import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { Store } from 'redux';
import { Provider } from 'react-redux';

import * as strings from 'reactReduxStrings';
import DefaultContainer from './containers/DefaultContainer';
import { IReactReduxWebPartProps } from './IReactReduxWebPartProps';
import { createStore, IState } from './store';
import { applyProperties, updateProperty } from './reducers/webpart';

export default class ReactReduxWebPart extends BaseClientSideWebPart<IReactReduxWebPartProps> {
  private store: Store<IState>;

  public constructor(context: IWebPartContext) {
    super(context);

    this.store = createStore();
  }

  public render(): void {
    if (this.renderedOnce) { return; }

    const element = (
      <Provider store={this.store}>
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
      this.store.dispatch(updateProperty(propertyPath, newValue));
    }
  }

  protected onInit() {
    this.store.dispatch(applyProperties(this.properties));

    return Promise.resolve(true);
  }

  protected onAfterPropertyPaneChangesApplied() {
    this.store.dispatch(applyProperties(this.properties));
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
