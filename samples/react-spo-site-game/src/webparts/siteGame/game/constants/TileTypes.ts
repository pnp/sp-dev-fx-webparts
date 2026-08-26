export enum TileType {
  GRASS = 'GRASS',
  GRASS_DARK = 'GRASS_DARK',
  PATH = 'PATH',
  PATH_EDGE = 'PATH_EDGE',
  WATER = 'WATER',
  WATER_DARK = 'WATER_DARK',
  PLAZA = 'PLAZA',
  BUILDING_FLOOR = 'BUILDING_FLOOR',
  WALL = 'WALL',
  TREE = 'TREE',
}

export const TILE_COLORS: Record<TileType, string> = {
  [TileType.GRASS]: '#5a8c3e',
  [TileType.GRASS_DARK]: '#4d7a34',
  [TileType.PATH]: '#c8a96e',
  [TileType.PATH_EDGE]: '#b8996e',
  [TileType.WATER]: '#3a7dc9',
  [TileType.WATER_DARK]: '#2a6ab8',
  [TileType.PLAZA]: '#d4c5a8',
  [TileType.BUILDING_FLOOR]: '#8b7355',
  [TileType.WALL]: '#5c4a32',
  [TileType.TREE]: '#2d6e1a',
};

export const TILE_WALKABLE: Record<TileType, boolean> = {
  [TileType.GRASS]: true,
  [TileType.GRASS_DARK]: true,
  [TileType.PATH]: true,
  [TileType.PATH_EDGE]: true,
  [TileType.WATER]: false,
  [TileType.WATER_DARK]: false,
  [TileType.PLAZA]: true,
  [TileType.BUILDING_FLOOR]: false,
  [TileType.WALL]: false,
  [TileType.TREE]: false,
};
