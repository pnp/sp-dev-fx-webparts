import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, DisplayMode } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'CascadingManagedMetadataWebPartStrings';
import CascadingManagedMetadata from './components/CascadingManagedMetadata';
import { MSGraph } from './services/MSGraph';

export interface ICascadingManagedMetadataWebPartProps {
  termSetId: string;
}

export default class CascadingManagedMetadataWebPart extends BaseClientSideWebPart<ICascadingManagedMetadataWebPartProps> {

  private _placeholder = null;

  public async render(): Promise<void> {
    await MSGraph.Init(this.context);
    let renderElement = null;
    //TODO: Use function to check if GUID?
    if (this.properties.termSetId && this.properties.termSetId.length == 36) {
      renderElement = React.createElement(
        CascadingManagedMetadata,
        {
          termSetId: this.properties.termSetId
        }
      );
    } else {
      if (this.displayMode === DisplayMode.Edit) {
        const { Placeholder } = await import(
          /* webpackChunkName: 'cascadingManagedMetadata-property-pane' */
          '@pnp/spfx-controls-react/lib/Placeholder'
        );
        this._placeholder = Placeholder;

        const placeholder: React.ReactElement<any> = React.createElement(
          this._placeholder,
          {
            iconName: 'Edit',
            iconText: 'Configure your webpart',
            description: 'Please configure the web part.',
            buttonLabel: 'Configure',
            onConfigure: this._onConfigure.bind(this)
          }
        );
        renderElement = placeholder;
      } else {
        renderElement = React.createElement('div', null);
      }
    }

    ReactDom.render(renderElement, this.domElement);
  }

  private _onConfigure = () => {
    this.context.propertyPane.open();
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
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('termSetId', {
                  label: strings.TermSetIdFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
