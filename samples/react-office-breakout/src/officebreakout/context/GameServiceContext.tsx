import * as React from 'react';
import { useGameState } from '../hooks/useGameState';
import { GameState } from '../types';

interface GameServiceContextType {
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

const GameServiceContext = React.createContext<GameServiceContextType | undefined>(undefined);

interface GameServiceProviderProps {
  children: React.ReactNode;
}

export const GameServiceProvider: React.FC<GameServiceProviderProps> = ({ children }) => {
  const { gameState, actions } = useGameState();

  const contextValue: GameServiceContextType = {
    gameState,
    actions
  };

  return (
    <GameServiceContext.Provider value={contextValue}>
      {children}
    </GameServiceContext.Provider>
  );
};

export const useGameService = (): GameServiceContextType => {
  const context = React.useContext(GameServiceContext);
  
  if (context === undefined) {
    throw new Error('useGameService must be used within a GameServiceProvider');
  }
  
  return context;
};

// Export context for advanced use cases
export { GameServiceContext };