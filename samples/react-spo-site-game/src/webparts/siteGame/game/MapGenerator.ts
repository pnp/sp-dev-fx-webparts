import { ISPData, ISPGroupUser } from '../services/ISharePointData';
import { IGameState, ICamera } from './types/IGameState';
import { IMapTile } from './types/IMapTile';
import { IBuilding } from './types/IBuilding';
import { INPC, NPCFacing } from './types/INPC';
import { IPlayer } from './types/IPlayer';
import { TileType, TILE_WALKABLE } from './constants/TileTypes';
import { BuildingType, SP_BASE_TEMPLATE_MAP, DOC_LIB_VARIANTS } from './constants/BuildingTypes';
import { PlayerPreferences } from './constants/PlayerPreferences';

// Well-known SharePoint library names that get a dedicated building type
const NAMED_LIBRARY_MAP: Array<{ pattern: RegExp; type: BuildingType }> = [
  { pattern: /^(shared )?documents$/i,    type: BuildingType.DOCUMENTS_LIBRARY },
  { pattern: /^style library$/i,          type: BuildingType.STYLE_LIBRARY },
];
import { GameConfig } from './constants/GameConfig';
import { EASTER_EGG_DEFINITIONS } from './constants/EasterEggs';
import { M365_EASTER_EGG_DEFINITIONS } from './constants/M365EasterEggs';

function seededRandom(seed: number): () => number {
  let s = seed;
  return function (): number {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

function guidToSeed(guid: string): number {
  let h = 0;
  for (let i = 0; i < guid.length; i++) {
    h = ((h << 5) - h + guid.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function makeTile(tileType: TileType, row: number, col: number): IMapTile {
  return { tileType, walkable: TILE_WALKABLE[tileType], row, col };
}

/** Returns the nearest walkable tile to (row, col), spiralling outward up to radius 10. */
function findNearestWalkable(
  tileMap: IMapTile[][],
  row: number,
  col: number,
  maxRows: number,
  maxCols: number
): { row: number; col: number } {
  if (tileMap[row]?.[col]?.walkable) return { row, col };
  for (let radius = 1; radius <= 10; radius++) {
    for (let dr = -radius; dr <= radius; dr++) {
      for (let dc = -radius; dc <= radius; dc++) {
        if (Math.abs(dr) !== radius && Math.abs(dc) !== radius) continue;
        const r = row + dr;
        const c = col + dc;
        if (r >= 0 && r < maxRows && c >= 0 && c < maxCols && tileMap[r]?.[c]?.walkable) {
          return { row: r, col: c };
        }
      }
    }
  }
  return { row, col };
}

export interface IBuildWorldOptions {
  maxBots: number;
  enableEasterEggs: boolean;
  enableM365EasterEggs: boolean;
  showEmptyLists: boolean;
}

export class MapGenerator {
  public buildWorld(
    data: ISPData,
    viewportW: number,
    viewportH: number,
    options: IBuildWorldOptions = { maxBots: 20, enableEasterEggs: true, enableM365EasterEggs: true, showEmptyLists: true }
  ): IGameState {
    const ts = GameConfig.TILE_SIZE;
    const cols = GameConfig.MAP_COLS;
    const rows = GameConfig.MAP_ROWS;

    // ── 1. Create base grass map ──────────────────────────────────────────────
    const tileMap: IMapTile[][] = [];
    for (let r = 0; r < rows; r++) {
      tileMap[r] = [];
      for (let c = 0; c < cols; c++) {
        tileMap[r][c] = makeTile(TileType.GRASS, r, c);
      }
    }

    // ── 2. Main roads (cross pattern) ────────────────────────────────────────
    const midRow = Math.floor(rows / 2);
    const midCol = Math.floor(cols / 2);

    for (let c = 0; c < cols; c++) {
      tileMap[midRow][c] = makeTile(TileType.PATH, midRow, c);
      tileMap[midRow - 1][c] = makeTile(TileType.PATH, midRow - 1, c);
    }
    for (let r = 0; r < rows; r++) {
      tileMap[r][midCol] = makeTile(TileType.PATH, r, midCol);
      tileMap[r][midCol + 1] = makeTile(TileType.PATH, r, midCol + 1);
    }

    // ── 3. Plaza center ──────────────────────────────────────────────────────
    for (let r = midRow - 2; r <= midRow + 2; r++) {
      for (let c = midCol - 2; c <= midCol + 3; c++) {
        tileMap[r][c] = makeTile(TileType.PLAZA, r, c);
      }
    }

    // ── 4. Water feature (bottom-right corner) ───────────────────────────────
    for (let r = rows - 6; r < rows - 1; r++) {
      for (let c = cols - 6; c < cols - 1; c++) {
        const t = (r + c) % 2 === 0 ? TileType.WATER : TileType.WATER_DARK;
        tileMap[r][c] = makeTile(t, r, c);
      }
    }

    // ── 5. Tree border ───────────────────────────────────────────────────────
    for (let c = 0; c < cols; c++) {
      tileMap[0][c] = makeTile(TileType.TREE, 0, c);
      tileMap[rows - 1][c] = makeTile(TileType.TREE, rows - 1, c);
    }
    for (let r = 0; r < rows; r++) {
      tileMap[r][0] = makeTile(TileType.TREE, r, 0);
      tileMap[r][cols - 1] = makeTile(TileType.TREE, r, cols - 1);
    }

    // ── 6. Scatter trees ─────────────────────────────────────────────────────
    const treeRng = seededRandom(12345);
    for (let i = 0; i < 20; i++) {
      const tr = 2 + Math.floor(treeRng() * (rows - 4));
      const tc = 2 + Math.floor(treeRng() * (cols - 4));
      if (tileMap[tr][tc].tileType === TileType.GRASS) {
        tileMap[tr][tc] = makeTile(TileType.TREE, tr, tc);
      }
    }

    // ── 7. Place buildings ───────────────────────────────────────────────────
    const bw = GameConfig.BUILDING_WIDTH_TILES;
    const bh = GameConfig.BUILDING_HEIGHT_TILES;
    const spacing = GameConfig.BUILDING_SPACING;
    const buildings: IBuilding[] = [];

    // Building grid slots — arranged in 4 quadrants around the plaza
    const slots: Array<{ startRow: number; startCol: number }> = [];
    const quadrants = [
      { rowStart: 2, rowEnd: midRow - 3, colStart: 2, colEnd: midCol - 3 },
      { rowStart: 2, rowEnd: midRow - 3, colStart: midCol + 4, colEnd: cols - 7 },
      { rowStart: midRow + 3, rowEnd: rows - 7, colStart: 2, colEnd: midCol - 3 },
      { rowStart: midRow + 3, rowEnd: rows - 7, colStart: midCol + 4, colEnd: cols - 7 },
    ];
    for (const q of quadrants) {
      for (let r = q.rowStart; r + bh <= q.rowEnd; r += bh + spacing) {
        for (let c = q.colStart; c + bw <= q.colEnd; c += bw + spacing) {
          slots.push({ startRow: r, startCol: c });
        }
      }
    }

    // Filter eligible lists
    const eligibleLists = data.lists.filter((l) => {
      if (l.RootFolder?.ServerRelativeUrl?.toLowerCase().endsWith('/_catalogs/masterpage')) return false;
      if (!options.showEmptyLists && l.ItemCount === 0) return false;
      return true;
    });

    for (let i = 0; i < Math.min(eligibleLists.length, slots.length); i++) {
      const list = eligibleLists[i];
      const slot = slots[i];
      const rng = seededRandom(guidToSeed(list.Id));

      let buildingType: BuildingType;
      const mapped = SP_BASE_TEMPLATE_MAP[list.BaseTemplate];
      if (mapped === 'DOC_LIB_RANDOM') {
        buildingType = DOC_LIB_VARIANTS[Math.floor(rng() * DOC_LIB_VARIANTS.length)];
      } else if (mapped) {
        buildingType = mapped as BuildingType;
      } else {
        buildingType = BuildingType.GENERAL_STORE;
      }

      // Special: SiteAssets
      if (list.RootFolder?.ServerRelativeUrl?.toLowerCase().includes('siteassets')) {
        buildingType = BuildingType.CRAFT_WORKSHOP;
      }

      // Special: well-known library names override random DOC_LIB_RANDOM assignment
      const namedMatch = NAMED_LIBRARY_MAP.find(m => m.pattern.test(list.Title));
      if (namedMatch) {
        buildingType = namedMatch.type;
      }

      const building: IBuilding = {
        id: list.Id,
        name: list.Title,
        buildingType,
        col: slot.startCol,
        row: slot.startRow,
        widthTiles: bw,
        heightTiles: bh,
        x: slot.startCol * ts,
        y: slot.startRow * ts,
        width: bw * ts,
        height: bh * ts,
        description: `${buildingType} — ${list.ItemCount} items`,
        itemCount: list.ItemCount,
        url: (new URL(data.siteAbsoluteUrl)).origin + list.DefaultViewUrl,
        listId: list.Id,
      };
      buildings.push(building);

      // Mark building tiles as non-walkable
      for (let r = slot.startRow; r < slot.startRow + bh; r++) {
        for (let c = slot.startCol; c < slot.startCol + bw; c++) {
          if (tileMap[r]?.[c]) {
            tileMap[r][c] = makeTile(TileType.BUILDING_FLOOR, r, c);
          }
        }
      }

      // Street in front of building
      const streetRow = slot.startRow + bh;
      for (let c = slot.startCol; c < slot.startCol + bw; c++) {
        if (tileMap[streetRow]?.[c]?.tileType === TileType.GRASS) {
          tileMap[streetRow][c] = makeTile(TileType.PATH_EDGE, streetRow, c);
        }
      }
    }

    // ── 8. User NPCs ─────────────────────────────────────────────────────────
    const npcs: INPC[] = [];
    const groupColorMap: Record<string, string> = {
      Owners: '#c8960a',
      Members: '#1a5faa',
      Visitors: '#2a8a3a',
    };
    const groupSpriteMap: Record<string, string> = {
      Owners: 'user_npc_owner',
      Members: 'user_npc_member',
      Visitors: 'user_npc_visitor',
    };

    const userRng = seededRandom(99999);
    const uniqueUsers = data.users.slice(0, options.maxBots);
    for (const user of uniqueUsers) {
      const spawnRow = 5 + Math.floor(userRng() * (rows - 10));
      const spawnCol = 5 + Math.floor(userRng() * (cols - 10));
      const sp = tileMap[spawnRow]?.[spawnCol];
      const spawnOnWalkable = sp && sp.walkable;

      npcs.push({
        id: `user_${user.Id}`,
        name: user.Title,
        kind: 'user',
        x: (spawnOnWalkable ? spawnCol : midCol + 3) * ts + ts / 2,
        y: (spawnOnWalkable ? spawnRow : midRow + 1) * ts + ts / 2,
        vx: 0,
        vy: 0,
        spriteKey: groupSpriteMap[(user as ISPGroupUser).groupName] || 'user_npc_member',
        walkTimer: 1000 + userRng() * 1500,
        pauseTimer: 0,
        facing: 'down' as NPCFacing,
        title: (user as ISPGroupUser).groupName + ' — ' + user.Title,
        bio: user.Email || 'No email available',
        email: user.Email,
        profileUrl: `/_layouts/15/userdisp.aspx?ID=${user.Id}`,
        groupColor: groupColorMap[(user as ISPGroupUser).groupName] || '#44aaff',
        animFrame: 0,
        animTimer: 0,
        speedMultiplier: 1,
      });
    }

    // ── 9. Easter egg NPCs ───────────────────────────────────────────────────
    if (options.enableEasterEggs) {
      const eggSpawns: Array<{ row: number; col: number }> = [
        { row: midRow - 4, col: midCol - 5 },    // pnp_rabbit
        { row: midRow + 4, col: midCol - 4 },    // vesa_npc
        { row: midRow - 5, col: midCol - 9 },    // warrior_horse_1
        { row: midRow + 6, col: midCol + 8 },    // warrior_horse_2
        { row: midRow - 7, col: midCol + 9 },    // warrior_horse_3
        { row: midRow + 7, col: midCol - 10 },   // warrior_horse_4
        { row: midRow + 4, col: midCol + 12 },   // warrior_horse_5
        { row: midRow - 3, col: midCol + 7 },    // cli_m365
        { row: midRow + 1, col: midCol - 1 },    // campfire
        { row: midRow + 5, col: midCol - 7 },    // spfx_toolkit
        { row: midRow + 8, col: midCol - 4 },    // pnp_powershell
        { row: midRow - 2, col: midCol - 6 },    // julie
        { row: midRow - 2, col: midCol + 5 },    // luise
        { row: midRow + 9, col: midCol + 6 },    // pnp_core
        { row: midRow - 6, col: midCol + 4 },    // pnp_spfx_samples
        { row: midRow + 3, col: midCol + 6 },    // hugo
      ];

      EASTER_EGG_DEFINITIONS.forEach((def, idx) => {
        const rawSpawn = eggSpawns[idx] || { row: midRow, col: midCol + idx };
        const spawn = findNearestWalkable(tileMap, rawSpawn.row, rawSpawn.col, rows, cols);
        npcs.push({
          id: def.id,
          name: def.name,
          kind: 'easteregg',
          x: spawn.col * ts + ts / 2,
          y: spawn.row * ts + ts / 2,
          vx: idx % 2 === 0 ? GameConfig.NPC_SPEED * 0.6 : -(GameConfig.NPC_SPEED * 0.6),
          vy: 0,
          spriteKey: def.spriteKey,
          walkTimer: 1800 + idx * 300,
          pauseTimer: 0,
          facing: (idx % 2 === 0 ? 'right' : 'left') as NPCFacing,
          title: def.title,
          bio: def.bio,
          bios: def.bios,
          email: def.email,
          profileUrl: def.profileUrl,
          groupColor: '#ffd700',
          animFrame: 0,
          animTimer: 0,
          speedMultiplier: 0.6,
        });
      });
    }

    // ── 10. Microsoft 365 Easter egg NPCs ────────────────────────────────────
    if (options.enableM365EasterEggs) {
      const m365Spawns: Array<{ row: number; col: number }> = [
        { row: midRow - 2, col: midCol + 10 },   // power_automate (0)
        { row: midRow + 3, col: midCol - 8 },    // power_apps (1)
        { row: midRow - 9, col: midCol + 7 },    // power_bi (1)
        { row: midRow + 0, col: midCol + 10 },   // power_pages (2)
        { row: midRow - 1, col: midCol - 8 },    // ms_lists (3)
        { row: midRow + 5, col: midCol + 11 },   // ms_teams (4)
        { row: midRow - 8, col: midCol - 6 },    // ms_copilot (5)
      ];

      M365_EASTER_EGG_DEFINITIONS.forEach((def, idx) => {
        const rawSpawn = m365Spawns[idx] || { row: midRow + 10, col: midCol + idx * 2 };
        const spawn = findNearestWalkable(tileMap, rawSpawn.row, rawSpawn.col, rows, cols);
        npcs.push({
          id: def.id,
          name: def.name,
          kind: 'm365egg',
          x: spawn.col * ts + ts / 2,
          y: spawn.row * ts + ts / 2,
          vx: idx % 2 === 0 ? GameConfig.NPC_SPEED * 0.5 : -(GameConfig.NPC_SPEED * 0.5),
          vy: 0,
          spriteKey: def.spriteKey,
          walkTimer: 2000 + idx * 400,
          pauseTimer: 0,
          facing: 'down' as NPCFacing,
          animFrame: 0,
          animTimer: 0,
          speedMultiplier: 1,
          title: def.title,
          bio: def.bio,
          bios: def.bios,
        });
      });
    }

    // ── 10. Player start ─────────────────────────────────────────────────────
    const playerType = PlayerPreferences.getPlayerTypeOrDefault();
    const player: IPlayer = {
      x: (midCol + 1) * ts + ts / 2,
      y: midRow * ts + ts / 2,
      vx: 0,
      vy: 0,
      facing: 'down',
      speed: GameConfig.PLAYER_SPEED,
      animFrame: 0,
      animTimer: 0,
      name: data.currentUser.Title || 'Player',
      spriteKey: PlayerPreferences.getSpriteKey(playerType),
      playerType,
    };

    const camera: ICamera = {
      x: player.x - viewportW / 2,
      y: player.y - viewportH / 2,
      viewportW,
      viewportH,
    };

    return {
      tileMap,
      mapCols: cols,
      mapRows: rows,
      buildings,
      npcs,
      player,
      camera,
      siteTitle: data.siteTitle,
    };
  }
}
