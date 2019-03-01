import * as React from 'react';
import * as ReactDom from 'react-dom';
import { PropertyFieldTermPicker } from '@pnp/spfx-property-controls/lib/PropertyFieldTermPicker';
import { IPickerTerms } from '@pnp/spfx-property-controls/lib/PropertyFieldTermPicker';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'PhotoGalleryWebPartStrings';
import PhotoGallery from './components/PhotoGallery';
import { IPhotoGalleryProps } from './components/IPhotoGalleryProps';

export interface IPhotoGalleryWebPartProps {
  description: string;
  terms : IPickerTerms;
}



export default class PhotoGalleryWebPart extends BaseClientSideWebPart<IPhotoGalleryWebPartProps> {
  protected get disableReactivePropertyChanges(): boolean { 
    return true; 
  }
  public render(): void {
    const element: React.ReactElement<IPhotoGalleryProps > = React.createElement(
      PhotoGallery,
      {
        description: this.properties.description,
        tagkeywords : this.properties.terms,
        siteurl:this.context.pageContext.web.absoluteUrl,
        spHttpClient:this.context.spHttpClient      
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
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyFieldTermPicker('terms', {
                  label: 'Select Keywords',
                  panelTitle: 'Select Keywords',
                  initialValues: this.properties.terms,
                  allowMultipleSelections: true,
                  excludeSystemGroup: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  context: this.context,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  limitByGroupNameOrID: 'Site Collection - sudhirrawatdev.sharepoint.com-sites-TeamTestSite',
                  limitByTermsetNameOrID: 'Keyword',
                  key: 'termSetsPickerFieldId'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
