import * as React from 'react';
import * as ReactDom from 'react-dom';
import { DisplayMode, Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle,
  PropertyPaneSlider,
  PropertyPaneButton
} from '@microsoft/sp-property-pane';
import { PropertyPaneWebPartInformation } from '@pnp/spfx-property-controls/lib/PropertyPaneWebPartInformation';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'MapWebPartStrings';
import Map from './components/Map';
import { IMapProps, IMarker, IMarkerCategory } from './components/IMapProps';
import ManageMarkerCategoriesDialog, { IManageMarkerCategoriesDialogProps } from './components/ManageMarkerCategoriesDialog';
import { isNullOrEmpty } from '@spfxappdev/utility';
import { Spinner, ISpinnerProps } from '@microsoft/office-ui-fabric-react-bundle';

export interface IMapPlugins {
  searchBox: boolean;
  markercluster: boolean;
  legend: boolean;
  zoomControl: boolean;
}

export interface IMapWebPartProps {
  markerItems: IMarker[];
  markerCategories: IMarkerCategory[];
  title: string;
  center: [number, number];
  startZoom: number;
  maxZoom: number;
  minZoom: number;
  height: number;
  scrollWheelZoom: boolean;
  dragging: boolean;
  showPopUp: boolean;
  plugins: IMapPlugins;
  tileLayerUrl: string;
  tileLayerAttribution: string;
    
}

export default class MapWebPart extends BaseClientSideWebPart<IMapWebPartProps> {

  private _isDarkTheme: boolean = false;

  protected onInit(): Promise<void> {
    return super.onInit();
  }

  public render(): void {
    const element: React.ReactElement<IMapProps> = React.createElement(
      Map,
      {
        markerItems: this.properties.markerItems||[],
        markerCategories: this.properties.markerCategories||[],
        isEditMode: this.displayMode == DisplayMode.Edit,
        zoom: this.properties.startZoom,
        minZoom: this.properties.minZoom,
        maxZoom: this.properties.maxZoom,
        center: this.properties.center,
        title: this.properties.title,
        height: this.properties.height,
        plugins: this.properties.plugins,
        tileLayerUrl: isNullOrEmpty(this.properties.tileLayerUrl) ? "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" : this.properties.tileLayerUrl,
        tileLayerAttribution: isNullOrEmpty(this.properties.tileLayerAttribution) ? "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors" : this.properties.tileLayerAttribution,
        dragging: this.properties.dragging,
        scrollWheelZoom: this.properties.scrollWheelZoom,
        showPopUp: this.properties.showPopUp, 

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

  protected onDisplayModeChanged(oldDisplayMode: DisplayMode): void {
      this.reload();
  }

  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
    super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);

    const reloadIfOneOfProps = ["height", "tileLayerUrl", "minZoom", "maxZoom", "tileLayerAttribution", "plugins.zoomControl"];
    
    if(reloadIfOneOfProps.Contains(p => p.Equals(propertyPath))) {
      this.reload();
    }
  }

  private reload(): void {
    
    setTimeout(() => {
      const spinner: React.ReactElement<ISpinnerProps> = React.createElement(Spinner, {

      });

      ReactDom.render(spinner, this.domElement);

      setTimeout(() => { this.render(); }, 300);
    }, 500);
    
    
  }

  // protected get disableReactivePropertyChanges(): boolean {
  //   return true;
  // }

  private onMarkerCategoriesChanged(markerCategories: IMarkerCategory[]): void {
    this.properties.markerCategories = markerCategories;
    this.render();
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
          groups: [
            {
              groupName: strings.WebPartPropertyGroupMapSettings,
              groupFields: [
                // PropertyPaneWebPartInformation({
                //   description: `<div class='wp-settings-info'>${strings.WebPartPropertySettingsInfoLabel}</div>`,
                //   key: 'Info_For_3f860b48-1dc3-496d-bd28-b145672289cc'
                // }),
                PropertyPaneSlider('minZoom', {
                  label: strings.WebPartPropertyMinZoomLabel,
                  max: 30,
                  min: 0,
                  step: 1
                }),
                PropertyPaneSlider('maxZoom', {
                  label: strings.WebPartPropertyMaxZoomLabel,
                  max: 30,
                  min: 5,
                  step: 1
                }),
                PropertyPaneSlider('height', {
                  label: strings.WebPartPropertyHeightLabel,
                  min: 100,
                  max: 1200,
                  step: 50
                }),
                PropertyPaneToggle('scrollWheelZoom', {
                  label: strings.WebPartPropertyScrollWheelZoomLabel,
                }),
                PropertyPaneToggle('dragging', {
                  label: strings.WebPartPropertyMapDraggingLabel,
                }),
                PropertyPaneToggle('showPopUp', {
                  label: strings.WebPartPropertyShowPopUpLabel,
                }),
                
              ]
            },
            {
              isCollapsed: true,
              groupName: strings.WebPartPropertyGroupTileLayerSettings,
              groupFields: [
                PropertyPaneWebPartInformation({
                  description: `<div class='wp-settings-info'>${strings.WebPartPropertyTileLayerUrlInformationLabel}</div>`,
                  key: 'Tile_For_3f860b48-1dc3-496d-bd28-b145672289cc'
                }),
                PropertyPaneTextField('tileLayerUrl', {
                  label: strings.WebPartPropertyTileLayerUrlLabel
                }),
                PropertyPaneTextField('tileLayerAttribution', {
                  label: strings.WebPartPropertyTileLayerAttributionLabel
                }),                
              ]
            },
            {
              isCollapsed: true,
              groupName: strings.WebPartPropertyGroupPlugins,
              groupFields: [
                PropertyPaneToggle('plugins.searchBox', {
                  label: strings.WebPartPropertyPluginSearchboxLabel
                }),
                PropertyPaneToggle('plugins.markercluster', {
                  label: strings.WebPartPropertyPluginMarkerClusterLabel,
                }),
                PropertyPaneToggle('plugins.zoomControl', {
                  label: strings.WebPartPropertyPluginZoomControlLabel
                }),
              ]
            },
            {
              isCollapsed: true,
              groupName: strings.WebPartPropertyGroupCategories,
              groupFields: [
                PropertyPaneButton(null, {
                  text: strings.WebPartPropertyButtonManageCategories,
                  onClick: (val: any) => {
                    const dummyElement: HTMLDivElement = document.createElement("div");
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
                }),
                PropertyPaneToggle('plugins.legend', {
                  label: strings.WebPartPropertyPluginLegendLabel
                })
              ]
            },
            {
              groupName: strings.WebPartPropertyGroupAbout,
              groupFields: [
                PropertyPaneWebPartInformation({
                  description: `<h3>Author</h3> 
                                <a href='https://spfx-app.dev/' data-interception="off" target='_blank'>SPFx-App.dev</a>
                                <h3>Version</h3>
                                ${this.context.manifest.version}
                                <h3>Web Part Instance id</h3>
                                ${this.context.instanceId}`,
                  moreInfoLink: `https://spfxappdev.github.io/sp-map-webpart/`,
                  key: '3f860b48-1dc3-496d-bd28-b145672289cc'
                })
              ]
            }
          ],
          displayGroupsAsAccordion: true,
        }
      ]
    };
  }
}
