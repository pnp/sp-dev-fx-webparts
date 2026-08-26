import * as React from 'react';
import * as ReactDom from 'react-dom';
import styles from './Map.module.scss';
import { IMapProps, IMarker, IMarkerCategory, IMarkerIcon, emptyMarkerItem } from './IMapProps';
import { cloneDeep } from '@microsoft/sp-lodash-subset';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "react-leaflet-markercluster/dist/styles.min.css";
import * as L from 'leaflet';
import { SPComponentLoader } from '@microsoft/sp-loader';

SPComponentLoader.loadCss('https://unpkg.com/leaflet@1.9.4/dist/leaflet.css');
import { ContextualMenu, IContextualMenuItem, Panel, Dialog, IPanelProps, DefaultButton, PanelType, DialogType, DialogContent, Label, Separator, PrimaryButton } from '@fluentui/react';
import { isset, isNullOrEmpty, getDeepOrDefault, cssClasses } from '@spfxappdev/utility';
import '@spfxappdev/utility/lib/extensions/StringExtensions';
import '@spfxappdev/utility/lib/extensions/ArrayExtensions';
import { DisplayMode } from '@microsoft/sp-core-library';
import { RichText } from "@pnp/spfx-controls-react/lib/RichText";
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import AddOrEditPanel from './AddOrEditPanel';
import { isFunction } from 'lodash';
import { MarkerIcon } from './MarkerIcon';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import * as strings from 'MapWebPartStrings';
import PlaceSearch from './PlaceSearch';
import LegendPlugin from './plugins/legend/LegendPlugin';

interface IMapState {
  markerItems: IMarker[];
  markerCategories: IMarkerCategory[];
  rightMouseTarget?: { x: number; y: number };
  showAddOrEditMarkerPanel: boolean;
  currentMarker?: IMarker;
  showClickContent: boolean;
  changePositionMarkerId: string;
}

export default class Map extends React.Component<IMapProps, IMapState> {

  public state: IMapState = {
    markerItems: cloneDeep(this.props.markerItems),
    markerCategories: cloneDeep(this.props.markerCategories),
    showAddOrEditMarkerPanel: false,
    showClickContent: false,
    changePositionMarkerId: '-1'
  };

  private allCatagories: Record<string, IMarkerCategory> = {};

  private menuItems: IContextualMenuItem[] = [
    {
      key: 'newItem',
      text: strings.ContextMenuAddNewMarkerLabel,
      onClick: () => {
        this.onCreateNewMarkerContextMenuItemClick();
      }
    },
    {
      key: 'setStartView',
      text: strings.ContextMenuSetStartPositionLabel,
      onClick: () => {
        this.onSetStartView();
      }
    }
  ];

  private map: L.Map | undefined = undefined;

  private allLeafletMarker: Record<string, L.Marker> = {};

  private lastLatLngRightClickPosition!: L.LatLng;


  constructor(props: IMapProps) {
    super(props);
    this.setAllCatagoriesDictionary();
  }

  public componentDidUpdate(prevProps: Readonly<IMapProps>, prevState: Readonly<IMapState>, snapshot?: unknown): void {

    if(!JSON.stringify(prevProps.markerCategories).Equals(JSON.stringify(this.props.markerCategories))) {
      this.setState({
        markerCategories: cloneDeep(this.props.markerCategories)
      }, () => {
        this.setAllCatagoriesDictionary();
      });
    }

  }

  public render(): React.ReactElement<IMapProps> {
   
    this.allLeafletMarker = {};
    // const isZoomControlEnabled: boolean = this.props.isEditMode ? true : getDeepOrDefault<boolean>(this.props, "plugins.zoomControl", true);
    const isZoomControlEnabled: boolean = getDeepOrDefault<boolean>(this.props, "plugins.zoomControl", true);
    const isScrollWheelZoomEnabled: boolean = this.props.isEditMode ? true : getDeepOrDefault<boolean>(this.props, "scrollWheelZoom", true);
    const isDraggingEnabled: boolean = this.props.isEditMode ? true : getDeepOrDefault<boolean>(this.props, "dragging", true);
    //
    return (
      <div className={styles.map}>
        {(this.props.isEditMode || (!this.props.isEditMode && !isNullOrEmpty(this.props.title))) &&
          <WebPartTitle displayMode={this.props.isEditMode?DisplayMode.Edit:DisplayMode.Read}
                title={this.props.title!}
                updateProperty={this.props.onTitleUpdate!} />
        }      
        
      {/* A full-width, always-visible search bar above the map (the standard M365
          pattern) rather than a collapsed icon overlaid in the map corner. */}
      {this.props.plugins.searchBox &&
        <div style={{ marginBottom: 8 }}>
          <PlaceSearch
            placeholder="Search for a location…"
            onPlaceSelected={(lat: number, lon: number, _name: string, bounds?: [number, number, number, number]) => this.onSearchLocationSelected(lat, lon, bounds)}
          />
        </div>
      }
      <MapContainer
        className={this.props.isEditMode ? "edit-mode" : "display-mode"}
        zoomControl={isZoomControlEnabled}
        // Fallback to the manifest default (London) if no start view was configured —
        // an undefined center/zoom makes react-leaflet's MapContainer fail silently.
        center={this.props.center ?? [51.505, -0.09]}
        zoom={this.props.zoom ?? 13}
        maxZoom={this.props.maxZoom}
        minZoom={this.props.minZoom} 
        scrollWheelZoom={isScrollWheelZoomEnabled}
        touchZoom={isScrollWheelZoomEnabled}
        doubleClickZoom={isScrollWheelZoomEnabled}
        dragging={isDraggingEnabled}
        whenCreated={(map: L.Map) => {
            map.on("contextmenu", (ev: L.LeafletEvent) => {

              if (!this.props.isEditMode) {
                return;
              }

              this.lastLatLngRightClickPosition = (ev as L.LeafletMouseEvent).latlng;

              this.setState({
                rightMouseTarget: {
                  x: (ev as L.LeafletMouseEvent).originalEvent.clientX,
                  y: (ev as L.LeafletMouseEvent).originalEvent.clientY
                }
              });

            });

            this.map = map;

            // In display mode, frame all markers so visitors see every point on load —
            // a fixed start view would hide markers configured in other cities.
            if (this.props.fitToMarkers && !this.props.isEditMode) {
              this.fitMapToMarkers(map);
            }
          }
        }
        style={{height: isNullOrEmpty(this.props.height) ? "400px" : `${this.props.height}px`}}
        >
        <TileLayer
          attribution={`<a href="https://spfx-app.dev/">SPFx-App.dev</a> | ${this.props.tileLayerAttribution}`}
          url={this.props.tileLayerUrl}
        />


        {this.props.plugins.markercluster &&
          <MarkerClusterGroup>
            {this.renderMarker()}
          </MarkerClusterGroup>
        }

        {!this.props.plugins.markercluster &&
            this.renderMarker()
        }

        {this.renderLegend(isZoomControlEnabled)}
      </MapContainer>


        {this.props.isEditMode &&
          <ContextualMenu
            items={this.menuItems}
            hidden={typeof this.state.rightMouseTarget === "undefined"}
            target={this.state.rightMouseTarget}
            onItemClick={() => {

            }}
            onDismiss={() => {
              this.setState({
                rightMouseTarget: undefined
              });
            }}
          />
        }
        {this.showAddOrEditMarkerPanel()}
        {this.showClickContent()}
      </div>
    );
  }

  private renderMarker(): JSX.Element {
    return (
      <>
      {this.state.markerItems.map((marker: IMarker, index: number): JSX.Element => {
      const useCategory: boolean = isset(this.allCatagories[marker.categoryId]);
      const markerCategory: IMarkerCategory | undefined = useCategory ? this.allCatagories[marker.categoryId] : undefined;
      const popupText: string | undefined = !useCategory ? marker.popuptext : isNullOrEmpty(markerCategory!.popuptext) ? markerCategory!.name : markerCategory!.popuptext;
      const isDraggable: boolean = marker.id.Equals(this.state.changePositionMarkerId);

      return (
        <Marker 
          draggable={isDraggable}  
          position={[marker.latitude, marker.longitude]} 
          key={`marker_${marker.id}`} 
          icon={this.createIcon(marker, markerCategory)}
          ref={(ref: L.Marker) => {

            if(!isset(ref)) {
              return;
            }

            this.allLeafletMarker[marker.id] = ref;

            if(this.state.changePositionMarkerId.Equals(marker.id)) {
              setTimeout(() => {
                ref.openPopup();
              }, 300);
            }

          }}
          eventHandlers={
          {
           
            click: (ev: L.LeafletMouseEvent) => {

                if(this.state.changePositionMarkerId.length >= 32) {
                  return;
                }

                const showEditPanel: boolean = this.props.isEditMode;

                this.setState({
                  currentMarker: marker,
                  showClickContent: !showEditPanel,
                  showAddOrEditMarkerPanel: showEditPanel
                });
            },
            mouseover: (ev: L.LeafletMouseEvent) => {

              if(!this.props.showPopUp) {
                return;
              }

              if(this.state.changePositionMarkerId.length >= 32) {
                  return;
              }

              (ev.target as L.Marker).openPopup();
            },
            mouseout: (ev: L.LeafletMouseEvent) => {

              if(!this.props.showPopUp) {
                return;
              }

              if(this.state.changePositionMarkerId.length >= 32) {
                return;
              }

              (ev.target as L.Marker).closePopup();
            },
            dragend: (ev: L.DragEndEvent) => {
              const currentMarker = (ev.target as L.Marker);

              setTimeout(() => {
                if(isset(marker)) {
                  currentMarker.openPopup();
                }
              }, 300);
            }
          }
        } 
        >
          {this.props.showPopUp && this.state.changePositionMarkerId !== marker.id && !isNullOrEmpty(popupText) &&
            <Popup>
              {popupText}
            </Popup>
          }

          {this.state.changePositionMarkerId === marker.id &&
            <Popup>
              <div className="change-position-popup">
              <Label>{strings.LabelChangePosition}</Label>
              <Separator />
              <PrimaryButton
                text={strings.SaveLabel}
                onClick={() => {

                  const currentMarker = this.allLeafletMarker[marker.id];
                  const latLng: L.LatLng = currentMarker.getLatLng();

                  const markerItems = this.state.markerItems;
                  markerItems[index].latitude = latLng.lat;
                  markerItems[index].longitude = latLng.lng;

                  currentMarker.dragging!.disable();

                  this.setState({
                    changePositionMarkerId: "-1",
                    showAddOrEditMarkerPanel: true,
                    markerItems
                  });

                  if(isFunction(this.props.onMarkerCollectionChanged)) {
                    this.props.onMarkerCollectionChanged(this.state.markerItems); 
                  }

                }}
              />
              <DefaultButton
                text={strings.CancelLabel} 
                onClick={() => {

                  const currentMarker = this.allLeafletMarker[marker.id];
                  currentMarker.setLatLng([marker.latitude, marker.longitude]);

                  currentMarker.dragging!.disable();

                  this.setState({
                    changePositionMarkerId: "-1",
                    showAddOrEditMarkerPanel: true
                  });
                }}
              />
              </div>
            </Popup>
          }
        </Marker>
      );
    })}
    </>
    );
  }

  private renderLegend(isZoomControlEnabled: boolean): JSX.Element {
    if(!getDeepOrDefault<boolean>(this.props, "plugins.legend", false) || isNullOrEmpty(this.state.markerCategories)) {
      return (<></>);
    }

    return (
      <LegendPlugin isZoomControlVisible={isZoomControlEnabled} markerCategories={this.state.markerCategories} />
    );
  }

  private fitMapToMarkers(map: L.Map): void {
    const points = this.state.markerItems
      .filter(m => !isNaN(m.latitude) && !isNaN(m.longitude))
      .map(m => [m.latitude, m.longitude] as [number, number]);

    if (points.length === 0) {
      return;
    }

    // maxZoom caps how far in a single marker (a zero-size bounds) zooms.
    map.fitBounds(L.latLngBounds(points), { maxZoom: 16, padding: [30, 30] });
  }

  private onSearchLocationSelected(lat: number, lon: number, boundingBox?: [number, number, number, number]): void {
    if (!this.map) {
      return;
    }

    // Frame the map to the place's bounding box — a city frames the whole city, a
    // precise address zooms to the street — instead of a fixed deep zoom that dropped
    // the pin on a random point inside the city. Capped so addresses don't over-zoom.
    if (boundingBox) {
      this.map.fitBounds(
        [[boundingBox[0], boundingBox[2]], [boundingBox[1], boundingBox[3]]],
        { maxZoom: 16, padding: [20, 20] }
      );
    } else {
      this.map.setView([lat, lon], Math.min(13, this.props.maxZoom ?? 13));
    }

    const defaultRadius = 12;
    const circleOptions = {
        inner: {
            color: '#136AEC',
            fillColor: '#2A93EE',
            fillOpacity: 1,
            weight: 1.5,
            opacity: 0.7,
            radius: defaultRadius / 4
        },
        outer: {
            color: "#136AEC",
            fillColor: "#136AEC",
            fillOpacity: 0.15,
            opacity: 0.3,
            weight: 1,
            radius: defaultRadius
        }
    };

    L.circle([lat, lon], circleOptions.outer).addTo(this.map);
    L.circle([lat, lon], circleOptions.inner).addTo(this.map);
  }

  private showClickContent(): JSX.Element {
    if(!this.state.showClickContent || isNullOrEmpty(this.state.currentMarker)) {
      return (<></>);
    }

    if(this.state.currentMarker!.type === "None") {
      return (<></>);
    }

    if(this.state.currentMarker!.type === "Url" && this.state.currentMarker!.markerClickProps!.url.target !== "embedded") {
      window.open(this.state.currentMarker!.markerClickProps!.url.href, this.state.currentMarker!.markerClickProps!.url.target);
      return (<></>);
    }

    if (this.state.currentMarker!.type === "Panel") {
      return (<Panel
        type={PanelType.medium}
        isOpen={true}
        onDismiss={() => { this.onContentPanelOrDialogDismiss(); }}
        headerText={this.state.currentMarker!.markerClickProps!.content.headerText}
        closeButtonAriaLabel="Close"
        onRenderFooterContent={(props?: IPanelProps) => {
          return (<div>
            <DefaultButton onClick={() => { this.onContentPanelOrDialogDismiss(); }}>Close</DefaultButton>
          </div>);
        }}
        // Stretch panel content to fill the available height so the footer is positioned
        // at the bottom of the page
        isFooterAtBottom={true}
      >
        <RichText isEditMode={false} value={this.state.currentMarker!.markerClickProps!.content.html} />

      </Panel>);
    }

    const width: number = window.innerWidth - 100;
    const height: number = window.innerHeight - 300;
    let dialogWidth = 900;
    
    if(width < dialogWidth || this.state.currentMarker!.type === "Url") {
      dialogWidth = width; 
    }

    return (
      <Dialog 
            hidden={false}
            onDismiss={() => { this.onContentPanelOrDialogDismiss(); }}
            dialogContentProps={{
                title: this.state.currentMarker!.markerClickProps!.content.headerText,
                type: DialogType.close
            }}
            minWidth={dialogWidth}
            modalProps={{
                isBlocking: true,
                className: "iframe-dialog",
            }}
        >
          <DialogContent>
              {this.state.currentMarker!.type === "Dialog" && <RichText isEditMode={false} value={this.state.currentMarker!.markerClickProps!.content.html} />}
              {this.state.currentMarker!.type === "Url" && 
                <div style={{height: `${height}px`}}>
                  <iframe src={this.state.currentMarker!.markerClickProps!.url.href} />
                </div>
              }
          </DialogContent>
        </Dialog>
    );

  }

  private showAddOrEditMarkerPanel(): JSX.Element {

    if(!this.state.showAddOrEditMarkerPanel || !this.props.isEditMode) {
      return (<></>);
    }

    return (
      <AddOrEditPanel 
        markerCategories={this.state.markerCategories} 
        markerItem={this.state.currentMarker!}
        onDismiss={() => { this.onConfigPanelDismiss(); }}
        onDeleteMarker={(markerItem: IMarker) => {

          const markerIndex: number = this.state.markerItems.IndexOf(m => m.id === markerItem.id);

          this.state.markerItems.RemoveAt(markerIndex);

          if(isFunction(this.props.onMarkerCollectionChanged)) {
            this.props.onMarkerCollectionChanged(this.state.markerItems);
          }

          this.setState({ rightMouseTarget: undefined });
          this.onConfigPanelDismiss();


        }}
        onChangePositionClick={(markerItem: IMarker) => {

          this.setState({
            changePositionMarkerId: markerItem.id,
            showAddOrEditMarkerPanel: false
          });


          
        }}
        onMarkerCategoriesChanged={(markerCategories: IMarkerCategory[]) => {

          if(isFunction(this.props.onMarkerCategoriesChanged)) {
            this.props.onMarkerCategoriesChanged(markerCategories);
          }

          this.setAllCatagoriesDictionary(markerCategories);

          this.setState({
            markerCategories: markerCategories
          });
        }}
        onMarkerChanged={(markerItem: IMarker, isNewMarker: boolean) => {

          const markerItems = this.state.markerItems;

          if(isNewMarker) {
            markerItems.push(markerItem);
          }
          else {
            const markerIndex: number = markerItems.IndexOf(m => m.id === markerItem.id);

            if(markerIndex >= 0) {
              markerItems[markerIndex] = markerItem;
            }
          }

          this.setState({ markerItems, rightMouseTarget: undefined });

          if(isFunction(this.props.onMarkerCollectionChanged)) {
            this.props.onMarkerCollectionChanged(this.state.markerItems);
          }

          this.onConfigPanelDismiss();
        }}
      />
    );
  }

  private onConfigPanelDismiss(): void {
    this.setState({
      showAddOrEditMarkerPanel: false,
      currentMarker: undefined
    });
  }

  private onContentPanelOrDialogDismiss(): void {
    this.setState({
      showClickContent: false,
      currentMarker: undefined
    });
  }

  private createIcon(marker: IMarker, markerCategory: IMarkerCategory | undefined): L.Icon {
    const markerIcon = new L.Icon({
      iconAnchor: [13, 36],
      popupAnchor: [0, -36],
      shadowUrl: undefined,
      shadowSize: undefined,
      shadowAnchor: undefined,
      iconSize: new L.Point(27, 36),
      className: cssClasses('leaflet-div-icon', `marker-type-${marker.type.toLowerCase()}`)
    });

    markerIcon.createIcon = (oldIcon: HTMLElement) => {
      if(isset(oldIcon)) {
        ReactDom.unmountComponentAtNode(oldIcon);
      }

      const wrapper = document.createElement("div");
      wrapper.classList.add("leaflet-marker-icon");
      wrapper.classList.add(`marker-type-${marker.type.toLowerCase()}`);

      wrapper.dataset.markerid = marker.id;

      wrapper.style.marginLeft = ((markerIcon.options.iconAnchor! as [number, number])[0] * -1) + "px";
      wrapper.style.marginTop = ((markerIcon.options.iconAnchor! as [number, number])[1] * -1) + "px";
      const iconProperties: IMarkerIcon = (isNullOrEmpty(markerCategory) ? marker.iconProperties : markerCategory!.iconProperties)!;
      ReactDom.render(<MarkerIcon {...iconProperties} />, wrapper);
    
      return wrapper;
    };

    return markerIcon as unknown as L.Icon;
  }

  private onCreateNewMarkerContextMenuItemClick(): void {
    const currentMarker = cloneDeep(emptyMarkerItem);
    currentMarker.latitude = this.lastLatLngRightClickPosition.lat;
    currentMarker.longitude = this.lastLatLngRightClickPosition.lng;

    this.setState({
      currentMarker,
      showAddOrEditMarkerPanel: true
    });
  }

  private onSetStartView(): void {

    if(isFunction(this.props.onStartViewSet)) {
      const zoom: number = this.map!.getZoom();
      const latLng: L.LatLng = this.map!.getCenter();
      this.props.onStartViewSet(zoom, latLng.lat, latLng.lng);
    }
  }

  private setAllCatagoriesDictionary(markerCategories: IMarkerCategory[] = this.state.markerCategories): void {
    this.allCatagories = {};
    markerCategories.forEach((category: IMarkerCategory) => {
      this.allCatagories[category.id] = category;
    });
  }
}