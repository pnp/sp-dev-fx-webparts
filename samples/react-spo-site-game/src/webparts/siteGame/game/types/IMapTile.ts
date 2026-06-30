import { TileType } from '../constants/TileTypes';

export interface IMapTile {
  tileType: TileType;
  walkable: boolean;
  col: number;
  row: number;
}
