import * as React from 'react';
import * as ReactDom from 'react-dom';
import styles from './Map.module.scss';
import { IMapProps, IMarker, IMarkerCategory, IMarkerIcon, MarkerType, IMarkerClickProps, IMarkerUrlProperties, IMarkerContentProperties, emptyMarkerItem } from './IMapProps';
import { clone } from '@microsoft/sp-lodash-subset';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import * as L from 'leaflet';
import { Icon, ContextualMenu, ContextualMenuItemType, IContextualMenuItem, Panel, Dialog, IPanelProps, PrimaryButton, DefaultButton, IChoiceGroupOption, ChoiceGroup, IDropdownOption, Dropdown, getColorFromString, IColor, PanelType, DialogType, DialogContent, Label } from 'office-ui-fabric-react';
import { randomString, isset, isNullOrEmpty, getDeepOrDefault, cssClasses } from '@spfxappdev/utility';
import '@spfxappdev/utility/lib/extensions/StringExtensions';
import '@spfxappdev/utility/lib/extensions/ArrayExtensions';
import { DisplayMode, Guid } from '@microsoft/sp-core-library';
import { InlineColorPicker, IInlineColorPickerProps } from '@src/components/inlineColorPicker/InlineColorPicker'
import { TextField } from '@microsoft/office-ui-fabric-react-bundle';
import { RichText } from "@pnp/spfx-controls-react/lib/RichText";
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import AddOrEditPanel from './AddOrEditPanel';
import { isFunction } from 'lodash';
import { MarkerIcon } from './MarkerIcon';

interface IMapState {
  markerItems: IMarker[];
  markerCategories: IMarkerCategory[];
  rightMouseTarget?: any;
  showAddOrEditMarkerPanel: boolean;
  currentMarker?: IMarker;
  showClickContent: boolean;
}

export default class Map extends React.Component<IMapProps, IMapState> {

  public state: IMapState = {
    markerItems: clone(this.props.markerItems),
    markerCategories: clone(this.props.markerCategories),
    showAddOrEditMarkerPanel: false,
    showClickContent: false
  };

  private allCatagories: Record<string, IMarkerCategory> = {};

  private menuItems: IContextualMenuItem[] = [
    {
      key: 'newItem',
      text: 'Add a new marker',
      onClick: () => {
        this.onCreateNewMarkerContextMenuItemClick();
      }
    },
    {
      key: 'setStartView',
      text: 'Make this view as start position',
      onClick: () => {
        this.onSetStartView();
      }
    }
  ];

  private map: L.Map = null;

  private lastLatLngRightClickPosition: L.LatLng;


  constructor(props: IMapProps) {
    super(props);
    this.setAllCatagoriesDictionary();
  }

  componentDidUpdate(prevProps: Readonly<IMapProps>, prevState: Readonly<IMapState>, snapshot?: any): void {

    if(!JSON.stringify(prevProps.markerCategories).Equals(JSON.stringify(this.props.markerCategories))) {
      this.setState({
        markerCategories: this.props.markerCategories
      }, () => {
        this.setAllCatagoriesDictionary();
      })
    }

  }

  public render(): React.ReactElement<IMapProps> {
   
    //
    return (
      <div className={styles.map}>
        <WebPartTitle displayMode={this.props.isEditMode?DisplayMode.Edit:DisplayMode.Read}
              title={this.props.title}
              updateProperty={this.props.onTitleUpdate} />
        
      <MapContainer
        zoomControl={getDeepOrDefault<boolean>(this.props, "plugins.zoomControl", true)} 
        center={this.props.center} 
        zoom={this.props.zoom} 
        maxZoom={this.props.maxZoom} 
        whenCreated={(map: L.Map) => {
            map.on("contextmenu", (ev: L.LeafletEvent) => {

              this.lastLatLngRightClickPosition = (ev as any).latlng;

              this.setState({
                rightMouseTarget: {x: ((ev as any).originalEvent as MouseEvent).clientX, y: ((ev as any).originalEvent as MouseEvent).clientY }
              });

            });
            this.map = map;
          }
        }  
        style={{height: "400px"}}
        >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />


        {this.renderMarker()}
      </MapContainer>
      
      {this.renderLegend()}

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

      return (
        <Marker position={[marker.latitude, marker.longitude]} key={`marker_${index}`} icon={this.createIcon(marker, markerCategory)} eventHandlers={
          {
           
            click: (ev: L.LeafletMouseEvent) => {

                let showEditPanel: boolean = this.props.isEditMode;

                this.setState({
                  currentMarker: marker,
                  showClickContent: !showEditPanel,
                  showAddOrEditMarkerPanel: showEditPanel
                });
            },
            mouseover: (ev: L.LeafletMouseEvent) => {
              (ev.target as any).openPopup();                  
            },
            mouseout: (ev: L.LeafletMouseEvent) => {
              (ev.target as any).closePopup();                  
            },
          }
        } 
        >
          {!isNullOrEmpty(popupText) &&
            <Popup>
              {popupText}
            </Popup>
          }
        </Marker>
      );
    })}
    </>
    );
  }

  private renderLegend(): JSX.Element {
    if(!getDeepOrDefault<boolean>(this.props, "plugins.legend", false) || isNullOrEmpty(this.state.markerCategories)) {
      return (<></>);
    }

    return (
    <div className='map-legend'>
        {this.state.markerCategories.map((cat: IMarkerCategory): JSX.Element => {
          return (
          <div key={`legend_${cat.id}`}>
              <div style={{position: "relative", height: "36px", float: "left" }}>
                <div style={{position: "absolute"}}>
                    <MarkerIcon {...cat.iconProperties} /> 
                </div>
                
              </div>
              <Label style={{margin: "0 36px 0 10px"}}>{cat.name}</Label>
          </div>)
        })}
    </div>);
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
        onDismiss={() => { this.onContentPanelOrDialogDismiss() }}
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

    if(!this.state.showAddOrEditMarkerPanel) {
      return (<></>);
    }

    return (
      <AddOrEditPanel 
        markerCategories={this.state.markerCategories} 
        markerItem={this.state.currentMarker} 
        onDismiss={() => { this.onConfigPanelDismiss(); }}
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

            if(markerIndex>=0) {
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
      className: 'leaflet-div-icon'
    });
    
    markerIcon.createIcon = (oldIcon: HTMLElement) => {
      const wrapper = document.createElement("div");    
      wrapper.classList.add("leaflet-marker-icon");
    
      wrapper.style.marginLeft = (markerIcon.options.iconAnchor[0] * -1) + "px";
      wrapper.style.marginTop = (markerIcon.options.iconAnchor[1] * -1) + "px";

      const iconProperties: IMarkerIcon = isNullOrEmpty(markerCategory) ? marker.iconProperties : markerCategory.iconProperties;

      // wrapper.innerHTML = `<span>
      //   <svg height="36px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="${iconProperties.markerColor}">
      //     <!-- Font Awesome Free 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) -->
      //     <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0z"/>
      //   </svg>
      //   <span class="map-icon" style="color: ${iconProperties.iconColor}"></span>
      //   </span>`;
    
      //   ReactDom.render(<Icon iconName={iconProperties.iconName} /> , wrapper.querySelector(".map-icon"));

      ReactDom.render(<MarkerIcon {...iconProperties} />, wrapper);
    
      return wrapper;
    };

    return markerIcon as any as L.Icon;
  }

  private onCreateNewMarkerContextMenuItemClick(): void {
    this.state.currentMarker = clone(emptyMarkerItem);
    this.state.currentMarker.latitude = this.lastLatLngRightClickPosition.lat;
    this.state.currentMarker.longitude = this.lastLatLngRightClickPosition.lng;
    this.state.showAddOrEditMarkerPanel = true;

    this.setState({...this.state})
  }

  private onSetStartView(): void {
    console.log("SSC", this.map.getZoom(), this.map.getCenter())

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
