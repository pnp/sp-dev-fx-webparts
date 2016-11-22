import * as React from "react";
import * as ReactDom from "react-dom";
import { Provider } from "react-redux";

import configureStore from "./store/configure-store";

import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField
} from "@microsoft/sp-webpart-base";
import {
  Log
} from "@microsoft/sp-client-base";


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
const store = configureStore();
const App: React.StatelessComponent<any> = () => (
  <Provider store={store}>
    <SpfxReactGridContainer/>
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
