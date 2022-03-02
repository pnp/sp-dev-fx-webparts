import * as React from 'react';
import * as ReactDom from 'react-dom';
import { DisplayMode, Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle,
  PropertyPaneSlider,
  PropertyPaneButton,
  PropertyPaneLabel

} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'MapWebPartStrings';
import Map from './components/Map';
import { IMapProps, IMarker, IMarkerCategory } from './components/IMapProps';
import ManageMarkerCategoriesDialog, { IManageMarkerCategoriesDialogProps } from './components/ManageMarkerCategoriesDialog';

export interface IMapPlugins {
  searchBox: boolean;
  markercluster: boolean;
  legend: boolean;
  zoomControl: boolean;
  scrollWheelZoom: boolean;
}

export interface IMapWebPartProps {
  markerItems: IMarker[];
  markerCategories: IMarkerCategory[];
  title: string;
  center: [number, number];
  startZoom: number;
  maxZoom: number;
  height: number;
  plugins: IMapPlugins;
}

export default class MapWebPart extends BaseClientSideWebPart<IMapWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

  protected onInit(): Promise<void> {
    this._environmentMessage = this._getEnvironmentMessage();

    return super.onInit();

    
  }

  public render(): void {

    console.log("render", this.properties);
    const element: React.ReactElement<IMapProps> = React.createElement(
      Map,
      {
        markerItems: this.properties.markerItems||[],
        markerCategories: this.properties.markerCategories||[],
        isEditMode: this.displayMode == DisplayMode.Edit,
        zoom: this.properties.startZoom,
        center: this.properties.center,
        title: this.properties.title,
        height: this.properties.height,
        plugins: this.properties.plugins,

        onMarkerCollectionChanged: (markerItems: IMarker[]) => {
          this.properties.markerItems = markerItems;
        },
        onMarkerCategoriesChanged: (markerCategories: IMarkerCategory[]) => {
          this.onMarkerCategoriesChanged(markerCategories);
        },
        onStartViewSet: (zoomLevel: number, lat: number, lng: number) => {
          this.properties.startZoom = zoomLevel;
          this.properties.center = [lat, lng];
        },
        
        onTitleUpdate: (value: string) => {
          this.properties.title = value;
        }
      }
    );

    ReactDom.render(element, this.domElement);
  }

  // protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
  //   super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue)
  //   console.log()
  // }

  private onMarkerCategoriesChanged(markerCategories: IMarkerCategory[]): void {
    this.properties.markerCategories = markerCategories;
    this.render();
  }

  private _getEnvironmentMessage(): string {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams
      return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
    }

    return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment;
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;
    this.domElement.style.setProperty('--bodyText', semanticColors.bodyText);
    this.domElement.style.setProperty('--link', semanticColors.link);
    this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered);

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
                PropertyPaneToggle('plugins.searchBox', {
                  label: "searchBox"
                }),
                PropertyPaneToggle('plugins.markercluster', {
                  label: "markercluster"
                }),
                PropertyPaneToggle('plugins.legend', {
                  label: "legend"
                }),
                PropertyPaneToggle('plugins.zoomControl', {
                  label: "zoomControl"
                }),
                PropertyPaneToggle('plugins.scrollWheelZoom', {
                  label: "scrollWheelZoom",
                }),
                PropertyPaneButton(null, {
                  text: "Manage categories",
                  onClick: (val: any) => {
                    const dummyElement: HTMLDivElement = document.createElement("div");
                    dummyElement.id = "teeeeest";
                    let reactInstance = null;

                    document.body.appendChild(dummyElement);

                    const element: React.ReactElement<IManageMarkerCategoriesDialogProps> = React.createElement(ManageMarkerCategoriesDialog, {
                      markerCategories: this.properties.markerCategories,
                      onDismiss: () => {
                        dummyElement.remove();
                      },
                      onMarkerCategoriesChanged: (markerCategories: IMarkerCategory[]) => {
                        dummyElement.remove();
                        this.onMarkerCategoriesChanged(markerCategories);
                      },
                    });

                    ReactDom.render(element, dummyElement);
                    
                    return null;
                  }
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
