import * as React from "react";
import * as ReactDom from "react-dom";

import * as strings from "CustomLinksWebPartStrings";
import { Stack } from "office-ui-fabric-react";
import { FontIcon } from "office-ui-fabric-react/lib/Icon";

import {
  IReadonlyTheme,
  ThemeChangedEventArgs,
  ThemeProvider
} from "@microsoft/sp-component-base";
import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneSlider,
  PropertyPaneTextField
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IconPicker } from "@pnp/spfx-controls-react/lib/IconPicker";
import {
  CustomCollectionFieldType,
  PropertyFieldCollectionData
} from "@pnp/spfx-property-controls/lib/PropertyFieldCollectionData";
import {
  PropertyFieldColorPicker,
  PropertyFieldColorPickerStyle
} from "@pnp/spfx-property-controls/lib/PropertyFieldColorPicker";

import CustomLinks from "../../components/CustomLinks/CustomLinks";
import {
  ICustomLinksProps
} from "../../components/CustomLinks/ICustomLinksProps";
import { ILink } from "../../entities/ILink";

export interface ICustomLinksWebPartProps {
  title: string;
  backgroundColor: string;
  links: ILink[];
  fontSize: number;
  color:string;
  maxWidth: number;
  maxHeight: number;
  themeVariant: IReadonlyTheme | undefined;
}

export default class CustomLinksWebPart extends BaseClientSideWebPart<
  ICustomLinksWebPartProps
> {

  private _themeProvider: ThemeProvider;
  private _themeVariant: IReadonlyTheme | undefined;
  protected async onInit(): Promise<void> {
    this._themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);
    // If it exists, get the theme variant
    this._themeVariant = this._themeProvider.tryGetTheme();
    this.properties.themeVariant = this._themeVariant;
    // Register a handler to be notified if the theme variant changes
    this._themeProvider.themeChangedEvent.add(this, this._handleThemeChangedEvent);
    return Promise.resolve();
  }


  private _handleThemeChangedEvent(args: ThemeChangedEventArgs): void {
    this._themeVariant = args.theme;
    this.properties.themeVariant = this._themeVariant;
    this.render();
  }


  public render(): void {

    const element: React.ReactElement<ICustomLinksProps> = React.createElement(
      CustomLinks,
      {
        ...this.properties,
        onConfigure: ()=> {
          this.context.propertyPane.open();
        }
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {

    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          displayGroupsAsAccordion: true,
          groups: [
            {
              groupName: strings.linksLinksGroupName,

              groupFields: [
                PropertyFieldCollectionData("links", {
                  key: "collectionData",
                  label: "",
                  panelHeader: strings.PanelHeaderDataCollection,
                  manageBtnLabel: strings.ManageBtnLabel,
                  value: this.properties.links,
                  fields: [

                    {
                      id: "linkIcon",
                      title: "Icon",
                      type: CustomCollectionFieldType.custom,

                      onCustomRender: (
                        field,
                        value,
                        onUpdate,
                        item,
                        itemId,
                        onError
                      ) => {
                        return  (
                          React.createElement(Stack,{ horizontal: true, horizontalAlign: "center", tokens: {childrenGap: 5}},
                          React.createElement(FontIcon, {
                            iconName: value,
                            style: { fontSize: 26, marginRight: 25}
                          }),
                          React.createElement(IconPicker, {
                            buttonLabel: "Icon",
                            renderOption: "dialog",
                            onSave: (iconName: string) => {
                              onUpdate(field.id, iconName);
                            },
                          })
                          )
                        );
                      },
                    },
                    {
                      id: "linkName",
                      title: "Name",
                      type: CustomCollectionFieldType.string,
                      required: true
                    },
                    {
                      id: "linkURL",
                      title: "Url",
                      type: CustomCollectionFieldType.string,
                      required: true,
                      onGetErrorMessage: (value, index)=>{
                        try {
                          const _url = new URL(value);
                          return '';
                        } catch (error) {
                          return strings.URLMessageError;
                        }
                      }
                    },
                  ],
                  disabled: false,
                }),
              ],
            },
            {
              groupName: strings.WebPartPropertiesGroupName,
              isCollapsed: true,
              groupFields: [
                PropertyPaneTextField("title", {
                  label: strings.TitleFieldLabel,
                }),
                PropertyFieldColorPicker("backgroundColor", {
                  label: strings.BackgroundColorLabel,
                  selectedColor: this.properties.backgroundColor ?  this.properties.backgroundColor :this._themeVariant.palette.themePrimary ,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  isHidden: false,
                  alphaSliderHidden: false,
                  style: PropertyFieldColorPickerStyle.Full,
                  iconName: "Precipitation",
                  key: "backgroundColorFieldId",
                }),
                PropertyFieldColorPicker("color", {
                  label: strings.ColorLabel,
                  selectedColor: this.properties.color ? this.properties.color : this._themeVariant.palette.white ,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  isHidden: false,
                  alphaSliderHidden: false,
                  style: PropertyFieldColorPickerStyle.Full,
                  iconName: "Precipitation",
                  key: "colorFieldId",
                }),
                PropertyPaneSlider("fontSize", {
                  label: strings.FontSizeLabel,
                  step:1,
                  value: this.properties.fontSize | 16,
                  max: 30,
                  min: 8,
                  disabled: false,
                }),
                PropertyPaneSlider("maxWidth", {
                  label: strings.MaxWidthLabel,
                  step:1,
                  value: this.properties.maxWidth ,
                  max: 1200,
                  min: 280,
                  disabled: false,
                }),
                PropertyPaneSlider("maxHeight", {
                  label: strings.MaxHeightLabel,
                  step: 1,
                  value: this.properties.maxHeight ,
                  max: 800,
                  min: 400,
                  disabled: false,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
