export interface IAABB {
  x: number;
  y: number;
  w: number;
  h: number;
}

import { IMapTile } from './types/IMapTile';

export class CollisionDetector {
  constructor(
    private tileMap: IMapTile[][],
    private tileSize: number
  ) {}

  public collidesWithMap(box: IAABB): boolean {
    const left = Math.floor(box.x / this.tileSize);
    const right = Math.floor((box.x + box.w - 1) / this.tileSize);
    const top = Math.floor(box.y / this.tileSize);
    const bottom = Math.floor((box.y + box.h - 1) / this.tileSize);

    for (let r = top; r <= bottom; r++) {
      for (let c = left; c <= right; c++) {
        const tile = this.tileMap[r]?.[c];
        if (!tile || !tile.walkable) return true;
      }
    }
    return false;
  }

  public overlaps(a: IAABB, b: IAABB): boolean {
    return (
      a.x < b.x + b.w &&
      a.x + a.w > b.x &&
      a.y < b.y + b.h &&
      a.y + a.h > b.y
    );
  }

  public distance(ax: number, ay: number, bx: number, by: number): number {
    const dx = ax - bx;
    const dy = ay - by;
    return Math.sqrt(dx * dx + dy * dy);
  }
}
