import { IPlayer } from '../types/IPlayer';
import { INPC } from '../types/INPC';
import { IBuilding } from '../types/IBuilding';
import { ICamera } from '../types/IGameState';
import { IMapTile } from '../types/IMapTile';
import { TileType } from '../constants/TileTypes';
import { GameConfig } from '../constants/GameConfig';
import { IThemePalette } from '../constants/GameThemes';

export class UIRenderer {
  public render(
    palette: IThemePalette,
    ctx: CanvasRenderingContext2D,
    camera: ICamera,
    player: IPlayer,
    npcs: INPC[],
    buildings: IBuilding[],
    gameTimeMs: number,
    proximityTarget: IBuilding | INPC | undefined,
    discoveredEggs: Set<string>,
    discoveredBuildings: Set<string>,
    discoveredUsers: Set<string>,
    discoveredM365Eggs: Set<string>,
    totalEggs: number,
    totalBuildings: number,
    totalUsers: number,
    totalM365Eggs: number,
    showHints: boolean,
    mapRows: number,
    mapCols: number,
    tileMap: IMapTile[][]
  ): void {
    this.renderMinimap(palette, ctx, camera, player, npcs, buildings, discoveredEggs, discoveredM365Eggs, mapRows, mapCols, tileMap);
    this.renderScoreHUD(
      palette, ctx, gameTimeMs,
      discoveredEggs.size, totalEggs,
      discoveredBuildings.size + discoveredUsers.size, totalBuildings + totalUsers,
      discoveredM365Eggs.size, totalM365Eggs
    );
    if (proximityTarget !== undefined) {
      this.renderProximityHint(ctx, camera, proximityTarget, gameTimeMs);
    }
    if (showHints) {
      this.renderControlHints(ctx, camera.viewportW, camera.viewportH, gameTimeMs);
    }
  }

  private renderMinimap(
    palette: IThemePalette,
    ctx: CanvasRenderingContext2D,
    camera: ICamera,
    player: IPlayer,
    npcs: INPC[],
    buildings: IBuilding[],
    discoveredEggs: Set<string>,
    discoveredM365Eggs: Set<string>,
    mapRows: number,
    mapCols: number,
    tileMap: IMapTile[][]
  ): void {
    const ts = GameConfig.TILE_SIZE;
    const scale = GameConfig.MINIMAP_SCALE;
    const mmW = Math.round(mapCols * ts * scale);
    const mmH = Math.round(mapRows * ts * scale);
    const mmX = camera.viewportW - mmW - 10;
    const mmY = 10;

    // Background
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(mmX - 2, mmY - 2, mmW + 4, mmH + 4);

    // Walkable tiles
    for (let r = 0; r < tileMap.length; r++) {
      for (let c = 0; c < (tileMap[r]?.length ?? 0); c++) {
        const tile = tileMap[r][c];
        let mmColor: string;
        switch (tile.tileType) {
          case TileType.GRASS:
          case TileType.GRASS_DARK:
            mmColor = palette.minimapGrass; break;
          case TileType.PATH:
          case TileType.PATH_EDGE:
            mmColor = palette.minimapPath; break;
          case TileType.WATER:
          case TileType.WATER_DARK:
            mmColor = palette.minimapWater; break;
          case TileType.TREE:
            mmColor = palette.minimapTree; break;
          default:
            mmColor = palette.minimapBuilding;
        }
        ctx.fillStyle = mmColor;
        ctx.fillRect(
          mmX + Math.round(c * ts * scale),
          mmY + Math.round(r * ts * scale),
          Math.max(1, Math.round(ts * scale)),
          Math.max(1, Math.round(ts * scale))
        );
      }
    }

    // Buildings
    for (const b of buildings) {
      ctx.fillStyle = 'rgba(200,160,80,0.85)';
      ctx.fillRect(
        mmX + Math.round(b.x * scale),
        mmY + Math.round(b.y * scale),
        Math.max(2, Math.round(b.width * scale)),
        Math.max(2, Math.round(b.height * scale))
      );
    }

    // NPCs
    for (const npc of npcs) {
      const dotColor =
        npc.kind === 'easteregg'
          ? discoveredEggs.has(npc.id)
            ? '#ffd700'
            : '#888'
          : npc.kind === 'm365egg'
            ? discoveredM365Eggs.has(npc.id) ? '#00ccff' : '#556'
            : npc.groupColor || '#44aaff';
      ctx.fillStyle = dotColor;
      ctx.beginPath();
      ctx.arc(
        mmX + Math.round(npc.x * scale),
        mmY + Math.round(npc.y * scale),
        2,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }

    // Player dot
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(
      mmX + Math.round(player.x * scale),
      mmY + Math.round(player.y * scale),
      3,
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Viewport rect
    ctx.strokeStyle = 'rgba(255,255,255,0.4)';
    ctx.lineWidth = 1;
    ctx.strokeRect(
      mmX + Math.round(camera.x * scale),
      mmY + Math.round(camera.y * scale),
      Math.round(camera.viewportW * scale),
      Math.round(camera.viewportH * scale)
    );
  }

  private renderProximityHint(
    ctx: CanvasRenderingContext2D,
    camera: ICamera,
    target: IBuilding | INPC,
    gameTimeMs: number
  ): void {
    const alpha = 0.6 + 0.4 * Math.sin(gameTimeMs / 300);
    const text =
      'listId' in target
        ? `Press [E] to enter ${(target as IBuilding).name}`
        : `Press [E] to talk to ${(target as INPC).name}`;

    const bw = text.length * 7 + 20;
    const bh = 22;
    const bx = (camera.viewportW - bw) / 2;
    const by = camera.viewportH - 60;

    ctx.fillStyle = `rgba(0,0,0,${alpha * 0.75})`;
    ctx.beginPath();
    ctx.roundRect(bx, by, bw, bh, 6);
    ctx.fill();

    ctx.fillStyle = `rgba(255,255,255,${alpha})`;
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(text, camera.viewportW / 2, by + 15);
    ctx.textAlign = 'left';
  }

  private renderScoreHUD(
    palette: IThemePalette,
    ctx: CanvasRenderingContext2D,
    gameTimeMs: number,
    pnpCount: number,
    pnpTotal: number,
    siteCount: number,
    siteTotal: number,
    m365Count: number,
    m365Total: number
  ): void {
    const panelX = 10;
    const panelY = 10;
    const panelW = 120;
    const panelH = m365Total > 0 ? 90 : 60;
    const barX = panelX + 8;
    const barW = panelW - 16;
    const barH = 5;
    const radius = 7;

    // Panel background
    ctx.fillStyle = palette.hudPanel;
    ctx.beginPath();
    ctx.roundRect(panelX, panelY, panelW, panelH, radius);
    ctx.fill();
    // Subtle top highlight
    ctx.fillStyle = 'rgba(255,255,255,0.06)';
    ctx.beginPath();
    ctx.roundRect(panelX, panelY, panelW, panelH / 2, radius);
    ctx.fill();

    // ── PnP row ──────────────────────────────────────────────────────────────
    const pnpFrac = pnpTotal > 0 ? pnpCount / pnpTotal : 0;
    const pnpComplete = pnpFrac >= 1;
    const pnpGlow = pnpComplete ? (0.55 + 0.45 * Math.sin(gameTimeMs / 320)) : 1;

    const pnpLabelY = panelY + 18;
    ctx.globalAlpha = pnpGlow;
    ctx.font = 'bold 10px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillStyle = palette.hudAccent;
    ctx.fillText('\u2B50 PnP', barX, pnpLabelY);
    ctx.textAlign = 'right';
    ctx.fillStyle = palette.hudAccent;
    ctx.fillText(`${pnpCount}\u2009/\u2009${pnpTotal}`, panelX + panelW - 8, pnpLabelY);
    ctx.globalAlpha = 1;

    // PnP progress bar track
    const pnpBarY = pnpLabelY + 4;
    ctx.fillStyle = 'rgba(255,215,0,0.22)';
    ctx.beginPath();
    ctx.roundRect(barX, pnpBarY, barW, barH, 2);
    ctx.fill();
    // PnP progress bar fill
    const pnpFillW = Math.round(barW * pnpFrac);
    if (pnpFillW > 0) {
      ctx.globalAlpha = pnpGlow;
      ctx.fillStyle = palette.hudAccent;
      ctx.beginPath();
      ctx.roundRect(barX, pnpBarY, pnpFillW, barH, 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    // ── Site row ─────────────────────────────────────────────────────────────
    const siteFrac = siteTotal > 0 ? siteCount / siteTotal : 0;
    const siteComplete = siteFrac >= 1;
    const siteGlow = siteComplete ? (0.55 + 0.45 * Math.sin(gameTimeMs / 280 + 1.2)) : 1;

    const siteLabelY = panelY + 44;
    ctx.globalAlpha = siteGlow;
    ctx.font = 'bold 10px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillStyle = palette.hudAccent;
    ctx.fillText('\u{1F5FA} Site', barX, siteLabelY);
    ctx.textAlign = 'right';
    ctx.fillStyle = palette.hudAccent;
    ctx.fillText(`${siteCount}\u2009/\u2009${siteTotal}`, panelX + panelW - 8, siteLabelY);
    ctx.globalAlpha = 1;

    // Site progress bar track
    const siteBarY = siteLabelY + 4;
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.beginPath();
    ctx.roundRect(barX, siteBarY, barW, barH, 2);
    ctx.fill();
    // Site progress bar fill
    const siteFillW = Math.round(barW * siteFrac);
    if (siteFillW > 0) {
      ctx.globalAlpha = siteGlow;
      ctx.fillStyle = palette.hudAccent;
      ctx.beginPath();
      ctx.roundRect(barX, siteBarY, siteFillW, barH, 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    // ── M365 row (only rendered when M365 eggs are present) ─────────────────
    if (m365Total > 0) {
      const m365Frac = m365Total > 0 ? m365Count / m365Total : 0;
      const m365Complete = m365Frac >= 1;
      const m365Glow = m365Complete ? (0.55 + 0.45 * Math.sin(gameTimeMs / 310 + 2.4)) : 1;

      const m365LabelY = panelY + 74;
      ctx.globalAlpha = m365Glow;
      ctx.font = 'bold 10px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillStyle = m365Complete ? '#80dcff' : '#00b4d8';
      ctx.fillText('\u26a1 M365', barX, m365LabelY);
      ctx.textAlign = 'right';
      ctx.fillStyle = m365Complete ? '#80dcff' : '#0096c7';
      ctx.fillText(`${m365Count}\u2009/\u2009${m365Total}`, panelX + panelW - 8, m365LabelY);
      ctx.globalAlpha = 1;

      const m365BarY = m365LabelY + 4;
      ctx.fillStyle = 'rgba(0,180,216,0.22)';
      ctx.beginPath();
      ctx.roundRect(barX, m365BarY, barW, barH, 2);
      ctx.fill();
      const m365FillW = Math.round(barW * m365Frac);
      if (m365FillW > 0) {
        ctx.globalAlpha = m365Glow;
        ctx.fillStyle = m365Complete ? '#80dcff' : '#00b4d8';
        ctx.beginPath();
        ctx.roundRect(barX, m365BarY, m365FillW, barH, 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    ctx.textAlign = 'left';
  }

  private renderControlHints(
    ctx: CanvasRenderingContext2D,
    vpW: number,
    vpH: number,
    gameTimeMs: number
  ): void {
    const fadeMs = GameConfig.HUD_FADE_TIME_MS;
    const alpha = Math.max(0, 1 - gameTimeMs / fadeMs);
    if (alpha <= 0) return;

    ctx.fillStyle = `rgba(0,0,0,${alpha * 0.6})`;
    ctx.fillRect(10, vpH - 38, 220, 28);
    ctx.fillStyle = `rgba(255,255,255,${alpha})`;
    ctx.font = '10px sans-serif';
    ctx.fillText('WASD / Arrow keys: Move   E / Enter: Interact', 16, vpH - 20);
  }

}
