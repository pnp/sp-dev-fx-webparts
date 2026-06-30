import * as React from 'react';
import { GameServiceProvider, useGameService } from './context/GameServiceContext';
import { CanvasGameBoard } from './components/CanvasGameBoard';
import styles from './OfficeBreakout.module.scss';

interface OfficeBreakoutProps {
  className?: string;
}

// Internal game component that uses the context
const OfficeBreakoutGame: React.FC<{ className?: string }> = ({ className }) => {
  const { gameState, actions } = useGameService();
  const [ballBouncing, setBallBouncing] = React.useState(false);
  
  // Use refs for immediate key state (no React re-render delays)
  const keysPressed = React.useRef({
    left: false,
    right: false,
    space: false
  });
  
  // Move useRef to top level - MUST be outside useEffect
  const prevVelocityRef = React.useRef(gameState.ball.velocity);
  const paddleMovementRef = React.useRef<number>();

  // Handle keyboard controls
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      const key = event.key.toLowerCase();
      
      if (key === 'arrowleft' || key === 'a') {
        keysPressed.current.left = true;
        event.preventDefault();
      }
      
      if (key === 'arrowright' || key === 'd') {
        keysPressed.current.right = true;
        event.preventDefault();
      }
      
      if (key === ' ') {
        if (!keysPressed.current.space) { // Only trigger once per press
          keysPressed.current.space = true;
          // Handle space key actions immediately
          if (gameState.gameStatus === 'idle') {
            actions.startGame();
          } else if (gameState.gameStatus === 'running') {
            actions.pauseGame();
          } else if (gameState.gameStatus === 'paused') {
            actions.resumeGame();
          }
        }
        event.preventDefault();
      }
      
      if (key === 'r') {
        actions.restartGame();
        event.preventDefault();
      }
    };

    const handleKeyUp = (event: KeyboardEvent): void => {
      const key = event.key.toLowerCase();
      
      if (key === 'arrowleft' || key === 'a') {
        keysPressed.current.left = false;
      }
      
      if (key === 'arrowright' || key === 'd') {
        keysPressed.current.right = false;
      }
      
      if (key === ' ') {
        keysPressed.current.space = false;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState.gameStatus, actions]);

  // Continuous paddle movement loop for smooth controls
  React.useEffect(() => {
    const updatePaddle = (): void => {
      if (gameState.gameStatus === 'running') {
        if (keysPressed.current.left) {
          actions.movePaddle(-1);
        }
        if (keysPressed.current.right) {
          actions.movePaddle(1);
        }
      }
      paddleMovementRef.current = requestAnimationFrame(updatePaddle);
    };

    paddleMovementRef.current = requestAnimationFrame(updatePaddle);

    return () => {
      if (paddleMovementRef.current) {
        cancelAnimationFrame(paddleMovementRef.current);
      }
    };
  }, [gameState.gameStatus, actions]);

  // Handle ball bouncing animation
  React.useEffect(() => {
    let timeout: number;
    
    // Trigger bounce animation when ball collides (simplified - just when velocity changes direction significantly)
    const currentVelocity = gameState.ball.velocity;
    const prevVelocity = prevVelocityRef.current;
    
    if (Math.abs(currentVelocity.x - prevVelocity.x) > 1 || Math.abs(currentVelocity.y - prevVelocity.y) > 1) {
      setBallBouncing(true);
      timeout = window.setTimeout(() => setBallBouncing(false), 100);
    }
    
    prevVelocityRef.current = currentVelocity;

    return () => {
      if (timeout) window.clearTimeout(timeout);
    };
  }, [gameState.ball.velocity]);

  const handleStartGame = (): void => {
    actions.startGame();
  };

  const handlePauseGame = (): void => {
    actions.pauseGame();
  };

  const handleRestartGame = (): void => {
    actions.restartGame();
  };

  return (
    <div className={`${styles.gameContainer} ${className || ''}`}>
      <h1 className={styles.gameTitle}>🎮 Office Breakout</h1>
      
      <div className={styles.gameInfo}>
        <div className={styles.score}>
          <span>Score: {gameState.score}</span>
        </div>
        <div>Level: {gameState.level}</div>
        <div className={styles.lives}>
          <span>Lives: {gameState.lives}</span>
          <span>{
            gameState.lives >= 1 ? '❤️' : '🖤'
          }{
            gameState.lives >= 2 ? '❤️' : '🖤'
          }{
            gameState.lives >= 3 ? '❤️' : '🖤'
          }</span>
        </div>
      </div>

      {/* Canvas-based game board for smooth 60fps gameplay */}
      <CanvasGameBoard gameState={gameState} ballBouncing={ballBouncing} />

      <div className={styles.gameControls}>
        {gameState.gameStatus === 'idle' && (
          <button 
            className={styles.gameButton} 
            onClick={handleStartGame}
            type="button"
          >
            Start Game
          </button>
        )}
        
        {gameState.gameStatus === 'running' && (
          <button 
            className={`${styles.gameButton} ${styles.pauseButton}`} 
            onClick={handlePauseGame}
            type="button"
          >
            Pause
          </button>
        )}
        
        {gameState.gameStatus === 'paused' && (
          <button 
            className={styles.gameButton} 
            onClick={handlePauseGame}
            type="button"
          >
            Resume
          </button>
        )}
        
        {(gameState.gameStatus === 'gameover' || gameState.gameStatus === 'victory') && (
          <button 
            className={styles.gameButton} 
            onClick={handleRestartGame}
            type="button"
          >
            Play Again
          </button>
        )}
        
        <button 
          className={`${styles.gameButton} ${styles.resetButton}`} 
          onClick={handleRestartGame}
          type="button"
        >
          Restart
        </button>
      </div>

      {gameState.gameStatus === 'idle' && (
        <div className={styles.gameInstructions} />
      )}
    </div>
  );
};

// Main component that provides the game service context
export const OfficeBreakout: React.FC<OfficeBreakoutProps> = ({ className }) => {
  return (
    <GameServiceProvider>
      <OfficeBreakoutGame className={className} />
    </GameServiceProvider>
  );
};