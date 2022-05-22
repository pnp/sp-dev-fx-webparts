import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneButton,
  PropertyPaneButtonType,
  PropertyPaneDropdown,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { sp } from "@pnp/sp";

import * as strings from 'ReactEmojiReactionRatingWebPartStrings';
import ReactEmojiReactionRating from './components/ReactEmojiReactionRating';
import { IReactEmojiReactionRatingProps } from './components/IReactEmojiReactionRatingProps';
import { PropertyFieldCollectionData, CustomCollectionFieldType } from '@pnp/spfx-property-controls/lib/PropertyFieldCollectionData';
import { PropertyFieldColorPicker, PropertyFieldColorPickerStyle } from '@pnp/spfx-property-controls/lib/PropertyFieldColorPicker';

import spService from './components/services/spService';
import { result } from 'lodash';

export interface IReactEmojiReactionRatingWebPartProps {
  propertyRatingText: string;
  propertyEmojisCollection: any[];
  propertyEnableComments: boolean;
  propertyEnableCount: boolean;
  propertySelectedColor: string;
  propertyListName: string;
  propertyListOperationMessage: string;
}


export default class ReactEmojiReactionRatingWebPart extends BaseClientSideWebPart<IReactEmojiReactionRatingWebPartProps> {

  private _spService: spService = null;
  public render(): void {

    const element: React.ReactElement<IReactEmojiReactionRatingProps> = React.createElement(
      ReactEmojiReactionRating,
      {
        ratingText: this.properties.propertyRatingText,
        emojisCollection: this.properties.propertyEmojisCollection,
        context: this.context,
        enableComments: this.properties.propertyEnableComments,
        enableCount: this.properties.propertyEnableCount,
        selectedColor: this.properties.propertySelectedColor,
        listName: this.properties.propertyListName,
        displayMode: this.displayMode,
        listMessage: this.properties.propertyListOperationMessage,
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

  private validateListName(value: string): string {
    if (value === null ||
      value.trim().length === 0) {
      return 'Provide a list name';
    }
    else {
      console.log("List Name: ", value);

      return '';
    }
  }


  public onInit(): Promise<void> {
    this._spService = new spService(this.context);
    return Promise.resolve();
  }

  private btnListSchemaCreation(val: any): any {
    const colListColumns = ['Pagename', 'User', 'Rating1', 'Rating2', 'Rating3', 'Rating4', 'Rating5', 'Comments'];
    console.log("colListColumns: ", colListColumns);
    let listName = this.properties.propertyListName;
    console.log("listName: ", listName);

    this._spService._createListwithColumns(listName, colListColumns).then((res) => {
      console.log(res);
      //this.properties.propertyListOperationMessage = result;
      //this.context.propertyPane.refresh();  
      alert(res);

    }).catch(error => {
      console.log("Something went wrong! please contact admin for more information.", error);
      // this.properties.propertyListOperationMessage = "Something went wrong! please contact admin for more information."
      // this.context.propertyPane.refresh(); 
      let errMessage = (error.mesaage || error.Mesaage);
      alert("Something went wrong! please contact admin for more information. "+ errMessage);
    });

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
                PropertyPaneTextField('propertyListName', {
                  label: strings.ListNameFieldLabel,
                  description: "If you want to create new list, please enter list name and click on create list button",
                  validateOnFocusOut: true,
                  onGetErrorMessage: this.validateListName.bind(this),

                }),
                PropertyPaneButton('propertyListSchemaButton',
                  {
                    text: strings.ListSchemaFieldLablel,
                    buttonType: PropertyPaneButtonType.Primary,
                    onClick: this.btnListSchemaCreation.bind(this)
                  }),
                PropertyPaneTextField('propertyRatingText', {
                  label: strings.RatingTextFieldLabel
                }),
                PropertyFieldCollectionData("propertyEmojisCollection", {
                  key: "emojisCollection",
                  label: strings.EmojisCollectionFieldLabel,//"Emojis Collection",
                  panelHeader: "Emojis collection panel header",
                  manageBtnLabel: "Manage emojis collection",
                  value: this.properties.propertyEmojisCollection,
                  fields: [
                    {

                      id: "Title",
                      title: "Title",
                      type: CustomCollectionFieldType.string,
                      required: true
                    },
                    {
                      id: "ImageUrl",
                      title: "ImageUrl",
                      type: CustomCollectionFieldType.url,
                      required: true

                    }
                  ],
                  disabled: false,
                  disableItemCreation: true,
                  disableItemDeletion: true,
                }),
                PropertyPaneToggle('propertyEnableComments', {
                  label: strings.EnableCommentsFieldLablel
                }),
                PropertyPaneToggle('propertyEnableCount', {
                  label: strings.EnableCountFieldLablel
                }),
                PropertyFieldColorPicker('propertySelectedColor', {
                  label: 'Select background color',
                  selectedColor: this.properties.propertySelectedColor,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  debounce: 1000,
                  isHidden: false,
                  alphaSliderHidden: false,
                  style: PropertyFieldColorPickerStyle.Full,
                  iconName: 'Precipitation',
                  key: 'colorFieldId'
                }),


              ]
            }

          ]
        }
      ]
    };
  }
}
