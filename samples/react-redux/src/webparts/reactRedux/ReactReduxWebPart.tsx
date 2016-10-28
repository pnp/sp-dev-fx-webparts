import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField
} from '@microsoft/sp-client-preview';
import { Store } from 'redux'
import { Provider } from 'react-redux'

import * as strings from 'reactReduxStrings';
import ReactRedux, { IReactReduxProps } from './components/ReactRedux';
import { IReactReduxWebPartProps } from './IReactReduxWebPartProps';
import { createStore, IState } from './store'

export default class ReactReduxWebPart extends BaseClientSideWebPart<IReactReduxWebPartProps> {
  store: Store<IState>

  public constructor(context: IWebPartContext) {
    super(context);

    this.store = createStore()
  }

  public render(): void {
    const element = (
      <Provider store={this.store}>
        <ReactRedux name={this.properties.name} />
      </Provider>
    )

    ReactDom.render(element, this.domElement);
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
