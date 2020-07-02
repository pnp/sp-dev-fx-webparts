import { Coords } from "./Coords";
import { FieldType } from "../enums/FieldType";


export interface TileInfo{
    coords: Coords;
    closeMines?: number;
    fieldType: FieldType;
    hasMine: boolean;
}