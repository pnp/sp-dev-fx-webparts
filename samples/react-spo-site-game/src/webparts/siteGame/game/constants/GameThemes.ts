import { TileType } from './TileTypes';

export type GameTheme = 'village' | 'space' | 'retro2013' | 'bigcity';

export interface IThemePalette {
  displayName: string;
  tileColors: Record<TileType, string>;
  background: string;
  hudPanel: string;
  hudAccent: string;
  minimapGrass: string;
  minimapPath: string;
  minimapWater: string;
  minimapTree: string;
  minimapBuilding: string;
  treeStyle: 'tree' | 'crater' | 'lamppost' | 'manhole';
}

export const THEME_PALETTES: Record<GameTheme, IThemePalette> = {
  village: {
    displayName: 'Village',
    tileColors: {
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
    },
    background: '#4a7a30',
    hudPanel: '#1e293b',
    hudAccent: '#f59e0b',
    minimapGrass: '#3a7d44',
    minimapPath: '#c8a96e',
    minimapWater: '#3a7dc9',
    minimapTree: '#1e5210',
    minimapBuilding: '#8b7355',
    treeStyle: 'tree',
  },
  space: {
    displayName: 'Space',
    tileColors: {
      [TileType.GRASS]: '#0d0d1a',
      [TileType.GRASS_DARK]: '#1a1a2e',
      [TileType.PATH]: '#2d1b4e',
      [TileType.PATH_EDGE]: '#231440',
      [TileType.WATER]: '#1b3a5c',
      [TileType.WATER_DARK]: '#0f2840',
      [TileType.PLAZA]: '#3d2060',
      [TileType.BUILDING_FLOOR]: '#1c0e38',
      [TileType.WALL]: '#0d0720',
      [TileType.TREE]: '#4c1d95',
    },
    background: '#050510',
    hudPanel: '#0d0d2e',
    hudAccent: '#a78bfa',
    minimapGrass: '#0d0d1a',
    minimapPath: '#2d1b4e',
    minimapWater: '#1b3a5c',
    minimapTree: '#4c1d95',
    minimapBuilding: '#1c0e38',
    treeStyle: 'crater',
  },
  retro2013: {
    displayName: 'SP 2013 Retro',
    tileColors: {
      [TileType.GRASS]: '#8c9ba5',
      [TileType.GRASS_DARK]: '#7d8c96',
      [TileType.PATH]: '#0072c6',
      [TileType.PATH_EDGE]: '#005a9e',
      [TileType.WATER]: '#c0d9e8',
      [TileType.WATER_DARK]: '#a8c8dc',
      [TileType.PLAZA]: '#f3f3f3',
      [TileType.BUILDING_FLOOR]: '#d4cfc9',
      [TileType.WALL]: '#9b9491',
      [TileType.TREE]: '#2b579a',
    },
    background: '#e8edf0',
    hudPanel: '#2b579a',
    hudAccent: '#0072c6',
    minimapGrass: '#8c9ba5',
    minimapPath: '#0072c6',
    minimapWater: '#c0d9e8',
    minimapTree: '#2b579a',
    minimapBuilding: '#d4cfc9',
    treeStyle: 'lamppost',
  },
  bigcity: {
    displayName: 'Big City Life',
    tileColors: {
      [TileType.GRASS]: '#2d2d2d',
      [TileType.GRASS_DARK]: '#252525',
      [TileType.PATH]: '#f5c518',
      [TileType.PATH_EDGE]: '#e0b010',
      [TileType.WATER]: '#1a3a5c',
      [TileType.WATER_DARK]: '#122b44',
      [TileType.PLAZA]: '#b0b0b0',
      [TileType.BUILDING_FLOOR]: '#4a6fa5',
      [TileType.WALL]: '#2a2a2a',
      [TileType.TREE]: '#2d5a27',
    },
    background: '#1a1a1a',
    hudPanel: '#1e1e1e',
    hudAccent: '#f5c518',
    minimapGrass: '#2d2d2d',
    minimapPath: '#f5c518',
    minimapWater: '#1a3a5c',
    minimapTree: '#2d5a27',
    minimapBuilding: '#4a6fa5',
    treeStyle: 'manhole',
  },
};

export function getThemePalette(theme: GameTheme): IThemePalette {
  return THEME_PALETTES[theme] ?? THEME_PALETTES.village;
}
