import * as React from "react";
import * as ReactDom from "react-dom";
import { Provider } from "react-redux";

// require("office-ui-fabric/dist/css/Fabric.css");
// require("office-ui-fabric/dist/css/Fabric.Components.css");
// require("office-ui-fabric/dist/components/CommandBar/CommandBar.css");


import configureStore from "./store/configure-store";
const { Router, createMemoryHistory } = require("react-router");

import { addLists } from "./actions/listActions";
import { addColumns } from "./actions/columnActions";
import { addPageContext } from "./actions/PageContextActions";
import {
  BaseClientSideWebPart,
  IPropertyPaneSettings, IWebPartData, IHtmlProperties,
  IWebPartContext,
  PropertyPaneTextField
} from "@microsoft/sp-webpart-base";
import { Log } from "@microsoft/sp-client-base";
import routes from "./store/routes";
import * as strings from "spfxReactGridStrings";


import { ISpfxReactGridWebPartProps } from "./ISpfxReactGridWebPartProps";
const store: Redux.Store<any> = configureStore({});
const history = createMemoryHistory(location);
const App: React.StatelessComponent<any> = () => (
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>
);
export default class SpfxReactGridWebPart extends BaseClientSideWebPart<ISpfxReactGridWebPartProps> {
  public constructor(context: IWebPartContext) {
    super(context);
    Log.verbose("SpfxReactGridWebPart", "In constructor of SpfxReactGridWebPart");
  }
  public render(): void {

    store.dispatch(addLists(this.properties.lists));
    store.dispatch(addColumns(this.properties.columns));
    store.dispatch(addPageContext(this.context.pageContext));
    Log.verbose("SpfxReactGridWebPart", "In render of SpfxReactGridWebPart");
    ReactDom.render(App(), this.domElement);
  }
  protected deserialize(data: IWebPartData): ISpfxReactGridWebPartProps {
    const info = super.deserialize(data);
    return info;
  }
  protected onBeforeSerialize(): IHtmlProperties {

    // this.properties.columns = [];
    //  this.properties.lists =[];
    this.properties.columns = store.getState().columns;
    this.properties.lists = store.getState().lists;
    return super.onBeforeSerialize();
  }
  protected get propertyPaneSettings(): IPropertyPaneSettings {
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
                })
              ]
            }
          ]
        }
      ]
    };
  }
}

