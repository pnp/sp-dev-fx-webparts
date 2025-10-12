import * as React from 'react';

export interface Position {
  x: number;
  y: number;
}

export interface Velocity {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface Ball {
  position: Position;
  velocity: Velocity;
  radius: number;
}

export interface Paddle {
  position: Position;
  size: Size;
  speed: number;
}

export interface Block {
  id: string;
  position: Position;
  size: Size;
  destroyed: boolean;
  icon: React.ReactElement | undefined;
  color: string;
  score: number;
}

export interface GameBoard {
  width: number;
  height: number;
  borderWidth: number;
}

export interface GameState {
  ball: Ball;
  paddle: Paddle;
  blocks: Block[];
  gameBoard: GameBoard;
  score: number;
  lives: number;
  gameStatus: 'idle' | 'running' | 'paused' | 'gameover' | 'victory';
  level: number;
}

export interface GameAction {
  type: 'MOVE_PADDLE' | 'MOVE_BALL' | 'DESTROY_BLOCK' | 'LOSE_LIFE' | 'START_GAME' | 'PAUSE_GAME' | 'RESUME_GAME' | 'RESTART_GAME' | 'RESET_GAME';
  payload?: {
    direction?: number;
    blockId?: string;
  };
}

export interface KeyboardControls {
  left: boolean;
  right: boolean;
  space: boolean;
}

export interface CollisionResult {
  hasCollision: boolean;
  side?: 'top' | 'bottom' | 'left' | 'right';
}

export interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Circle {
  x: number;
  y: number;
  radius: number;
}

export interface OfficeApp {
  name: string;
  icon: React.ReactElement;
  color: string;
  score: number;
}