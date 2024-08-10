import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import QuickLinks, { IQuickLinksProps } from './components/QuickLinksGrid';
import * as strings from 'PnPQuickLinksGridWebPartStrings';

export interface IPnPQuickLinksGridWebPartProps {
  listTitle: string;    // Title of the SharePoint list
  titleField: string;   // Internal name of the field representing titles
  urlField: string;     // Internal name of the field representing URLs
  iconField: string;    // Internal name of the field representing icons
}

export default class PnPQuickLinksGridWebPart extends BaseClientSideWebPart<IPnPQuickLinksGridWebPartProps> {

  // Disable automatic property pane updates to avoid unnecessary renders
  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  /**
   * Renders the web part. If required properties are not set, displays a message to the user.
   */
  public render(): void {
    // Ensure any previously rendered component is unmounted before rendering a new one
    ReactDom.unmountComponentAtNode(this.domElement);

    if (!this.properties.listTitle || !this.properties.titleField || !this.properties.urlField || !this.properties.iconField) {
      // Render a message if essential properties are not configured
      ReactDom.render(
        React.createElement('div', null, 'Please configure the web part properties from Property Pane.'),
        this.domElement
      );
    } else {
      // Render the QuickLinks component if all properties are configured
      const element: React.ReactElement<IQuickLinksProps> = React.createElement(
        QuickLinks,
        {
          context: this.context,
          listTitle: this.properties.listTitle,
          titleField: this.properties.titleField,
          urlField: this.properties.urlField,
          iconField: this.properties.iconField
        }
      );
      ReactDom.render(element, this.domElement);
    }
  }

  /**
   * Clean up when the web part is disposed.
   */
  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  /**
   * Initializes the web part. Can be used to perform asynchronous setup tasks.
   */
  protected onInit(): Promise<void> {
    return super.onInit();
  }

  /**
   * Defines the data version used by the web part. This can help with data migration scenarios.
   */
  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  /**
   * Configures the property pane settings.
   */
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription // Description shown at the top of the property pane
          },
          groups: [
            {
              //groupName: strings.BasicGroupName, // Group name for related properties
              groupFields: [
                PropertyPaneTextField('listTitle', {
                  label: 'List Title',
                  description: 'Enter the title of the SharePoint list to fetch data from'
                }),
                PropertyPaneTextField('titleField', {
                  label: 'Title Field',
                  description: 'Enter the internal name of the Title field'
                }),
                PropertyPaneTextField('urlField', {
                  label: 'URL Field',
                  description: 'Enter the internal name of the URL field'
                }),
                PropertyPaneTextField('iconField', {
                  label: 'Icon Field',
                  description: 'Enter the internal name of the Icon field'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
