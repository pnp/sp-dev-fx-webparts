import { IGameState } from './types/IGameState';
import { IInfoTarget } from './types/IInfoTarget';
import { IBuilding } from './types/IBuilding';
import { INPC, NPCFacing } from './types/INPC';
import { PlayerType } from './types/IPlayer';
import { GameConfig } from './constants/GameConfig';
import { PlayerPreferences } from './constants/PlayerPreferences';
import { CollisionDetector, IAABB } from './CollisionDetector';
import { InputController } from './InputController';
import { TileRenderer } from './rendering/TileRenderer';
import { BuildingRenderer } from './rendering/BuildingRenderer';
import { CharacterRenderer } from './rendering/CharacterRenderer';
import { UIRenderer } from './rendering/UIRenderer';
import { CharacterSelectRenderer } from './rendering/CharacterSelectRenderer';
import { GameTheme, getThemePalette } from './constants/GameThemes';
import { SoundEngine } from './audio/SoundEngine';
import { IUfo } from './types/IUfo';
import { renderSprite } from './rendering/Sprites';

function clamp(v: number, min: number, max: number): number {
  return Math.min(Math.max(v, min), max);
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function randomBetween(rng: () => number, min: number, max: number): number {
  return min + rng() * (max - min);
}

function seededRandom(seed: number): () => number {
  let s = Math.abs(seed) || 1;
  return function (): number {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

export class GameEngine {
  private animFrameId = 0;
  private lastTimestamp = 0;
  private gameTimeMs = 0;
  private ctx: CanvasRenderingContext2D;
  private input: InputController;
  private collision: CollisionDetector;
  private tileRenderer = new TileRenderer();
  private buildingRenderer = new BuildingRenderer();
  private characterRenderer = new CharacterRenderer();
  private uiRenderer = new UIRenderer();
  private characterSelectRenderer = new CharacterSelectRenderer();
  private activeTheme: GameTheme = 'village';
  private soundEngine = new SoundEngine();
  private showingCharacterSelect = !PlayerPreferences.hasSelectedPlayerType();
  private currentInfoTarget: IInfoTarget | null = null;
  private proximityTarget: IBuilding | INPC | undefined = undefined;
  private mouseMoveTarget: { x: number; y: number } | null = null;
  private clickedBuildingTarget: IBuilding | null = null;
  private discoveredEggs = new Set<string>();
  private discoveredBuildings = new Set<string>();
  private discoveredUsers = new Set<string>();
  private discoveredM365Eggs = new Set<string>();
  private totalEggs = 0;
  private totalBuildings = 0;
  private totalUsers = 0;
  private totalM365Eggs = 0;
  private npcRngs: Map<string, () => number> = new Map();
  private enableUfoAbductions = false;
  private ufo: IUfo | null = null;
  private ufoTimerMs = 0;
  private ufoRng = seededRandom(777);

  constructor(
    private canvas: HTMLCanvasElement,
    private state: IGameState,
    private onInfoTarget: (target: IInfoTarget | null) => void,
    private onEggDiscovered: (eggId: string, name: string) => void,
    private onCharacterSelected?: (playerType: PlayerType) => void
  ) {
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas 2D context unavailable');
    this.ctx = ctx;
    this.input = new InputController(window, canvas);
    this.collision = new CollisionDetector(state.tileMap, GameConfig.TILE_SIZE);

    // Pre-seed per-NPC rngs
    state.npcs.forEach((npc, idx) => {
      this.npcRngs.set(npc.id, seededRandom(idx * 1337 + 42));
    });

    // Cache totals for score display
    this.totalEggs = state.npcs.filter(n => n.kind === 'easteregg').length;
    this.totalM365Eggs = state.npcs.filter(n => n.kind === 'm365egg').length;
    this.totalBuildings = state.buildings.length;
    this.totalUsers = state.npcs.filter(n => n.kind === 'user').length;
  }

  public start(): void {
    this.lastTimestamp = performance.now();
    this.animFrameId = requestAnimationFrame(this.loop);
  }

  public stop(): void {
    cancelAnimationFrame(this.animFrameId);
    // NOTE: input is NOT disposed here — keyboard listeners stay active for resume
  }

  public destroy(): void {
    cancelAnimationFrame(this.animFrameId);
    this.input.dispose();
    this.soundEngine.dispose();
  }

  public setTheme(theme: GameTheme): void {
    this.activeTheme = theme;
  }

  public setSoundEnabled(enabled: boolean): void {
    this.soundEngine.setEnabled(enabled);
  }

  public setUfoAbductions(enabled: boolean): void {
    this.enableUfoAbductions = enabled;
    if (!enabled) {
      if (this.ufo?.targetNpc && this.ufo.phase !== 'approaching') {
        const npc = this.ufo.targetNpc;
        if (this.ufo.dropX && this.ufo.dropY) {
          npc.x = this.ufo.dropX;
          npc.y = this.ufo.dropY;
        } else {
          npc.y = this.ufo.npcOriginalY;
        }
        npc.vx = 0;
        npc.vy = 0;
        npc.pauseTimer = 500;
      }
      this.ufo = null;
      this.ufoTimerMs = 0;
    } else {
      this.ufoTimerMs = randomBetween(this.ufoRng,
        GameConfig.UFO_FIRST_DELAY_MIN_MS,
        GameConfig.UFO_FIRST_DELAY_MAX_MS);
    }
  }

  /** Called when the InfoPanel is dismissed externally (X button / light dismiss) so
   *  the engine knows to allow re-opening the same target on next interact. */
  public clearInfoTarget(): void {
    this.currentInfoTarget = null;
  }

  public resizeViewport(w: number, h: number): void {
    this.state.camera.viewportW = w;
    this.state.camera.viewportH = h;
    this.canvas.width = w;
    this.canvas.height = h;
  }

  private loop = (timestamp: number): void => {
    const delta = Math.min(timestamp - this.lastTimestamp, GameConfig.DELTA_CAP_MS);
    this.lastTimestamp = timestamp;
    this.gameTimeMs += delta;
    this.update(delta);
    this.render();
    this.animFrameId = requestAnimationFrame(this.loop);
  };

  private update(delta: number): void {
    const input = this.input.getSnapshot();

    // ── Handle character selection screen ──────────────────────────────────────
    if (this.showingCharacterSelect) {
      if (input.mouseClick) {
        // Check which character was clicked
        const charType = this.characterSelectRenderer.getCharacterAtMouse(
          input.mouseClick.x,
          input.mouseClick.y
        );
        if (charType) {
          this.characterSelectRenderer.selectType(charType);
          // Auto-confirm on click
          const selectedType = this.characterSelectRenderer.getSelectedType();
          if (selectedType) {
            PlayerPreferences.setPlayerType(selectedType);
            this.showingCharacterSelect = false;
            this.state.player.playerType = selectedType;
            this.state.player.spriteKey = PlayerPreferences.getSpriteKey(selectedType);
            this.onCharacterSelected?.(selectedType);
          }
        }
      }

      // Check for interact (Enter) key to cycle selection or confirm
      if (input.interact) {
        const currentType = this.characterSelectRenderer.getSelectedType();
        if (currentType) {
          // Confirm selection
          PlayerPreferences.setPlayerType(currentType);
          this.showingCharacterSelect = false;
          this.state.player.playerType = currentType;
          this.state.player.spriteKey = PlayerPreferences.getSpriteKey(currentType);
          this.onCharacterSelected?.(currentType);
        } else {
          // Select first option if none selected
          this.characterSelectRenderer.selectType('male');
        }
      }

      return; // Don't update game while selecting character
    }

    // ── Handle mouse click ─────────────────────────────────────────────────────
    if (input.mouseClick) {
      const cam = this.state.camera;
      const worldX = input.mouseClick.x + cam.x;
      const worldY = input.mouseClick.y + cam.y;

      // Check if click is on a building
      let clickedBuilding: IBuilding | undefined = undefined;
      for (const b of this.state.buildings) {
        if (
          worldX >= b.x &&
          worldX <= b.x + b.width &&
          worldY >= b.y &&
          worldY <= b.y + b.height
        ) {
          clickedBuilding = b;
          break;
        }
      }

      if (clickedBuilding) {
        // Set target to building center
        this.mouseMoveTarget = {
          x: clickedBuilding.x + clickedBuilding.width / 2,
          y: clickedBuilding.y + clickedBuilding.height / 2,
        };
        this.clickedBuildingTarget = clickedBuilding;
      } else {
        // Set target to clicked position
        this.mouseMoveTarget = { x: worldX, y: worldY };
        this.clickedBuildingTarget = null;
      }
    }

    // ── Player movement ───────────────────────────────────────────────────────
    const p = this.state.player;
    const s = p.speed;
    const ts = GameConfig.TILE_SIZE;

    let dvx = 0;
    let dvy = 0;

    // If there's a mouse move target, move towards it instead of keyboard
    if (this.mouseMoveTarget) {
      const dx = this.mouseMoveTarget.x - p.x;
      const dy = this.mouseMoveTarget.y - p.y;
      const distToTarget = Math.sqrt(dx * dx + dy * dy);

      // If reached target (within a small threshold), clear it
      if (distToTarget < 10) {
        this.mouseMoveTarget = null;
      } else {
        // Move towards target
        dvx = dx / distToTarget;
        dvy = dy / distToTarget;
      }
    } else {
      // Use keyboard input if no mouse target
      if (input.up) dvy = -1;
      else if (input.down) dvy = 1;
      if (input.left) dvx = -1;
      else if (input.right) dvx = 1;

      // Normalise diagonal
      if (dvx !== 0 && dvy !== 0) {
        const inv = 1 / Math.SQRT2;
        dvx *= inv;
        dvy *= inv;
      }
    }

    p.vx = dvx * s;
    p.vy = dvy * s;

    if (p.vx < 0) p.facing = 'left';
    else if (p.vx > 0) p.facing = 'right';
    else if (p.vy < 0) p.facing = 'up';
    else if (p.vy > 0) p.facing = 'down';

    const hitbox: IAABB = { x: 0, y: 0, w: ts - 12, h: ts - 12 };

    // X movement
    const newX = p.x + p.vx * (delta / 1000);
    hitbox.x = newX - hitbox.w / 2;
    hitbox.y = p.y - hitbox.h / 2;
    if (!this.collision.collidesWithMap(hitbox)) {
      p.x = clamp(newX, ts, (this.state.mapCols - 1) * ts);
    } else {
      p.vx = 0;
    }

    // Y movement
    const newY = p.y + p.vy * (delta / 1000);
    hitbox.x = p.x - hitbox.w / 2;
    hitbox.y = newY - hitbox.h / 2;
    if (!this.collision.collidesWithMap(hitbox)) {
      p.y = clamp(newY, ts, (this.state.mapRows - 1) * ts);
    } else {
      p.vy = 0;
    }

    // Footstep sound
    if (Math.abs(p.vx) > 0.01 || Math.abs(p.vy) > 0.01) {
      this.soundEngine.tickFootstep(this.gameTimeMs);
    }

    // ── NPC movement ─────────────────────────────────────────────────────────
    for (const npc of this.state.npcs) {
      if (npc.spriteKey === 'campfire') continue; // static
      if (this.ufo?.targetNpc === npc && this.ufo.phase !== 'approaching') continue;

      const rng = this.npcRngs.get(npc.id)!;
      const distToPlayer = this.collision.distance(npc.x, npc.y, p.x, p.y);
      const nearPlayer = distToPlayer < GameConfig.PROXIMITY_RADIUS;

      if (nearPlayer) {
        // Face player
        const dx = p.x - npc.x;
        const dy = p.y - npc.y;
        npc.facing = Math.abs(dx) > Math.abs(dy)
          ? (dx > 0 ? 'right' : 'left')
          : (dy > 0 ? 'down' : 'up');
        npc.vx = 0;
        npc.vy = 0;
      } else {
        const npcSpeed = GameConfig.NPC_SPEED * npc.speedMultiplier;
        const isEasterEgg = npc.kind === 'easteregg';

        if (npc.pauseTimer > 0) {
          // ── Pausing: stay still, count down ──────────────────────────────
          npc.pauseTimer -= delta;
          npc.vx = 0;
          npc.vy = 0;
          if (npc.pauseTimer <= 0) {
            // Pause just ended — pick direction and start walking immediately
            const dirs: Array<[number, number, NPCFacing]> = isEasterEgg
              ? [
                  [-npcSpeed, 0, 'left'],
                  [npcSpeed, 0, 'right'],
                ]
              : [
                  [0, -npcSpeed, 'up'],
                  [0, npcSpeed, 'down'],
                  [-npcSpeed, 0, 'left'],
                  [npcSpeed, 0, 'right'],
                ];
            const [newVx, newVy, newFacing] = dirs[Math.floor(rng() * dirs.length)];
            npc.vx = newVx;
            npc.vy = newVy;
            npc.facing = newFacing;
            npc.walkTimer = randomBetween(rng, GameConfig.WALK_DURATION_MIN_MS, GameConfig.WALK_DURATION_MAX_MS);
          }
        } else {
          // ── Walking: count down, then enter pause ─────────────────────────
          npc.walkTimer -= delta;
          if (npc.walkTimer <= 0) {
            npc.vx = 0;
            npc.vy = 0;
            npc.walkTimer = 0;
            npc.pauseTimer = randomBetween(rng, GameConfig.PAUSE_DURATION_MIN_MS, GameConfig.PAUSE_DURATION_MAX_MS);
          }
        }

        // Apply velocity (zero while pausing, set while walking)
        const maxW = (this.state.mapCols - 1) * GameConfig.TILE_SIZE;
        const maxH = (this.state.mapRows - 1) * GameConfig.TILE_SIZE;
        const npcHitbox: IAABB = { x: npc.x + npc.vx * (delta / 1000) - 10, y: npc.y - 10, w: 20, h: 20 };
        if (!this.collision.collidesWithMap(npcHitbox)) {
          npc.x = clamp(npc.x + npc.vx * (delta / 1000), ts, maxW);
        } else {
          npc.vx = 0;
          npc.walkTimer = 0;
          npc.pauseTimer = randomBetween(rng, GameConfig.PAUSE_DURATION_MIN_MS, GameConfig.PAUSE_DURATION_MAX_MS);
        }
        const npcHitboxY: IAABB = { x: npc.x - 10, y: npc.y + npc.vy * (delta / 1000) - 10, w: 20, h: 20 };
        if (!this.collision.collidesWithMap(npcHitboxY)) {
          npc.y = clamp(npc.y + npc.vy * (delta / 1000), ts, maxH);
        } else {
          npc.vy = 0;
          npc.walkTimer = 0;
          npc.pauseTimer = randomBetween(rng, GameConfig.PAUSE_DURATION_MIN_MS, GameConfig.PAUSE_DURATION_MAX_MS);
        }
      }
    }

    // ── UFO logic ─────────────────────────────────────────────────────────────
    this.updateUfo(delta);

    // ── Camera lerp ───────────────────────────────────────────────────────────
    const cam = this.state.camera;
    const targetCamX = p.x - cam.viewportW / 2;
    const targetCamY = p.y - cam.viewportH / 2;
    const worldW = this.state.mapCols * GameConfig.TILE_SIZE;
    const worldH = this.state.mapRows * GameConfig.TILE_SIZE;
    cam.x = clamp(lerp(cam.x, targetCamX, GameConfig.CAMERA_LERP), 0, worldW - cam.viewportW);
    cam.y = clamp(lerp(cam.y, targetCamY, GameConfig.CAMERA_LERP), 0, worldH - cam.viewportH);

    // ── Proximity / interaction ───────────────────────────────────────────────
    this.checkProximity(input.interact, input.escape);
  }

  private checkProximity(interact: boolean, escape: boolean): void {
    if (escape) {
      if (this.currentInfoTarget !== null) {
        this.currentInfoTarget = null;
        this.onInfoTarget(null);
      }
      this.clickedBuildingTarget = null; // Clear clicked target on escape
      return;
    }

    // Find nearest entity within interact radius
    let nearest: IBuilding | INPC | undefined = undefined;
    let nearestDist = Infinity;
    const p = this.state.player;

    for (const b of this.state.buildings) {
      const bCx = b.x + b.width / 2;
      const bCy = b.y + b.height / 2;
      const d = this.collision.distance(p.x, p.y, bCx, bCy);
      if (d < GameConfig.PROXIMITY_RADIUS && d < nearestDist) {
        nearestDist = d;
        nearest = b;
      }
    }

    for (const npc of this.state.npcs) {
      if (this.ufo?.targetNpc === npc && this.ufo.phase !== 'approaching') continue;
      const d = this.collision.distance(p.x, p.y, npc.x, npc.y);
      if (d < GameConfig.PROXIMITY_RADIUS && d < nearestDist) {
        nearestDist = d;
        nearest = npc;
      }
    }

    this.proximityTarget = nearest;

    // Auto-interact when player reaches clicked building
    if (
      this.clickedBuildingTarget &&
      nearest === this.clickedBuildingTarget &&
      nearestDist < GameConfig.INTERACT_RADIUS
    ) {
      interact = true; // Auto-trigger interaction
      this.clickedBuildingTarget = null; // Clear after auto-interact
    }

    if (interact && nearest !== undefined) {
      let newTarget: IInfoTarget;
      if ('listId' in nearest) {
        newTarget = { kind: 'building', data: nearest as IBuilding };
        // Record building visit for Site score
        this.discoveredBuildings.add(nearest.id);
      } else {
        const npc = nearest as INPC;
        newTarget = { kind: 'npc', data: npc };
        // Record easter egg discovery
        if (npc.kind === 'easteregg' && !this.discoveredEggs.has(npc.id)) {
          this.discoveredEggs.add(npc.id);
          this.onEggDiscovered(npc.id, npc.name);
          this.soundEngine.playEggDiscovery();
        }
        if (npc.kind === 'm365egg' && !this.discoveredM365Eggs.has(npc.id)) {
          this.discoveredM365Eggs.add(npc.id);
          this.onEggDiscovered(npc.id, npc.name);
          this.soundEngine.playEggDiscovery();
        }
        // Record user NPC conversation for Site score
        if (npc.kind === 'user') {
          this.discoveredUsers.add(npc.id);
        }
      }

      const prev = this.currentInfoTarget;
      const changed =
        prev === null ||
        prev.kind !== newTarget.kind ||
        prev.data.id !== newTarget.data.id;

      if (changed) {
        this.currentInfoTarget = newTarget;
        this.onInfoTarget(newTarget);
      }
    }
  }

  private render(): void {
    const { ctx, state, gameTimeMs } = this;
    const { camera, tileMap, buildings, npcs, player, mapRows, mapCols } = state;

    ctx.clearRect(0, 0, camera.viewportW, camera.viewportH);

    // Background colour from active theme
    const palette = getThemePalette(this.activeTheme);
    ctx.fillStyle = palette.background;
    ctx.fillRect(0, 0, camera.viewportW, camera.viewportH);

    // Always render game world (unless character select is shown)
    if (!this.showingCharacterSelect) {
      this.tileRenderer.render(palette, ctx, camera, tileMap);
      this.buildingRenderer.render(ctx, camera, buildings, gameTimeMs);
      const ufoNpcId = this.ufo?.targetNpc && this.ufo.phase !== 'approaching' ? this.ufo.targetNpc.id : undefined;
      this.characterRenderer.render(ctx, camera, player, npcs, gameTimeMs, ufoNpcId);
      this.renderUfo();
      this.uiRenderer.render(
        palette,
        ctx,
        camera,
        player,
        npcs,
        buildings,
        gameTimeMs,
        this.proximityTarget,
        this.discoveredEggs,
        this.discoveredBuildings,
        this.discoveredUsers,
        this.discoveredM365Eggs,
        this.totalEggs,
        this.totalBuildings,
        this.totalUsers,
        this.totalM365Eggs,
        gameTimeMs < GameConfig.HUD_FADE_TIME_MS,
        mapRows,
        mapCols,
        tileMap
      );
    }

    // Character selection overlay (rendered on top)
    if (this.showingCharacterSelect) {
      this.characterSelectRenderer.render(ctx, camera.viewportW, camera.viewportH);
    }
  }

  // ── UFO methods ───────────────────────────────────────────────────────────

  private spawnUfo(): void {
    const direction: 1 | -1 = this.ufoRng() > 0.5 ? 1 : -1;
    const ts = GameConfig.TILE_SIZE;
    const altitudeY = GameConfig.UFO_ALTITUDE_ROW * ts + ts / 2;
    const startX = direction === 1 ? -48 : this.state.mapCols * ts + 48;

    const eligible = this.state.npcs.filter(n => n.spriteKey !== 'campfire');

    if (eligible.length === 0) {
      this.ufo = {
        x: startX, y: altitudeY, direction, phase: 'approaching',
        targetNpc: null, pickupX: (this.state.mapCols * ts) / 2,
        dropX: 0, dropY: 0, lerpTimer: 0, npcOriginalY: 0,
      };
      return;
    }

    const npc = eligible[Math.floor(this.ufoRng() * eligible.length)];
    const pickupX = npc.x;
    const pickupTileCol = Math.floor(npc.x / ts);
    const pickupTileRow = Math.floor(npc.y / ts);

    const candidates: Array<{ col: number; row: number }> = [];
    for (let row = 0; row < this.state.mapRows; row++) {
      for (let col = 0; col < this.state.mapCols; col++) {
        if (!this.state.tileMap[row][col].walkable) continue;
        const dist = Math.sqrt((col - pickupTileCol) ** 2 + (row - pickupTileRow) ** 2);
        if (dist < GameConfig.UFO_DROP_MIN_TILE_DISTANCE) continue;
        const dropWorldX = col * ts + ts / 2;
        if (direction === 1 && dropWorldX <= pickupX) continue;
        if (direction === -1 && dropWorldX >= pickupX) continue;
        candidates.push({ col, row });
      }
    }

    if (candidates.length === 0) {
      this.ufo = {
        x: startX, y: altitudeY, direction, phase: 'approaching',
        targetNpc: null, pickupX: (this.state.mapCols * ts) / 2,
        dropX: 0, dropY: 0, lerpTimer: 0, npcOriginalY: 0,
      };
      return;
    }

    const drop = candidates[Math.floor(this.ufoRng() * candidates.length)];
    this.ufo = {
      x: startX, y: altitudeY, direction, phase: 'approaching',
      targetNpc: npc, pickupX,
      dropX: drop.col * ts + ts / 2, dropY: drop.row * ts + ts / 2,
      lerpTimer: 0, npcOriginalY: npc.y,
    };
  }

  private updateUfo(delta: number): void {
    if (!this.enableUfoAbductions) return;

    if (!this.ufo) {
      this.ufoTimerMs -= delta;
      if (this.ufoTimerMs <= 0) {
        this.spawnUfo();
      }
      return;
    }

    const ufo = this.ufo;
    const ts = GameConfig.TILE_SIZE;
    const speed = GameConfig.UFO_SPEED * ufo.direction * (delta / 1000);

    switch (ufo.phase) {
      case 'approaching': {
        ufo.x += speed;
        const passed = ufo.direction === 1 ? ufo.x >= ufo.pickupX : ufo.x <= ufo.pickupX;
        if (passed) {
          if (ufo.targetNpc) {
            ufo.phase = 'picking-up';
            ufo.lerpTimer = 0;
            ufo.pickupX = ufo.targetNpc.x;
            ufo.npcOriginalY = ufo.targetNpc.y;
          } else {
            ufo.phase = 'departing';
          }
        }
        break;
      }

      case 'picking-up': {
        ufo.x += speed;
        ufo.lerpTimer += delta;
        const t = clamp(ufo.lerpTimer / GameConfig.UFO_LERP_DURATION_MS, 0, 1);
        const npc = ufo.targetNpc!;
        npc.y = lerp(ufo.npcOriginalY, ufo.y, t);
        npc.x = ufo.x;
        npc.vx = 0;
        npc.vy = 0;
        if (t >= 1) {
          ufo.phase = 'carrying';
          npc.facing = ufo.direction === 1 ? 'right' : 'left';
        }
        break;
      }

      case 'carrying': {
        ufo.x += speed;
        const npc = ufo.targetNpc!;
        npc.x = ufo.x;
        npc.y = ufo.y;
        const passedDrop = ufo.direction === 1 ? ufo.x >= ufo.dropX : ufo.x <= ufo.dropX;
        if (passedDrop) {
          ufo.phase = 'dropping';
          ufo.lerpTimer = 0;
        }
        break;
      }

      case 'dropping': {
        ufo.x += speed;
        ufo.lerpTimer += delta;
        const t = clamp(ufo.lerpTimer / GameConfig.UFO_LERP_DURATION_MS, 0, 1);
        const npc = ufo.targetNpc!;
        npc.x = ufo.dropX;
        npc.y = lerp(ufo.y, ufo.dropY, t);
        if (t >= 1) {
          npc.x = ufo.dropX;
          npc.y = ufo.dropY;
          npc.vx = 0;
          npc.vy = 0;
          npc.pauseTimer = 500;
          ufo.phase = 'departing';
        }
        break;
      }

      case 'departing': {
        ufo.x += speed;
        const mapW = this.state.mapCols * ts;
        if (ufo.x < -100 || ufo.x > mapW + 100) {
          ufo.phase = 'done';
        }
        break;
      }

      case 'done': {
        this.ufo = null;
        this.ufoTimerMs = randomBetween(this.ufoRng,
          GameConfig.UFO_REPEAT_DELAY_MIN_MS,
          GameConfig.UFO_REPEAT_DELAY_MAX_MS);
        break;
      }
    }
  }

  private renderUfo(): void {
    if (!this.ufo) return;

    const ufo = this.ufo;
    const cam = this.state.camera;
    const ts = GameConfig.TILE_SIZE;
    const ctx = this.ctx;

    const ufoSx = Math.round(ufo.x - cam.x - 24);
    const ufoSy = Math.round(ufo.y - cam.y - 12);

    if (ufoSx > cam.viewportW + 100 || ufoSx < -100) return;

    if (ufo.targetNpc && (ufo.phase === 'picking-up' || ufo.phase === 'carrying' || ufo.phase === 'dropping')) {
      const npc = ufo.targetNpc;
      const npcSx = Math.round(npc.x - cam.x - ts / 2);
      // During carrying, beam extends to ground level (npcOriginalY), not current NPC y
      const beamBottomY = ufo.phase === 'carrying' ? ufo.npcOriginalY : npc.y;
      const beamSy = Math.round(beamBottomY - cam.y);

      ctx.save();
      ctx.globalAlpha = 0.22;
      ctx.fillStyle = '#88ccff';
      ctx.beginPath();
      ctx.moveTo(ufoSx + 16, ufoSy + 21);
      ctx.lineTo(ufoSx + 32, ufoSy + 21);
      ctx.lineTo(npcSx + ts, beamSy);
      ctx.lineTo(npcSx, beamSy);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    renderSprite(ctx, 'ufo', ufoSx, ufoSy, false);

    if (ufo.targetNpc && ufo.phase !== 'approaching' && ufo.phase !== 'done') {
      const npc = ufo.targetNpc;
      const npcSx = Math.round(npc.x - cam.x - ts / 2);
      const npcSy = Math.round(npc.y - cam.y - ts);
      const flip = npc.facing === 'left';
      renderSprite(ctx, npc.spriteKey, npcSx, npcSy, flip);
    }
  }
}
