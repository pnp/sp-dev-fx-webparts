import * as React from "react";
import * as ReactDom from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./store/configure-store";
import * as Redux from "redux";
import AppContainer from "./containers/App";
import { addColumns, removeAllColumns } from "./actions/columnActions";
import { addLists, removeAllLists } from "./actions/listActions";
import { PropertyFieldColumnDefinitions, IPropertyFieldColumnDefinitionsProps } from "./containers/PropertyFieldColumnDefinitions";
import { PropertyFieldListDefinitions, IPropertyFieldListDefinitionsProps } from "./containers/PropertyFieldListDefinitions";
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from "@microsoft/sp-webpart-base";

import { Log } from "@microsoft/sp-core-library";

import * as strings from "spfxReactGridStrings";
import { ISpfxReactGridWebPartProps } from "./ISpfxReactGridWebPartProps";
const store: Redux.Store<any> = configureStore({});

const App: React.StatelessComponent<any> = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
);
export default class SpfxReactGridWebPart extends BaseClientSideWebPart<ISpfxReactGridWebPartProps> {

  private cdProps: IPropertyFieldColumnDefinitionsProps;
  private ldProps: IPropertyFieldListDefinitionsProps;
  public constructor() {

    super();
    this.onPropertyChange = this.onPropertyChange.bind(this);
    this.cdProps = {
      label: strings.ColumnDefinitionFieldLabel,
      onPropertyChange: this.onPropertyChange,
      getColumnDefinitions: () => {
        return this.properties.columns || [];
      },
    };
    this.ldProps = {
      label: strings.ListDefinitionFieldLabel,
      onPropertyChange: this.onPropertyChange,
      getColumnDefinitions: () => {
        return this.properties.columns || [];
      },
      getListDefinitions: () => {
        return this.properties.lists || [];
      },
      //    PageContext: this.context.pageContext// not available in constructor
      PageContext: null
    };
  }
  public onInit<T>(): Promise<T> {
    this.ldProps.PageContext = this.context.pageContext;
    return Promise.resolve(null);
  }
  public render(): void {

    store.dispatch(addLists(this.properties.lists));
    store.dispatch(addColumns(this.properties.columns));

    Log.verbose("SpfxReactGridWebPart", "In render of SpfxReactGridWebPart");
    ReactDom.render(App(null), this.domElement);
  }

  private onPropertyChange(propertyPath: string, oldValue: any, newValue: any) {

    switch (propertyPath) {
      case "ColumnDefinitions":
        this.properties.columns = newValue;
        store.dispatch(removeAllColumns());
        store.dispatch(addColumns(this.properties.columns));
        break;
      case "ListDefinitions":
        this.properties.lists = newValue;
        store.dispatch(removeAllLists());
        store.dispatch(addLists(this.properties.lists));
        break;
      default:
        break;
    }
  };
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {

    Log.verbose("SpfxReactGridWebPart", "In propertyPaneSettings of SpfxReactGridWebPart");
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
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyFieldColumnDefinitions("ColumnDefinitions", this.cdProps),
                PropertyFieldListDefinitions("ListDefinitions", this.ldProps)
              ]
            }
          ]
        }
      ]
    };
  }
}

