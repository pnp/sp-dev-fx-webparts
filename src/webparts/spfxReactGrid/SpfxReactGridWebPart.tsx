import * as React from "react";
import * as ReactDom from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./store/configure-store";
const { Router, browserHistory } = require('react-router');
const { syncHistoryWithStore } = require('react-router-redux');
import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField
} from "@microsoft/sp-webpart-base";
import {
  Log
} from "@microsoft/sp-client-base";


import routes from './store/routes';
import * as strings from "spfxReactGridStrings";
// import SpfxReactGrid, { ISpfxReactGridProps } from "./components/SpfxReactGrid";
import SpfxReactGridContainer from "./SpfxReactGridContainer";


import { ISpfxReactGridWebPartProps } from "./ISpfxReactGridWebPartProps";
const columns= [{
        key: "id",
        name: "id",
        width: 80
      },
      {
        key: "title",
        name: "title",
        editable: true
      }]
    ;
const store = configureStore({});

const history = syncHistoryWithStore(browserHistory, store);
const App: React.StatelessComponent<any> = () => (
  <Provider store={store}>
   <Router history={ history }>
          { routes }
        </Router>
  </Provider>
);

export default class SpfxReactGridWebPart extends BaseClientSideWebPart<ISpfxReactGridWebPartProps> {

  public constructor(context: IWebPartContext) {
    super(context);
    Log.verbose("SpfxReactGridWebPart", "In constructor of SpfxReactGridWebPart");
    debugger;
  }

  public render(): void {
    Log.verbose("SpfxReactGridWebPart", "In render of SpfxReactGridWebPart");

    ReactDom.render(App(), this.domElement);
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
