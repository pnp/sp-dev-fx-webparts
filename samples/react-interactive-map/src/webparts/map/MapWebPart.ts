import * as React from 'react';
import * as ReactDom from 'react-dom';
import { DisplayMode, Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle,
  PropertyPaneSlider,
  PropertyPaneButton,
  PropertyPaneDropdown
} from '@microsoft/sp-property-pane';
import { PropertyPaneWebPartInformation } from '@pnp/spfx-property-controls/lib/PropertyPaneWebPartInformation';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'MapWebPartStrings';
import Map from './components/Map';
import { IMapProps, IMarker, IMarkerCategory } from './components/IMapProps';
import ManageMarkerCategoriesDialog, { IManageMarkerCategoriesDialogProps } from './components/ManageMarkerCategoriesDialog';
import SetStartLocationDialog, { ISetStartLocationDialogProps } from './components/SetStartLocationDialog';
import { isNullOrEmpty } from '@spfxappdev/utility';
import { Spinner, ISpinnerProps } from '@fluentui/react';

const OSM_TILE_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const OSM_TILE_ATTRIBUTION = "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors";

interface ITileLayerPreset {
  key: string;
  text: string;
  url: string;
  attribution: string;
}

/** Ready-made, no-API-key base maps. Selecting one fills in the tile URL + attribution;
 *  "custom" leaves the fields editable so an author can paste their own provider. */
const TILE_LAYER_PRESETS: ITileLayerPreset[] = [
  { key: 'streets', text: 'Streets (OpenStreetMap)', url: OSM_TILE_URL, attribution: OSM_TILE_ATTRIBUTION },
  { key: 'satellite', text: 'Satellite (Esri)', url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', attribution: 'Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community' },
  { key: 'topographic', text: 'Topographic (Esri)', url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', attribution: 'Tiles &copy; Esri &mdash; Esri, HERE, Garmin, Intermap, USGS, and the GIS User Community' },
  { key: 'custom', text: 'Custom (enter a tile URL below)', url: '', attribution: '' }
];

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
  fitToMarkers: boolean;
  plugins: IMapPlugins;
  tileLayerPreset: string;
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
        markerItems: this.properties.markerItems || [],
        markerCategories: this.properties.markerCategories||[],
        isEditMode: this.displayMode === DisplayMode.Edit,
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
        // Default on so visitors see every marker on load; falls back to the start view when off.
        fitToMarkers: this.properties.fitToMarkers ?? true,

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

  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: unknown, newValue: unknown): void {
    super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);

    // Picking a map-style preset fills in the tile URL + attribution, then refreshes the
    // pane so the (read-only unless "custom") URL/attribution fields reflect the choice.
    if (propertyPath === 'tileLayerPreset') {
      const preset = TILE_LAYER_PRESETS.filter(p => p.key === (newValue as string))[0];
      if (preset && preset.key !== 'custom') {
        this.properties.tileLayerUrl = preset.url;
        this.properties.tileLayerAttribution = preset.attribution;
      }
      this.context.propertyPane.refresh();
      this.reload();
      return;
    }

    // markercluster and legend render as MapContainer children; react-leaflet v3
    // doesn't reliably reconcile them after the map is created, so remount on toggle.
    // (searchBox is now an overlay sibling and updates reactively — no remount needed.)
    const reloadIfOneOfProps = ["height", "tileLayerUrl", "minZoom", "maxZoom", "tileLayerAttribution", "plugins.zoomControl", "plugins.markercluster", "plugins.legend"];
    
    if(reloadIfOneOfProps.Contains(p => p.Equals(propertyPath))) {
      this.reload();
    }
  }

  private reload(): void {
    
    setTimeout(() => {
      const spinner: React.ReactElement<ISpinnerProps> = React.createElement(Spinner, {

      });

      ReactDom.render(spinner, this.domElement);

      setTimeout(() => {
        ReactDom.unmountComponentAtNode(this.domElement);
        this.render();
      }, 300);
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
    this.domElement.style.setProperty('--bodyText', semanticColors!.bodyText!);
    this.domElement.style.setProperty('--link', semanticColors!.link!);
    this.domElement.style.setProperty('--linkHovered', semanticColors!.linkHovered!);

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  /** Opens the "Set start location" mini-map dialog and, on save, persists center + zoom. */
  private openSetStartLocationDialog(): void {
    const dummyElement: HTMLDivElement = document.createElement("div");
    document.body.appendChild(dummyElement);

    const closeDialog = (): void => {
      ReactDom.unmountComponentAtNode(dummyElement);
      dummyElement.remove();
    };

    const element: React.ReactElement<ISetStartLocationDialogProps> = React.createElement(SetStartLocationDialog, {
      center: this.properties.center ?? [51.505, -0.09],
      zoom: this.properties.startZoom ?? 13,
      tileLayerUrl: isNullOrEmpty(this.properties.tileLayerUrl) ? OSM_TILE_URL : this.properties.tileLayerUrl,
      tileLayerAttribution: isNullOrEmpty(this.properties.tileLayerAttribution) ? OSM_TILE_ATTRIBUTION : this.properties.tileLayerAttribution,
      onSave: (center: [number, number], zoom: number) => {
        this.properties.center = center;
        this.properties.startZoom = zoom;
        this.reload();
      },
      onDismiss: () => {
        closeDialog();
      }
    });

    ReactDom.render(element, dummyElement);
  }

  /** Opens the "Manage categories" dialog and applies any category changes. */
  private openManageCategoriesDialog(): void {
    const dummyElement: HTMLDivElement = document.createElement("div");
    document.body.appendChild(dummyElement);

    const closeDialog = (): void => {
      ReactDom.unmountComponentAtNode(dummyElement);
      dummyElement.remove();
    };

    const element: React.ReactElement<IManageMarkerCategoriesDialogProps> = React.createElement(ManageMarkerCategoriesDialog, {
      markerCategories: this.properties.markerCategories,
      onDismiss: () => {
        closeDialog();
      },
      onMarkerCategoriesChanged: (markerCategories: IMarkerCategory[]) => {
        closeDialog();
        this.onMarkerCategoriesChanged(markerCategories);
      },
    });

    ReactDom.render(element, dummyElement);
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: { description: strings.WebPartPropertyGroupMapSettings },
          groups: [
            {
              groupName: strings.WebPartPropertyGroupMapSettings,
              groupFields: [
                // PropertyPaneWebPartInformation({
                //   description: `<div class='wp-settings-info'>${strings.WebPartPropertySettingsInfoLabel}</div>`,
                //   key: 'Info_For_3f860b48-1dc3-496d-bd28-b145672289cc'
                // }),
                PropertyPaneButton('setStartLocationButton', {
                  text: strings.WebPartPropertyButtonSetStartLocation,
                  onClick: () => {
                    this.openSetStartLocationDialog();
                    return null;
                  }
                }),
                PropertyPaneToggle('fitToMarkers', {
                  label: strings.WebPartPropertyFitToMarkersLabel
                }),
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
            }
          ]
        },
        {
          header: { description: strings.WebPartPropertyGroupCategories },
          groups: [
            {
              groupName: strings.WebPartPropertyGroupCategories,
              groupFields: [
                PropertyPaneButton('manageCategoriesButton', {
                  text: strings.WebPartPropertyButtonManageCategories,
                  onClick: () => {
                    this.openManageCategoriesDialog();
                    return null;
                  }
                }),
                PropertyPaneToggle('plugins.legend', {
                  label: strings.WebPartPropertyPluginLegendLabel
                })
              ]
            }
          ]
        },
        {
          header: { description: strings.WebPartPropertyGroupPlugins },
          groups: [
            {
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
            }
          ]
        },
        {
          header: { description: strings.WebPartPropertyGroupTileLayerSettings },
          groups: [
            {
              groupName: strings.WebPartPropertyGroupTileLayerSettings,
              groupFields: [
                PropertyPaneDropdown('tileLayerPreset', {
                  label: strings.WebPartPropertyTileLayerPresetLabel,
                  options: TILE_LAYER_PRESETS.map(p => ({ key: p.key, text: p.text }))
                }),
                PropertyPaneWebPartInformation({
                  description: `<div class='wp-settings-info'>${strings.WebPartPropertyTileLayerUrlInformationLabel}</div>`,
                  key: 'Tile_For_3f860b48-1dc3-496d-bd28-b145672289cc'
                }),
                PropertyPaneTextField('tileLayerUrl', {
                  label: strings.WebPartPropertyTileLayerUrlLabel,
                  disabled: (this.properties.tileLayerPreset ?? 'streets') !== 'custom'
                }),
                PropertyPaneTextField('tileLayerAttribution', {
                  label: strings.WebPartPropertyTileLayerAttributionLabel,
                  disabled: (this.properties.tileLayerPreset ?? 'streets') !== 'custom'
                }),
              ]
            }
          ]
        },
        {
          header: { description: strings.WebPartPropertyGroupAbout },
          groups: [
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
          ]
        }
      ]
    };
  }
}
