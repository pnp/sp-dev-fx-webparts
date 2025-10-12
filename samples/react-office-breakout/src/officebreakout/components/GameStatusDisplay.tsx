import * as React from 'react';
import { useGameService } from '../context/GameServiceContext';
import styles from '../OfficeBreakout.module.scss';

/**
 * Example component demonstrating how future subcomponents can access game state
 * directly through the GameService context without prop drilling
 */
export const GameStatusDisplay: React.FC = () => {
  const { gameState, actions } = useGameService();

  const getStatusMessage = (): string => {
    switch (gameState.gameStatus) {
      case 'idle': return 'Ready to start!';
      case 'running': return 'Game in progress...';
      case 'paused': return 'Game paused';
      case 'gameover': return 'Game Over!';
      case 'victory': return 'You Won! 🎉';
      default: return 'Unknown status';
    }
  };

  const getScoreGrade = (): string => {
    if (gameState.score < 50) return 'Beginner';
    if (gameState.score < 150) return 'Intermediate';
    if (gameState.score < 300) return 'Advanced';
    return 'Expert';
  };

  return (
    <div className={styles.gameStatusDisplay}>
      <h3>Game Status</h3>
      <div>
        <strong>Status:</strong> {getStatusMessage()}
      </div>
      <div>
        <strong>Score:</strong> {gameState.score} ({getScoreGrade()})
      </div>
      <div>
        <strong>Level:</strong> {gameState.level}
      </div>
      <div>
        <strong>Lives:</strong> {gameState.lives}/3
      </div>
      <div>
        <strong>Blocks Remaining:</strong> {gameState.blocks.filter(block => !block.destroyed).length}
      </div>
      
      {/* Example of how subcomponents can directly access game actions */}
      {gameState.gameStatus === 'gameover' && (
        <button 
          onClick={actions.restartGame}
          className={styles.quickRestartButton}
        >
          Quick Restart
        </button>
      )}
    </div>
  );
};