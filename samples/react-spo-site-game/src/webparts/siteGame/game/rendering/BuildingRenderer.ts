import { IBuilding } from '../types/IBuilding';
import { ICamera } from '../types/IGameState';
import { BuildingType, BUILDING_CONFIG } from '../constants/BuildingTypes';

export class BuildingRenderer {
  public render(
    ctx: CanvasRenderingContext2D,
    camera: ICamera,
    buildings: IBuilding[],
    gameTimeMs: number
  ): void {
    for (const b of buildings) {
      const sx = Math.round(b.x - camera.x);
      const sy = Math.round(b.y - camera.y);

      // Cull off-screen
      if (
        sx + b.width < 0 ||
        sy + b.height < 0 ||
        sx > camera.viewportW ||
        sy > camera.viewportH
      ) {
        continue;
      }

      const cfg = BUILDING_CONFIG[b.buildingType];

      // ── Shadow ──────────────────────────────────────────────
      ctx.fillStyle = 'rgba(0,0,0,0.22)';
      ctx.fillRect(sx + 6, sy + 6, b.width, b.height);

      // ── Base walls ──────────────────────────────────────────
      ctx.fillStyle = cfg.baseColor;
      ctx.fillRect(sx, sy, b.width, b.height);

      // Subtle left-edge highlight to give 3-D feel
      ctx.fillStyle = 'rgba(255,255,255,0.12)';
      ctx.fillRect(sx, sy, 4, b.height);
      // Bottom-edge shadow
      ctx.fillStyle = 'rgba(0,0,0,0.15)';
      ctx.fillRect(sx, sy + b.height - 4, b.width, 4);

      // ── Pitched roof ────────────────────────────────────────
      const roofPeakY = sy - 16;
      ctx.fillStyle = cfg.roofColor;
      ctx.beginPath();
      ctx.moveTo(sx - 3, sy + 1);
      ctx.lineTo(sx + b.width / 2, roofPeakY);
      ctx.lineTo(sx + b.width + 3, sy + 1);
      ctx.closePath();
      ctx.fill();
      // Roof outline
      ctx.strokeStyle = 'rgba(0,0,0,0.35)';
      ctx.lineWidth = 1;
      ctx.stroke();
      // Roof ridge accent line
      ctx.strokeStyle = cfg.accentColor;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.4;
      ctx.beginPath();
      ctx.moveTo(sx + 2, sy);
      ctx.lineTo(sx + b.width / 2, roofPeakY + 2);
      ctx.lineTo(sx + b.width - 2, sy);
      ctx.stroke();
      ctx.globalAlpha = 1.0;
      // Fascia board at roof base
      ctx.fillStyle = cfg.roofColor;
      ctx.fillRect(sx - 3, sy - 2, b.width + 6, 5);

      // ── Upper windows ───────────────────────────────────────
      const winW = 16;
      const winH = 14;
      const winRow1Y = sy + 10;
      const winCount = Math.max(2, Math.min(4, Math.floor((b.width - 16) / 26)));
      const winStep = (b.width - winCount * winW) / (winCount + 1);
      for (let wi = 0; wi < winCount; wi++) {
        const wix = sx + Math.round(winStep + wi * (winW + winStep));
        this.drawWindow(ctx, wix, winRow1Y, winW, winH, cfg.baseColor, cfg.accentColor);
      }

      // ── Lower side windows (flanking door) ──────────────────
      const doorW = 16;
      const doorH = 22;
      const doorX = sx + Math.floor((b.width - doorW) / 2);
      const doorY = sy + b.height - doorH;
      const sideWinW = 12;
      const sideWinH = 11;
      const sideWinY = doorY + 2;
      // left wing
      const leftWingW = doorX - sx;
      if (leftWingW >= sideWinW + 8) {
        const lx = sx + Math.round((leftWingW - sideWinW) / 2);
        this.drawWindow(ctx, lx, sideWinY, sideWinW, sideWinH, cfg.baseColor, cfg.accentColor);
      }
      // right wing
      const rightWingStart = doorX + doorW;
      const rightWingW = (sx + b.width) - rightWingStart;
      if (rightWingW >= sideWinW + 8) {
        const rx = rightWingStart + Math.round((rightWingW - sideWinW) / 2);
        this.drawWindow(ctx, rx, sideWinY, sideWinW, sideWinH, cfg.baseColor, cfg.accentColor);
      }

      // ── Arched door ─────────────────────────────────────────
      const archR = doorW / 2;
      const archCx = doorX + archR;
      const archCy = doorY + archR;
      // Door frame
      ctx.fillStyle = cfg.accentColor;
      ctx.globalAlpha = 0.5;
      ctx.fillRect(doorX - 2, doorY + archR - 2, doorW + 4, doorH - archR + 2);
      ctx.beginPath();
      ctx.arc(archCx, archCy, archR + 2, Math.PI, 0);
      ctx.fill();
      ctx.globalAlpha = 1.0;
      // Door body
      ctx.fillStyle = cfg.doorColor;
      ctx.beginPath();
      ctx.arc(archCx, archCy, archR, Math.PI, 0);
      ctx.lineTo(doorX + doorW, doorY + doorH);
      ctx.lineTo(doorX, doorY + doorH);
      ctx.closePath();
      ctx.fill();
      // Door panel highlight
      ctx.fillStyle = 'rgba(255,255,255,0.12)';
      ctx.fillRect(doorX + 3, doorY + archR + 2, doorW - 6, doorH - archR - 8);
      // Knob
      ctx.fillStyle = '#ffd700';
      ctx.beginPath();
      ctx.arc(doorX + doorW - 4, doorY + doorH * 0.65, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // ── Building icon (centred above door) ──────────────────
      ctx.font = '14px serif';
      ctx.textAlign = 'center';
      ctx.fillText(cfg.icon, sx + b.width / 2, doorY - 3);

      // ── Clock Tower: animated clock face ────────────────────
      if (b.buildingType === BuildingType.CLOCK_TOWER) {
        const cx = sx + b.width / 2;
        const cy = sy + b.height / 2 - 6;
        ctx.fillStyle = '#fffde8';
        ctx.beginPath();
        ctx.arc(cx, cy, 11, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#444';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        // Hour markers
        ctx.strokeStyle = '#666';
        ctx.lineWidth = 1;
        for (let h = 0; h < 12; h++) {
          const a = (h / 12) * Math.PI * 2 - Math.PI / 2;
          ctx.beginPath();
          ctx.moveTo(cx + Math.cos(a) * 8, cy + Math.sin(a) * 8);
          ctx.lineTo(cx + Math.cos(a) * 10, cy + Math.sin(a) * 10);
          ctx.stroke();
        }
        // Minute hand
        const minutes = (gameTimeMs / 60000) % 60;
        const mAngle = (minutes / 60) * Math.PI * 2 - Math.PI / 2;
        ctx.strokeStyle = '#222';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(mAngle) * 8, cy + Math.sin(mAngle) * 8);
        ctx.stroke();
        // Second hand
        const seconds = (gameTimeMs / 1000) % 60;
        const sAngle = (seconds / 60) * Math.PI * 2 - Math.PI / 2;
        ctx.strokeStyle = '#cc2222';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(sAngle) * 9, cy + Math.sin(sAngle) * 9);
        ctx.stroke();
        // Center pin
        ctx.fillStyle = '#333';
        ctx.beginPath();
        ctx.arc(cx, cy, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Building name label ──────────────────────────────────
      ctx.fillStyle = 'rgba(0,0,0,0.70)';
      const labelW = Math.min(b.name.length * 6 + 10, b.width + 16);
      const labelH = 13;
      const labelX = sx + (b.width - labelW) / 2;
      const labelY = roofPeakY - labelH - 2;
      ctx.fillRect(labelX, labelY, labelW, labelH);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 9px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(b.name, sx + b.width / 2, labelY + labelH - 3, b.width + 16);
      ctx.textAlign = 'left';
    }
  }

  private drawWindow(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    wallColor: string,
    accentColor: string
  ): void {
    // Window frame (accent colour)
    ctx.fillStyle = accentColor;
    ctx.globalAlpha = 0.6;
    ctx.fillRect(x - 2, y - 2, w + 4, h + 4);
    ctx.globalAlpha = 1.0;
    // Glass pane
    ctx.fillStyle = '#c0e8ff';
    ctx.fillRect(x, y, w, h);
    // Upper pane lighter (sky reflection)
    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    ctx.fillRect(x + 1, y + 1, w - 2, Math.floor(h / 2) - 1);
    // Cross dividers
    ctx.fillStyle = wallColor;
    ctx.fillRect(x + Math.floor(w / 2) - 1, y, 2, h);
    ctx.fillRect(x, y + Math.floor(h / 2) - 1, w, 2);
    // Frame outline
    ctx.strokeStyle = 'rgba(0,0,0,0.45)';
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, w, h);
    // Window sill
    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    ctx.fillRect(x - 1, y + h, w + 2, 2);
  }
}
