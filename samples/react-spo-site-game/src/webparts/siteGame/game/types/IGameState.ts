import { IMapTile } from './IMapTile';
import { IBuilding } from './IBuilding';
import { INPC } from './INPC';
import { IPlayer } from './IPlayer';

export interface ICamera {
  x: number;
  y: number;
  viewportW: number;
  viewportH: number;
}

export interface IGameState {
  tileMap: IMapTile[][];
  mapCols: number;
  mapRows: number;
  buildings: IBuilding[];
  npcs: INPC[];
  player: IPlayer;
  camera: ICamera;
  siteTitle: string;
}
