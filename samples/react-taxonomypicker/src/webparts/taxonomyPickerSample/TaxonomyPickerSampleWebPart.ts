import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration
} from '@microsoft/sp-webpart-base';

import * as strings from 'taxonomyPickerSampleStrings';
import TaxonomyPickerSample from './components/TaxonomyPickerSample';
import { ITaxonomyPickerSampleProps } from './components/ITaxonomyPickerSampleProps';
import { ITaxonomyPickerSampleWebPartProps } from './ITaxonomyPickerSampleWebPartProps';

import { PropertyPaneTaxonomyPicker } from '../../controls/PropertyPaneTaxonomyPicker/PropertyPaneTaxonomyPicker';

import { Log } from "@microsoft/sp-core-library";

export default class TaxonomyPickerSampleWebPart extends BaseClientSideWebPart<ITaxonomyPickerSampleWebPartProps> {


  public render(): void {
    const element: React.ReactElement<ITaxonomyPickerSampleProps> = React.createElement(
      TaxonomyPickerSample,
      {
        description: "Open Pane Property panel to pick some languages...",
        pickerValue: this.properties.pickerValue
      }
    );
    Log.verbose("TaxonomyPickerSampleWebPart", "In render of TaxonomyPickerSampleWebPart");
    ReactDom.render(element, this.domElement);
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
                PropertyPaneTaxonomyPicker("Language", {
                  key: "Language_Field",
                  name: "Language",
                  displayName: "Language",
                  multi: true,
                  // termSetGuid: "26ebf149-101a-4996-9df2-8179a537350d",
                  // termSetName: "Language",
                  termSetCountMaxSwapToAsync: 100,
                  defaultOptions: [
                    { label: "English", value: "f50249b6-310d-43b6-aaa6-f0cb46d851bf" },
                    { label: "Spanish", value: "237ca323-1ed8-4199-a49b-a9f7ce4256bf" },
                    { label: "German", value: "44024c7e-f738-4755-90e1-15866327c806" },
                    { label: "Italian", value: "65f67491-bdca-491a-84fa-f6fd913f40fa" },
                  ],
                  onPickerChange: this._updateTaxonomyPicker
                })
              ]
            }
          ]
        }
      ]
    };
  }

  private _updateTaxonomyPicker = (name, value) => {
    console.log(name + ": ");
    console.log(value);
    if (value !== null && value !== undefined) {
      if (value.hasOwnProperty("length")) {
        this.properties.pickerValue = value.map((item) => item.label).join(", ");
      } else {
        this.properties.pickerValue = value.toString();
      }
      this.render();
    }


  }
}
