import * as React from 'react';
import * as ReactDom from 'react-dom';
import styles from './Map.module.scss';
import { IMapProps, IMarker, IMarkerCategory, IMarkerIcon, MarkerType, MarkerTypeDialog, MarkerTypePanel, MarkerTypeUrl } from './IMapProps';
import { clone } from '@microsoft/sp-lodash-subset';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import * as L from 'leaflet';
import { Icon, ContextualMenu, ContextualMenuItemType, IContextualMenuItem, Panel, Dialog, IPanelProps, PrimaryButton, DefaultButton, IChoiceGroupOption, ChoiceGroup, IDropdownOption, Dropdown, getColorFromString, IColor, PanelType } from 'office-ui-fabric-react';
import { randomString, isset, isNullOrEmpty, getDeepOrDefault } from '@spfxappdev/utility';
import '@spfxappdev/utility/lib/extensions/StringExtensions';
import '@spfxappdev/utility/lib/extensions/ArrayExtensions';
import { Guid } from '@microsoft/sp-core-library';
import { InlineColorPicker, IInlineColorPickerProps } from '@src/components/inlineColorPicker/InlineColorPicker'
import { TextField } from '@microsoft/office-ui-fabric-react-bundle';

interface IMapState {
  markerItems: IMarker[];
  rightMouseTarget?: any;
  showAddOrEditMarkerPanel: boolean;
  currentMarker?: IMarker;
  showClickContent: boolean;
}

export default class Map extends React.Component<IMapProps, IMapState> {

  public state: IMapState = {
    markerItems: clone(this.props.markerItems),
    showAddOrEditMarkerPanel: false,
    showClickContent: false
  };

  private allCatagories: Record<string, IMarkerCategory> = {};

  private menuItems: IContextualMenuItem[] = [
    {
      key: 'newItem',
      text: 'New',
      onClick: () => {
        this.onCreateNewMarkerContextMenuItemClick();
      }
    }
  ];

  private map: L.Map = null;

  private lastLatLngRightClickPosition: L.LatLng;


  constructor(props: IMapProps) {
    super(props);

    props.markerCategories.forEach((category: IMarkerCategory) => {
      this.allCatagories[category.id] = category;
    });
  }

  public render(): React.ReactElement<IMapProps> {
   

    return (
      <div className={styles.map} onContextMenu={(ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        
      }}>
      <MapContainer center={[49.318121, 10.624094]} zoom={13} maxZoom={500} whenCreated={(map: L.Map) => {
        map.on("contextmenu", (ev: L.LeafletEvent) => {

          this.lastLatLngRightClickPosition = (ev as any).latlng;

          this.setState({
            rightMouseTarget: {x: ((ev as any).originalEvent as MouseEvent).clientX, y: ((ev as any).originalEvent as MouseEvent).clientY }
          });

        });
        this.map = map;

      }}  style={{
height: "400px"
}}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

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
      </MapContainer>
      </div>
    );
  }

  private showClickContent(): JSX.Element {
    if(!this.state.showClickContent || isNullOrEmpty(this.state.currentMarker)) {
      return (<></>);
    }

    if(this.state.currentMarker.type == "Panel") {
      return (<Panel
        type={PanelType.medium}
        isOpen={true}
        onDismiss={() => { this.onContentPanelDismiss() }}
        headerText={(this.state.currentMarker.markerClickProps as MarkerTypePanel).headerText}
        closeButtonAriaLabel="Close"
        onRenderFooterContent={(props: IPanelProps) => {
          return (<div>
            <DefaultButton onClick={() => { this.onContentPanelDismiss(); }}>Close</DefaultButton>
          </div>);
        }}
        // Stretch panel content to fill the available height so the footer is positioned
        // at the bottom of the page
        isFooterAtBottom={true}
      >
        {(this.state.currentMarker.markerClickProps as MarkerTypePanel).headerText}

      </Panel>);
    }
  }

  private showAddOrEditMarkerPanel(): JSX.Element {

    if(!this.state.showAddOrEditMarkerPanel) {
      return (<></>);
    }

    const headerText: string = !this.state.currentMarker.id.Equals(Guid.empty.toString()) ? "Bearbeiten" : "Neu";

    const markerTypeOptions: IChoiceGroupOption[] = [
      { key: 'Panel', text: 'Panel', iconProps: { iconName: 'SidePanel' } },
      { key: 'Dialog', text: 'Dialog', iconProps: { iconName: 'Favicon' } },
      { key: 'Url', text: 'Url', iconProps: { iconName: 'Link' } },
      { key: 'None', text: 'None (not clickable)', iconProps: { iconName: 'FieldEmpty' } },
    ];

    const categoryOptions: IDropdownOption[] = [
      { key: Guid.empty.toString(), text: 'None' }
    ];

    this.props.markerCategories.forEach((category: IMarkerCategory) => {
      categoryOptions.push({ key: category.id, text: category.name });
    });

    return (
      <Panel
        type={PanelType.medium}
        isOpen={this.state.showAddOrEditMarkerPanel}
        onDismiss={() => { this.onConfigPanelDismiss() }}
        headerText={headerText}
        closeButtonAriaLabel="Close"
        onRenderFooterContent={(props: IPanelProps) => {
          return (<div>
            <PrimaryButton onClick={() => {
              this.state.currentMarker.id = Guid.newGuid().toString();
              // this.onCreateNewMarkerClick(clone(this.state.currentMarker));
              this.onCreateNewMarkerClick(this.state.currentMarker);
              // this.state.currentMarker = null;
              this.onConfigPanelDismiss();
            }}>
              Save
            </PrimaryButton>
            <DefaultButton onClick={() => { this.onConfigPanelDismiss(); }}>Cancel</DefaultButton>
          </div>);
        }}
        // Stretch panel content to fill the available height so the footer is positioned
        // at the bottom of the page
        isFooterAtBottom={true}
      >
        <Dropdown
          placeholder="Select a category"
          label="Category"
          defaultSelectedKey={this.state.currentMarker.categoryId}
          onChange={(ev: any, option: IDropdownOption) => {
            this.state.currentMarker.categoryId = option.key.toString();
            this.setState({
              currentMarker: this.state.currentMarker
            });

          }}
          options={categoryOptions}
        />
        <ChoiceGroup 
          label="Type of marker (on click)" 
          defaultSelectedKey={this.state.currentMarker.type} 
          onChange={(ev: any, option: IChoiceGroupOption) => {
            this.state.currentMarker.type = option.key.toString() as MarkerType;

            if( this.state.currentMarker.type == "Dialog") {
              this.state.currentMarker.markerClickProps = {
                headerText: "",
                content: "",
                url: ""
              };
            }

            if( this.state.currentMarker.type == "Panel") {
              this.state.currentMarker.markerClickProps = {
                headerText: "",
                content: ""
              };
            }

            if( this.state.currentMarker.type == "None") {
              this.state.currentMarker.markerClickProps = undefined;
            }

            if( this.state.currentMarker.type == "Url") {
              this.state.currentMarker.markerClickProps = { url: ""};
            }



            this.setState({
              currentMarker: this.state.currentMarker
            });
          }}
          options={markerTypeOptions} />

          {this.state.currentMarker.categoryId == Guid.empty.toString() &&
          <>
            <InlineColorPicker 
              label='Marker Color' 
              alphaType='none'
              color={getColorFromString(this.state.currentMarker.iconProperties.markerColor)} 
              onChange={(ev: any, color: IColor) => {
                this.state.currentMarker.iconProperties.markerColor = "#" + color.hex;
                this.setState({
                  currentMarker: this.state.currentMarker
                });
              }} 
            />

            <TextField label='Icon' description='leaf blank for none' defaultValue={this.state.currentMarker.iconProperties.iconName} onChange={(ev: any, iconName: string) => {
                this.state.currentMarker.iconProperties.iconName = iconName;
                this.setState({
                  currentMarker: this.state.currentMarker
                });
            }} />

            {!isNullOrEmpty(this.state.currentMarker.iconProperties.iconName) &&
            <InlineColorPicker 
              label='Icon Color' 
              alphaType='none'
              color={getColorFromString(this.state.currentMarker.iconProperties.iconColor)} 
              onChange={(ev: any, color: IColor) => {
                this.state.currentMarker.iconProperties.iconColor = "#" + color.hex;
                this.setState({
                  currentMarker: this.state.currentMarker
                });
              }} 
            /> }

            <TextField label='Popup Text' description='leaf blank for none' defaultValue={this.state.currentMarker.popuptext} onChange={(ev: any, popuptext: string) => {
                this.state.currentMarker.popuptext = popuptext;
                this.setState({
                  currentMarker: this.state.currentMarker
                });
            }} />
          </>
          }

          

          {this.state.currentMarker.type == "Url" &&
          <>
              <TextField label='Url' type='url' defaultValue={(this.state.currentMarker.markerClickProps as MarkerTypeUrl).url} onChange={(ev: any, url: string) => {
                this.state.currentMarker.markerClickProps = { url: url };
                this.setState({
                  currentMarker: this.state.currentMarker
                });
            }} />
          </>
          }

          {this.state.currentMarker.type == "Panel" &&
          <>
              <TextField label='Panel Header' defaultValue={(this.state.currentMarker.markerClickProps as MarkerTypePanel).headerText} onChange={(ev: any, headerText: string) => {
                (this.state.currentMarker.markerClickProps as MarkerTypePanel).headerText = headerText;
                this.setState({
                  currentMarker: this.state.currentMarker
                });
              }} />

              <TextField label='Panel Content' multiline defaultValue={(this.state.currentMarker.markerClickProps as MarkerTypePanel).content} onChange={(ev: any, content: string) => {
                (this.state.currentMarker.markerClickProps as MarkerTypePanel).content = content;
                this.setState({
                  currentMarker: this.state.currentMarker
                });
              }} />
          </>
          }

          {this.state.currentMarker.type == "Dialog" &&
          <>
              <TextField label='Dialog Title' defaultValue={(this.state.currentMarker.markerClickProps as MarkerTypeDialog).headerText} onChange={(ev: any, headerText: string) => {
                (this.state.currentMarker.markerClickProps as MarkerTypeDialog).headerText = headerText;
                this.setState({
                  currentMarker: this.state.currentMarker
                });
              }} />

              <TextField label='Dialog Content' multiline defaultValue={(this.state.currentMarker.markerClickProps as MarkerTypeDialog).content} onChange={(ev: any, content: string) => {
                (this.state.currentMarker.markerClickProps as MarkerTypeDialog).content = content;
                this.setState({
                  currentMarker: this.state.currentMarker
                });
              }} />
          </>
          }
      </Panel>
    );
  }

  private onConfigPanelDismiss(): void {
    this.setState({
      showAddOrEditMarkerPanel: false,
      currentMarker: null
    });
  }

  private onContentPanelDismiss(): void {
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

      wrapper.innerHTML = `<span>
        <svg height="36px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="${iconProperties.markerColor}">
          <!-- Font Awesome Free 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) -->
          <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0z"/>
        </svg>
        <span class="map-icon" style="color: ${iconProperties.iconColor}"></span>
        </span>`;
    
        ReactDom.render(<Icon iconName={iconProperties.iconName} /> , wrapper.querySelector(".map-icon"));
    
      return wrapper;
    };

    return markerIcon as any as L.Icon;
  }

  private onCreateNewMarkerContextMenuItemClick(): void {


    this.state.currentMarker = {
      id: Guid.empty.toString(),
      latitude: this.lastLatLngRightClickPosition.lat,
      longitude: this.lastLatLngRightClickPosition.lng,
      type: "Panel",
      markerClickProps: {
        headerText: "",
        content: ""
      },
      categoryId: Guid.empty.toString(),
      iconProperties: {
        markerColor: "#" + randomString(6, 'abcdef0123456789'),
        iconName: "",
        iconColor: "#000"
      },
      popuptext: null
    };

    console.log('New clicked', this.lastLatLngRightClickPosition);
    this.state.showAddOrEditMarkerPanel = true;

    this.setState({...this.state})
  }

  private onCreateNewMarkerClick(marker: IMarker): void {
    this.state.markerItems.push(marker);
    this.state.rightMouseTarget = undefined;
  }
}
