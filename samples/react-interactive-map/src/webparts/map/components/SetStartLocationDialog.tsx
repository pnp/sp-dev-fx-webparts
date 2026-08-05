import * as React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import * as L from 'leaflet';
import { Dialog, DialogType, DialogFooter, PrimaryButton, DefaultButton } from '@fluentui/react';
import PlaceSearch from './PlaceSearch';

export interface ISetStartLocationDialogProps {
  center: [number, number];
  zoom: number;
  tileLayerUrl: string;
  tileLayerAttribution: string;
  onSave(center: [number, number], zoom: number): void;
  onDismiss(): void;
}

/**
 * A property-pane dialog for picking the map's start view. Hosts a small Leaflet map
 * plus the same OpenStreetMap search used on the live map: the author searches for a
 * place (or pans/zooms), then saves the current view as the start center + zoom. This
 * replaces the obscure right-click "Set Start Position" with a discoverable control.
 */
export default class SetStartLocationDialog extends React.Component<ISetStartLocationDialogProps> {
  private map: L.Map | null = null;

  public render(): React.ReactElement<ISetStartLocationDialogProps> {
    return (
      <Dialog
        hidden={false}
        onDismiss={this.props.onDismiss}
        dialogContentProps={{
          type: DialogType.normal,
          title: 'Set start location',
          subText: 'Search for a place, or pan and zoom the map, then set the current view as the start location visitors will see.'
        }}
        minWidth={600}
        modalProps={{ isBlocking: false }}
      >
        <PlaceSearch
          placeholder="Search for a place to centre the map…"
          onPlaceSelected={(lat: number, lon: number, _name: string, bounds?: [number, number, number, number]) => {
            if (!this.map) {
              return;
            }
            if (bounds) {
              this.map.fitBounds([[bounds[0], bounds[2]], [bounds[1], bounds[3]]], { maxZoom: 16, padding: [20, 20] });
            } else {
              this.map.setView([lat, lon], 13);
            }
          }}
        />
        <div style={{ height: 400, width: '100%', marginTop: 8 }}>
          <MapContainer
            center={this.props.center ?? [51.505, -0.09]}
            zoom={this.props.zoom ?? 13}
            style={{ height: '100%', width: '100%' }}
            whenCreated={(map: L.Map) => {
              this.map = map;
              // The dialog animates in, so the container has no size when Leaflet
              // initializes — recalculate once it has settled, or the tiles are blank.
              setTimeout(() => map.invalidateSize(), 300);
            }}
          >
            <TileLayer url={this.props.tileLayerUrl} attribution={this.props.tileLayerAttribution} />
          </MapContainer>
        </div>
        <DialogFooter>
          <PrimaryButton
            text="Set as start location"
            onClick={() => {
              if (this.map) {
                const center: L.LatLng = this.map.getCenter();
                this.props.onSave([center.lat, center.lng], this.map.getZoom());
              }
              this.props.onDismiss();
            }}
          />
          <DefaultButton text="Cancel" onClick={this.props.onDismiss} />
        </DialogFooter>
      </Dialog>
    );
  }
}
