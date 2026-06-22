import { IPlayer } from '../types/IPlayer';
import { INPC } from '../types/INPC';
import { ICamera } from '../types/IGameState';
import { GameConfig } from '../constants/GameConfig';
import { renderSprite } from './Sprites';

export class CharacterRenderer {
  public render(
    ctx: CanvasRenderingContext2D,
    camera: ICamera,
    player: IPlayer,
    npcs: INPC[],
    gameTimeMs: number,
    excludeNpcId?: string
  ): void {
    // Draw NPCs first (behind player if overlapping)
    for (const npc of npcs) {
      if (excludeNpcId && npc.id === excludeNpcId) continue;
      this.renderNPC(ctx, camera, npc, gameTimeMs);
    }
    this.renderPlayer(ctx, camera, player, gameTimeMs);
  }

  private renderPlayer(
    ctx: CanvasRenderingContext2D,
    camera: ICamera,
    player: IPlayer,
    gameTimeMs: number
  ): void {
    const ts = GameConfig.TILE_SIZE;
    const sx = Math.round(player.x - camera.x - ts / 2);
    const sy = Math.round(player.y - camera.y - ts);

    const isMoving = player.vx !== 0 || player.vy !== 0;
    const walkFrame = Math.floor(gameTimeMs / GameConfig.ANIMATION_FRAME_MS) % 2;
    // Construct animation key based on player type
    const baseKey = player.spriteKey; // e.g., 'player_male', 'player_female', 'player_neutral'
    const key = isMoving && walkFrame === 1 ? `${baseKey}_walk1` : baseKey;
    const flip = player.facing === 'left';

    renderSprite(ctx, key, sx, sy, flip);

    // Player name label
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.font = 'bold 9px sans-serif';
    const nameW = ctx.measureText(player.name).width + 8;
    ctx.fillRect(sx + ts / 2 - nameW / 2, sy - 14, nameW, 12);
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.fillText(player.name, sx + ts / 2, sy - 4);
    ctx.textAlign = 'left';

    // Directional shadow under feet
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.beginPath();
    ctx.ellipse(sx + ts / 2, sy + ts - 2, 8, 3, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  private renderNPC(
    ctx: CanvasRenderingContext2D,
    camera: ICamera,
    npc: INPC,
    gameTimeMs: number
  ): void {
    const ts = GameConfig.TILE_SIZE;
    const sx = Math.round(npc.x - camera.x - ts / 2);
    const sy = Math.round(npc.y - camera.y - ts);

    if (sx + ts < 0 || sy + ts < 0 || sx > camera.viewportW || sy > camera.viewportH) return;

    const flip = npc.facing === 'left';

    // Easter egg bounce animation for some types
    let drawY = sy;
    if (npc.spriteKey === 'pnp_rabbit') {
      drawY += Math.round(Math.abs(Math.sin(gameTimeMs / 300)) * -6);
    } else if (npc.spriteKey === 'm365_chilli') {
      drawY += Math.round(Math.sin(gameTimeMs / 500) * -3);
    } else if (npc.spriteKey === 'spfx_toolkit') {
      // heavy toolbox waddle — slow, short bounce
      drawY += Math.round(Math.abs(Math.sin(gameTimeMs / 400)) * -3);
    } else if (npc.spriteKey === 'pnp_powershell') {
      // terminal cursor pulse — gentle rhythmic float
      drawY += Math.round(Math.sin(gameTimeMs / 600) * -3);
    } else if (npc.spriteKey === 'power_automate') {
      // lightning bolt zip — fast up-snap, slow settle
      drawY += Math.round(Math.abs(Math.sin(gameTimeMs / 380)) * -5);
    } else if (npc.spriteKey === 'power_apps') {
      // app building pulse — smooth bounce rhythm
      drawY += Math.round(Math.abs(Math.sin(gameTimeMs / 450)) * -4);
    } else if (npc.spriteKey === 'pnp_core') {
      // .NET hexagon — gentle oscillating float
      drawY += Math.round(Math.sin(gameTimeMs / 700) * -3);
    } else if (npc.spriteKey === 'ms_teams') {
      // Teams chat bubble pop — lively bounce
      drawY += Math.round(Math.abs(Math.sin(gameTimeMs / 350)) * -4);
    } else if (npc.spriteKey === 'ms_copilot') {
      // Copilot sparkle — smooth floating wave
      drawY += Math.round(Math.sin(gameTimeMs / 500) * -4);
    } else if (npc.spriteKey === 'campfire') {
      // campfire doesn't need movement, just draw at center
      renderSprite(ctx, npc.spriteKey, sx, drawY, false);
      return; // no name tag for campfire
    }

    renderSprite(ctx, npc.spriteKey, sx, drawY, flip);

    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.15)';
    ctx.beginPath();
    ctx.ellipse(sx + ts / 2, sy + ts - 2, 7, 3, 0, 0, Math.PI * 2);
    ctx.fill();

    // Vesa speech bubble
    if (npc.spriteKey === 'vesa_npc') {
      this.renderSpeechBubble(ctx, sx + ts / 2, drawY - 2, '"This is SharePoint..."');
    }



    // Name tag
    ctx.fillStyle = npc.kind === 'easteregg' ? 'rgba(80,0,120,0.82)' : 'rgba(0,0,0,0.70)';
    ctx.font = 'bold 8px sans-serif';
    const nameW = ctx.measureText(npc.name).width + 8;
    const tagX = sx + ts / 2 - nameW / 2;
    const tagY = drawY - 14;
    ctx.fillRect(tagX, tagY, nameW, 11);
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.fillText(npc.name, sx + ts / 2, tagY + 9);
    ctx.textAlign = 'left';
  }

  private renderSpeechBubble(
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    text: string
  ): void {
    ctx.font = '8px sans-serif';
    const tw = ctx.measureText(text).width;
    const bw = tw + 12;
    const bh = 16;
    const bx = cx - bw / 2;
    const by = cy - bh - 20;

    ctx.fillStyle = 'rgba(255,255,255,0.92)';
    ctx.strokeStyle = '#9155b8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(bx, by, bw, bh, 4);
    ctx.fill();
    ctx.stroke();

    // Tail
    ctx.beginPath();
    ctx.moveTo(cx, by + bh);
    ctx.lineTo(cx - 4, by + bh + 6);
    ctx.lineTo(cx + 4, by + bh + 6);
    ctx.closePath();
    ctx.fillStyle = 'rgba(255,255,255,0.92)';
    ctx.fill();

    ctx.fillStyle = '#333';
    ctx.textAlign = 'center';
    ctx.fillText(text, cx, by + 11);
    ctx.textAlign = 'left';
  }
}
