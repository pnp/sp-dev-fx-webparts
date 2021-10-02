import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration
} from '@microsoft/sp-webpart-base';

import * as strings from 'LatestDocumentsWebPartStrings';
import LatestDocuments from './components/LatestDocuments';
import { ILatestDocumentsProps } from './components/ILatestDocumentsProps';
import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';
import { CalloutTriggers } from '@pnp/spfx-property-controls/lib/PropertyFieldHeader';
import { PropertyFieldTextWithCallout } from '@pnp/spfx-property-controls/lib/PropertyFieldTextWithCallout';
import { ListSubscriptionFactory } from '@microsoft/sp-list-subscription';
import { sp } from '@pnp/sp';

export interface ILatestDocumentsWebPartProps {
  libraryId?: string;
  siteUrl?: string;
  title: string;
}

export default class LatestDocumentsWebPart extends BaseClientSideWebPart<ILatestDocumentsWebPartProps> {
  public onInit(): Promise<void> {
    sp.setup({
      spfxContext: this.context
    });

    return Promise.resolve();
  }

  public render(): void {
    const element: React.ReactElement<ILatestDocumentsProps> = React.createElement(
      LatestDocuments,
      {
        displayMode: this.displayMode,
        libraryId: this.properties.libraryId,
        listSubscriptionFactory: new ListSubscriptionFactory(this),
        onConfigure: this._onConfigure,
        siteUrl: this.properties.siteUrl,
        title: this.properties.title,
        updateProperty: value => this.properties.title = value
      }
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
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyFieldTextWithCallout('siteUrl', {
                  calloutTrigger: CalloutTriggers.Click,
                  key: 'siteUrlFieldId',
                  label: 'Site URL',
                  calloutContent: React.createElement('span', {}, 'URL of the site where the document library to show documents from is located. Leave empty to connect to a document library from the current site'),
                  calloutWidth: 250,
                  value: this.properties.siteUrl
                }),
                PropertyFieldListPicker('libraryId', {
                  label: 'Select a document library',
                  selectedList: this.properties.libraryId,
                  includeHidden: false,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  disabled: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'listPickerFieldId',
                  webAbsoluteUrl: this.properties.siteUrl,
                  baseTemplate: 101
                })
              ]
            }
          ]
        }
      ]
    };
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  protected onPropertyPaneConfigurationComplete(): void {
    // ideally, we'd call a refresh here to update the list of properties
    // but due to a bug in the list picker control, lists are loaded only
    // on component mount, so this wouldn't do anything
    // https://github.com/pnp/sp-dev-fx-property-controls/issues/109
    // this.context.propertyPane.refresh();
  }

  private _onConfigure = () => this.context.propertyPane.open();
}
