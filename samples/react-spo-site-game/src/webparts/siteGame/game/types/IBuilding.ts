import { BuildingType } from '../constants/BuildingTypes';

export interface IBuilding {
  id: string;
  name: string;
  buildingType: BuildingType;
  col: number;
  row: number;
  widthTiles: number;
  heightTiles: number;
  x: number;
  y: number;
  width: number;
  height: number;
  description: string;
  itemCount: number;
  url: string;
  listId: string;
}
