import * as React from 'react';
import * as ReactDom from 'react-dom';
import styles from './Map.module.scss';
import { IMapProps, IMarker, IMarkerCategory, IMarkerIcon, emptyMarkerItem } from './IMapProps';
import { cloneDeep } from '@microsoft/sp-lodash-subset';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/dist/styles.min.css";
import * as L from 'leaflet';
import { ContextualMenu, IContextualMenuItem, Panel, Dialog, IPanelProps, DefaultButton, PanelType, DialogType, DialogContent, Label, Separator, PrimaryButton } from 'office-ui-fabric-react';
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
import SearchPlugin from './plugins/search/SearchPlugin';
import LegendPlugin from './plugins/legend/LegendPlugin';

interface IMapState {
  markerItems: IMarker[];
  markerCategories: IMarkerCategory[];
  rightMouseTarget?: any;
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

  private map: L.Map = null;

  private allLeafletMarker: Record<string, L.Marker> = {};

  private lastLatLngRightClickPosition: L.LatLng;


  constructor(props: IMapProps) {
    super(props);
    this.setAllCatagoriesDictionary();
  }

  public componentDidUpdate(prevProps: Readonly<IMapProps>, prevState: Readonly<IMapState>, snapshot?: any): void {

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
                title={this.props.title}
                updateProperty={this.props.onTitleUpdate} />
        }      
        
      <MapContainer
        className={this.props.isEditMode ? "edit-mode" : "display-mode"}
        zoomControl={isZoomControlEnabled} 
        center={this.props.center} 
        zoom={this.props.zoom} 
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

              this.lastLatLngRightClickPosition = (ev as any).latlng;

              this.setState({
                rightMouseTarget: {
                  x: ((ev as any).originalEvent as MouseEvent).clientX, 
                  y: ((ev as any).originalEvent as MouseEvent).clientY 
                }
              });

            });

            this.map = map;
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
        
        {this.renderSearchBox()}
        {this.renderLegend(isZoomControlEnabled)}
      </MapContainer>
      
      

        {this.props.isEditMode &&
          <ContextualMenu
            items={this.menuItems}
            hidden={typeof this.state.rightMouseTarget == "undefined"}
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
      const markerCategory: IMarkerCategory = useCategory ? this.allCatagories[marker.categoryId] : null;
      const popupText: string = !useCategory ? marker.popuptext : isNullOrEmpty(markerCategory.popuptext) ? markerCategory.name : markerCategory.popuptext;
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

                let showEditPanel: boolean = this.props.isEditMode;

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

              (ev.target as any).openPopup();                  
            },
            mouseout: (ev: L.LeafletMouseEvent) => {

              if(!this.props.showPopUp) {
                return;
              }

              if(this.state.changePositionMarkerId.length >= 32) {
                return;
              }

              (ev.target as any).closePopup();                  
            },
            dragend: (ev: L.DragEndEvent) => {
              const currentMarker = (ev.target as any);

              setTimeout(() => {
                if(isset(marker)) {
                  currentMarker.openPopup();
                }
              }, 300);
            }
          }
        } 
        >
          {this.props.showPopUp && this.state.changePositionMarkerId != marker.id && !isNullOrEmpty(popupText) &&
            <Popup>
              {popupText}
            </Popup>
          }

          {this.state.changePositionMarkerId == marker.id &&
            <Popup>
              <div className="change-position-popup">
              <Label>{strings.LabelChangePosition}</Label>
              <Separator />
              <PrimaryButton
                text={strings.SaveLabel}
                onClick={() => {

                  const currentMarker = this.allLeafletMarker[marker.id];
                  const latLng: L.LatLng = currentMarker.getLatLng();

                  this.state.markerItems[index].latitude = latLng.lat;
                  this.state.markerItems[index].longitude = latLng.lng;

                  currentMarker.dragging.disable();

                  this.setState({
                    changePositionMarkerId: "-1",
                    showAddOrEditMarkerPanel: true,
                    markerItems: this.state.markerItems
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

                  currentMarker.dragging.disable();

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

  private renderSearchBox(): JSX.Element {

    if(!this.props.plugins.searchBox) {
      return (<></>);
    }

    return (
      <SearchPlugin onLocationSelected={(lat: number, lon: number) => {
        this.map.setView([lat, lon], this.props.maxZoom > 18 ? 18 : this.props.maxZoom);

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
      }} />
    );
  }

  private showClickContent(): JSX.Element {
    if(!this.state.showClickContent || isNullOrEmpty(this.state.currentMarker)) {
      return (<></>);
    }

    if(this.state.currentMarker.type == "None") {
      return (<></>);
    }

    if(this.state.currentMarker.type == "Url" && this.state.currentMarker.markerClickProps.url.target != "embedded") {
      window.open(this.state.currentMarker.markerClickProps.url.href, this.state.currentMarker.markerClickProps.url.target);
      return (<></>);
    }

    if (this.state.currentMarker.type == "Panel") {
      return (<Panel
        type={PanelType.medium}
        isOpen={true}
        onDismiss={() => { this.onContentPanelOrDialogDismiss(); }}
        headerText={this.state.currentMarker.markerClickProps.content.headerText}
        closeButtonAriaLabel="Close"
        onRenderFooterContent={(props: IPanelProps) => {
          return (<div>
            <DefaultButton onClick={() => { this.onContentPanelOrDialogDismiss(); }}>Close</DefaultButton>
          </div>);
        }}
        // Stretch panel content to fill the available height so the footer is positioned
        // at the bottom of the page
        isFooterAtBottom={true}
      >
        <RichText isEditMode={false} value={this.state.currentMarker.markerClickProps.content.html} />

      </Panel>);
    }

    const width: number = window.innerWidth - 100;
    const height: number = window.innerHeight - 300;
    let dialogWidth = 900;
    
    if(width < dialogWidth || this.state.currentMarker.type == "Url") {
      dialogWidth = width; 
    }

    return (
      <Dialog 
            hidden={false}
            onDismiss={() => { this.onContentPanelOrDialogDismiss(); }}
            dialogContentProps={{
                title: this.state.currentMarker.markerClickProps.content.headerText,
                type: DialogType.close
            }}
            minWidth={dialogWidth}
            modalProps={{
                isBlocking: true,
                className: "iframe-dialog",
            }}
        >
          <DialogContent>
              {this.state.currentMarker.type == "Dialog" && <RichText isEditMode={false} value={this.state.currentMarker.markerClickProps.content.html} />}
              {this.state.currentMarker.type == "Url" && 
                <div style={{height: `${height}px`}}>
                  <iframe src={this.state.currentMarker.markerClickProps.url.href}></iframe>
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
        markerItem={this.state.currentMarker} 
        onDismiss={() => { this.onConfigPanelDismiss(); }}
        onDeleteMarker={(markerItem: IMarker) => {

          const markerIndex: number = this.state.markerItems.IndexOf(m => m.id == markerItem.id);


          this.state.markerItems.RemoveAt(markerIndex);
          
          if(isFunction(this.props.onMarkerCollectionChanged)) {
            this.props.onMarkerCollectionChanged(this.state.markerItems); 
          }

          this.state.rightMouseTarget = undefined;
          this.onConfigPanelDismiss();

          
        }}
        onChangePositionClick={(markerItem: IMarker) => {

          this.setState({
            changePositionMarkerId: markerItem.id,
            showAddOrEditMarkerPanel: false
          });


          
        }}
        onMarkerCategoriesChanged={(markerCategories: IMarkerCategory[]) => {
          this.state.markerCategories = markerCategories;

          if(isFunction(this.props.onMarkerCategoriesChanged)) {
            this.props.onMarkerCategoriesChanged(markerCategories); 
          }

          this.setAllCatagoriesDictionary();

          this.setState({
            markerCategories: markerCategories
          });
        }}
        onMarkerChanged={(markerItem: IMarker, isNewMarker: boolean) => {

          if(isNewMarker) {
            this.state.markerItems.push(markerItem);
          }
          else {
            const markerIndex: number = this.state.markerItems.IndexOf(m => m.id == markerItem.id);

            if(markerIndex >= 0) {
              this.state.markerItems[markerIndex] = markerItem;
            }
          }

          this.state.rightMouseTarget = undefined;

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
      currentMarker: null
    });
  }

  private onContentPanelOrDialogDismiss(): void {
    this.setState({
      showClickContent: false,
      currentMarker: null
    });
  }

  private createIcon(marker: IMarker, markerCategory: IMarkerCategory ): L.Icon {
    const markerIcon = new L.Icon({
      iconAnchor: [13, 36],
      popupAnchor: [0, -36],
      shadowUrl: null,
      shadowSize: null,
      shadowAnchor: null,
      iconSize: new L.Point(27, 36),
      className: cssClasses('leaflet-div-icon', `marker-type-${marker.type.toLowerCase()}`)
    });
    
    markerIcon.createIcon = (oldIcon: HTMLElement) => {
      const wrapper = document.createElement("div");    
      wrapper.classList.add("leaflet-marker-icon");
      wrapper.classList.add(`marker-type-${marker.type.toLowerCase()}`);

      wrapper.dataset.markerid = marker.id;
    
      wrapper.style.marginLeft = (markerIcon.options.iconAnchor[0] * -1) + "px";
      wrapper.style.marginTop = (markerIcon.options.iconAnchor[1] * -1) + "px";
      const iconProperties: IMarkerIcon = isNullOrEmpty(markerCategory) ? marker.iconProperties : markerCategory.iconProperties;
      ReactDom.render(<MarkerIcon {...iconProperties} />, wrapper);
    
      return wrapper;
    };

    return markerIcon as any as L.Icon;
  }

  private onCreateNewMarkerContextMenuItemClick(): void {
    this.state.currentMarker = cloneDeep(emptyMarkerItem);
    this.state.currentMarker.latitude = this.lastLatLngRightClickPosition.lat;
    this.state.currentMarker.longitude = this.lastLatLngRightClickPosition.lng;
    this.state.showAddOrEditMarkerPanel = true;

    this.setState({...this.state});
  }

  private onSetStartView(): void {

    if(isFunction(this.props.onStartViewSet)) {
      const zoom: number = this.map.getZoom();
      const latLng: L.LatLng = this.map.getCenter();
      this.props.onStartViewSet(zoom, latLng.lat, latLng.lng);
    }
  }

  private setAllCatagoriesDictionary(): void {
    this.allCatagories = {};
    this.state.markerCategories.forEach((category: IMarkerCategory) => {
      this.allCatagories[category.id] = category;
    });
  }
}