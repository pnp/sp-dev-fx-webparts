import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
} from '@microsoft/sp-property-pane';
import { BaseComponentContext } from '@microsoft/sp-component-base';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { PropertyFieldCodeEditor, PropertyFieldCodeEditorLanguages } from '@pnp/spfx-property-controls/lib/PropertyFieldCodeEditor';
import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';
import { IJsonFormProps, JsonForm } from './components/JsonForm';
import { IForm } from '../../Models/Form';
import { IDataProvider, SharePointProvider } from '../../Providers/SharePointProvider';

export interface IJsonFormWebPartProps {
  formJson: string;
  listId: string;
}

export interface AppContext {
  context: BaseComponentContext;
  provider: IDataProvider;
}

export const SPFxContext = React.createContext<AppContext>(null);
const urlSearchParams = new URLSearchParams(window.location.search);
export const FILLED_FORM_QUERY_KEY = "FormServerRelativeUrl";

export default class JsonFormWebPart extends BaseClientSideWebPart<IJsonFormWebPartProps> {

  public render(): void {
    const element: React.ReactElement = React.createElement(
      SPFxContext.Provider,
      {
        value: {
          context: this.context,
          provider: new SharePointProvider(this.context, this.properties.listId)
        } as AppContext
      },
      React.createElement<IJsonFormProps>(
        JsonForm,
        {
          Form: JSON.parse(this.properties.formJson),
          // eslint-disable-next-line no-return-assign
          SaveForm: (updated: IForm) => this.properties.formJson = JSON.stringify({ ...JSON.parse(this.properties.formJson), ...updated }, null, 2),
          Mode: this.displayMode,
          ListId: this.properties.listId,
          ServerRelativeUrl: urlSearchParams.has(FILLED_FORM_QUERY_KEY) ? urlSearchParams.get(FILLED_FORM_QUERY_KEY) : null,
        }
      )
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          groups: [
            {
              groupName: "Settings",
              groupFields: [
                PropertyFieldCodeEditor('formJson', {
                  key: "formJson",
                  label: "Raw JSON",
                  panelTitle: "Edit JSON",
                  initialValue: this.properties.formJson,
                  onPropertyChange: (path, old, newval) => this.onPropertyPaneFieldChanged(path, old, newval),
                  properties: this.properties,
                  language: PropertyFieldCodeEditorLanguages.JSON,
                }),
                PropertyFieldListPicker('listId', {
                  context: this.context,
                  label: "Select a list to store the data",
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  baseTemplate: 101,
                  includeHidden: false,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  key: "listId"
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
