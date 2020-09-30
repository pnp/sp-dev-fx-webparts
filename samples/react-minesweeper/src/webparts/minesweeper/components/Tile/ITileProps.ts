import { FieldType } from "../../../../enums/FieldType";
import { Coords } from "../../../../models/Coords";
import { TileInfo } from "../../../../models/TileInfo";

export interface ITileProps {
    tileInfo: TileInfo;
    onClick: (coords: Coords) => void;
    onContextMenu: (coords: Coords, e: React.MouseEvent) => void;
  }
  