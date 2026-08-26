import * as React from 'react';
import { GameState } from '../types';
import { Block } from './Block';
import { Paddle } from './Paddle';
import { Ball } from './Ball';
import styles from '../OfficeBreakout.module.scss';

interface GameBoardProps {
  gameState: GameState;
  ballBouncing?: boolean;
}

export const GameBoard: React.FC<GameBoardProps> = ({ gameState, ballBouncing = false }) => {
  const boardRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (boardRef.current) {
      boardRef.current.style.setProperty('--board-width', `${gameState.gameBoard.width}px`);
      boardRef.current.style.setProperty('--board-height', `${gameState.gameBoard.height}px`);
    }
  }, [gameState.gameBoard.width, gameState.gameBoard.height]);

  return (
    <div
      ref={boardRef}
      className={styles.gameBoard}
    >
      {/* Render all blocks */}
      {gameState.blocks.map((block) => (
        <Block key={block.id} block={block} />
      ))}

      {/* Render paddle */}
      <Paddle paddle={gameState.paddle} />

      {/* Render ball */}
      <Ball ball={gameState.ball} bouncing={ballBouncing} />

      {/* Game overlay for paused/game over states */}
      {(gameState.gameStatus === 'paused' || 
        gameState.gameStatus === 'gameover' || 
        gameState.gameStatus === 'victory' ||
        gameState.gameStatus === 'idle') && (
        <div className={styles.gameOverlay}>
          <div className={styles.gameOverlayTitle}>
            {gameState.gameStatus === 'idle' && 'Office Breakout'}
            {gameState.gameStatus === 'paused' && 'Paused'}
            {gameState.gameStatus === 'gameover' && 'Game Over'}
            {gameState.gameStatus === 'victory' && 'Victory!'}
          </div>
          
          <div className={styles.gameOverlaySubtitle}>
            {gameState.gameStatus === 'idle' && (
              <>
                <div>Destroy all Office app blocks!</div>
                <div>Score: {gameState.score} | Lives: {gameState.lives}</div>
              </>
            )}
            {gameState.gameStatus === 'paused' && 'Press SPACE to resume'}
            {gameState.gameStatus === 'gameover' && (
              <>
                <div>Final Score: {gameState.score}</div>
                <div>Better luck next time!</div>
              </>
            )}
            {gameState.gameStatus === 'victory' && (
              <>
                <div>Congratulations!</div>
                <div>Final Score: {gameState.score}</div>
                <div>You&apos;ve mastered all Office apps!</div>
              </>
            )}
          </div>

          {gameState.gameStatus === 'idle' && (
            <div className={styles.gameInstructions}>
              <div>🎮 Controls:</div>
              <div>← → Arrow keys or A/D to move paddle</div>
              <div>SPACE to start/pause game</div>
              <div>R to restart</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};