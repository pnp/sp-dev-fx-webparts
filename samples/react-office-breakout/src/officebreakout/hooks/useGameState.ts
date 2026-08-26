import * as React from 'react';
import { GameState, GameAction, Block } from '../types';
import { generateBlockLayout, checkBallBlockCollision, checkBallPaddleCollision, checkWallCollision, calculatePaddleBounce, calculateWallBounce, clampPaddlePosition, normalizeVelocity } from '../utils';

// Office app configurations with icon names instead of elements
interface OfficeAppConfig {
  name: string;
  iconName: string;
  color: string;
  score: number;
}

const OFFICE_APPS: OfficeAppConfig[] = [
  { name: 'Word', iconName: 'DocumentRegular', color: '#2b579a', score: 10 },
  { name: 'Excel', iconName: 'TableRegular', color: '#217346', score: 15 },
  { name: 'PowerPoint', iconName: 'VideoRegular', color: '#d24726', score: 12 },
  { name: 'Teams', iconName: 'PeopleTeamRegular', color: '#6264a7', score: 20 },
  { name: 'OneNote', iconName: 'NoteRegular', color: '#80397b', score: 8 },
  { name: 'Outlook', iconName: 'MailRegular', color: '#0078d4', score: 18 },
  { name: 'OneDrive', iconName: 'CloudRegular', color: '#0078d4', score: 14 },
  { name: 'SharePoint', iconName: 'ShareRegular', color: '#0078d4', score: 16 }
];

// Game constants
const BOARD_WIDTH = 800;
const BOARD_HEIGHT = 600;
const PADDLE_WIDTH = 120;
const PADDLE_HEIGHT = 20;
const PADDLE_SPEED = 8;
const BALL_RADIUS = 10;
const BALL_SPEED = 5;
const BLOCK_HEIGHT = 40;
const BLOCK_ROWS = 5;
const BLOCK_COLUMNS = 8;
const TOP_MARGIN = 60;
const INITIAL_LIVES = 3;

function createInitialBlocks(): Block[] {
  const blockLayouts = generateBlockLayout(BOARD_WIDTH, BOARD_HEIGHT, BLOCK_ROWS, BLOCK_COLUMNS, BLOCK_HEIGHT, TOP_MARGIN);
  
  return blockLayouts.map((layout, index) => {
    const appIndex = index % OFFICE_APPS.length;
    const app = OFFICE_APPS[appIndex];
    
    return {
      id: `block-${index}`,
      position: layout.position,
      size: layout.size,
      destroyed: false,
      icon: undefined, // Icon will be handled by Block component based on color
      color: app.color,
      score: app.score
    };
  });
}

function getInitialGameState(): GameState {
  return {
    ball: {
      position: { x: BOARD_WIDTH / 2, y: BOARD_HEIGHT - 100 },
      velocity: { x: BALL_SPEED * 0.7, y: -BALL_SPEED * 0.7 },
      radius: BALL_RADIUS
    },
    paddle: {
      position: { x: BOARD_WIDTH / 2 - PADDLE_WIDTH / 2, y: BOARD_HEIGHT - 40 },
      size: { width: PADDLE_WIDTH, height: PADDLE_HEIGHT },
      speed: PADDLE_SPEED
    },
    blocks: createInitialBlocks(),
    gameBoard: {
      width: BOARD_WIDTH,
      height: BOARD_HEIGHT,
      borderWidth: 4
    },
    score: 0,
    lives: INITIAL_LIVES,
    gameStatus: 'idle',
    level: 1
  };
}

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        gameStatus: 'running'
      };

    case 'PAUSE_GAME':
      return {
        ...state,
        gameStatus: state.gameStatus === 'running' ? 'paused' : 'running'
      };

    case 'RESUME_GAME':
      return {
        ...state,
        gameStatus: 'running'
      };

    case 'RESTART_GAME':
      return getInitialGameState();

    case 'RESET_GAME':
      return getInitialGameState();

    case 'MOVE_PADDLE': {
      const direction = action.payload?.direction || 0;
      const newX = state.paddle.position.x + direction * state.paddle.speed;
      const clampedPosition = clampPaddlePosition(
        { x: newX, y: state.paddle.position.y },
        state.paddle.size.width,
        state.gameBoard.width
      );

      return {
        ...state,
        paddle: {
          ...state.paddle,
          position: clampedPosition
        }
      };
    }

    case 'MOVE_BALL': {
      if (state.gameStatus !== 'running') {
        return state;
      }

      const newBall = { ...state.ball };
      const newBlocks = [...state.blocks];
      let newScore = state.score;
      let newLives = state.lives;
      let newGameStatus: GameState['gameStatus'] = state.gameStatus;

      // Update ball position
      newBall.position.x += newBall.velocity.x;
      newBall.position.y += newBall.velocity.y;

      // Check wall collisions
      const wallCollision = checkWallCollision(newBall, state.gameBoard.width, state.gameBoard.height);
      if (wallCollision.hasCollision && wallCollision.side) {
        newBall.velocity = calculateWallBounce(newBall.velocity, wallCollision.side);
        
        // Adjust position to prevent sticking
        if (wallCollision.side === 'left') {
          newBall.position.x = newBall.radius;
        } else if (wallCollision.side === 'right') {
          newBall.position.x = state.gameBoard.width - newBall.radius;
        } else if (wallCollision.side === 'top') {
          newBall.position.y = newBall.radius;
        }
      }

      // Check if ball fell below paddle (lose life)
      if (newBall.position.y > state.gameBoard.height + newBall.radius) {
        newLives--;
        if (newLives <= 0) {
          newGameStatus = 'gameover';
        } else {
          // Reset ball position
          newBall.position = { x: BOARD_WIDTH / 2, y: BOARD_HEIGHT - 100 };
          newBall.velocity = { x: BALL_SPEED * 0.7, y: -BALL_SPEED * 0.7 };
        }
      }

      // Check paddle collision
      const paddleCollision = checkBallPaddleCollision(newBall, state.paddle);
      if (paddleCollision.hasCollision) {
        newBall.velocity = calculatePaddleBounce(newBall, state.paddle);
        // Adjust ball position to be above paddle
        newBall.position.y = state.paddle.position.y - newBall.radius;
      }

      // Check block collisions
      for (let i = 0; i < newBlocks.length; i++) {
        const block = newBlocks[i];
        if (!block.destroyed) {
          const blockCollision = checkBallBlockCollision(newBall, block);
          if (blockCollision.hasCollision && blockCollision.side) {
            // Destroy block
            newBlocks[i] = { ...block, destroyed: true };
            newScore += block.score;
            
            // Bounce ball
            newBall.velocity = calculateWallBounce(newBall.velocity, blockCollision.side);
            
            // Normalize velocity to maintain consistent speed
            newBall.velocity = normalizeVelocity(newBall.velocity, BALL_SPEED);
            
            break; // Only handle one collision per frame
          }
        }
      }

      // Check for victory condition
      const remainingBlocks = newBlocks.filter((block: Block) => !block.destroyed);
      if (remainingBlocks.length === 0) {
        newGameStatus = 'victory';
      }

      return {
        ...state,
        ball: newBall,
        blocks: newBlocks,
        score: newScore,
        lives: newLives,
        gameStatus: newGameStatus
      };
    }

    case 'DESTROY_BLOCK': {
      const blockId = action.payload?.blockId || '';
      const newBlocks = state.blocks.map((block: Block) =>
        block.id === blockId ? { ...block, destroyed: true } : block
      );
      
      const destroyedBlock = state.blocks.filter((block: Block) => block.id === blockId)[0];
      const newScore = destroyedBlock ? state.score + destroyedBlock.score : state.score;
      
      // Check for victory condition
      const remainingBlocks = newBlocks.filter((block: Block) => !block.destroyed);
      const newGameStatus: GameState['gameStatus'] = remainingBlocks.length === 0 ? 'victory' : state.gameStatus;

      return {
        ...state,
        blocks: newBlocks,
        score: newScore,
        gameStatus: newGameStatus
      };
    }

    case 'LOSE_LIFE': {
      const newLives = state.lives - 1;
      const newGameStatus: GameState['gameStatus'] = newLives <= 0 ? 'gameover' : state.gameStatus;

      return {
        ...state,
        lives: newLives,
        gameStatus: newGameStatus,
        // Reset ball position if still alive
        ball: newLives > 0 ? {
          ...state.ball,
          position: { x: BOARD_WIDTH / 2, y: BOARD_HEIGHT - 100 },
          velocity: { x: BALL_SPEED * 0.7, y: -BALL_SPEED * 0.7 }
        } : state.ball
      };
    }

    default:
      return state;
  }
}

interface UseGameStateReturn {
  gameState: GameState;
  actions: {
    startGame: () => void;
    pauseGame: () => void;
    resumeGame: () => void;
    restartGame: () => void;
    resetGame: () => void;
    movePaddle: (direction: number) => void;
    destroyBlock: (blockId: string) => void;
    loseLife: () => void;
  };
}

export function useGameState(): UseGameStateReturn {
  const [gameState, dispatch] = React.useReducer(gameReducer, getInitialGameState());

  // Game loop
  const gameLoopRef = React.useRef<number | null>(null);
  const lastTimeRef = React.useRef<number>(0);

  const startGameLoop = React.useCallback((): void => {
    const gameLoop = (currentTime: number): void => {
      if (currentTime - lastTimeRef.current >= 16) { // ~60 FPS
        dispatch({ type: 'MOVE_BALL' });
        lastTimeRef.current = currentTime;
      }
      
      // Continue loop - let the useEffect handle stopping
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    if (gameLoopRef.current === null) {
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    }
  }, []);

  React.useEffect(() => {
    if (gameState.gameStatus === 'running') {
      startGameLoop();
    } else if (gameLoopRef.current) {
      cancelAnimationFrame(gameLoopRef.current);
      gameLoopRef.current = null;
    }

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState.gameStatus, startGameLoop]);

  const actions = {
    startGame: (): void => dispatch({ type: 'START_GAME' }),
    pauseGame: (): void => dispatch({ type: 'PAUSE_GAME' }),
    resumeGame: (): void => dispatch({ type: 'RESUME_GAME' }),
    restartGame: (): void => dispatch({ type: 'RESTART_GAME' }),
    resetGame: (): void => dispatch({ type: 'RESET_GAME' }),
    movePaddle: (direction: number): void => dispatch({ type: 'MOVE_PADDLE', payload: { direction } }),
    destroyBlock: (blockId: string): void => dispatch({ type: 'DESTROY_BLOCK', payload: { blockId } }),
    loseLife: (): void => dispatch({ type: 'LOSE_LIFE' })
  };

  return {
    gameState,
    actions
  };
}