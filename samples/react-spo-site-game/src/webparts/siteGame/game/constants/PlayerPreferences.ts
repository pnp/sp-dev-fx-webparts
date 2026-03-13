import { PlayerType } from '../types/IPlayer';

const LOCAL_STORAGE_KEY = 'siteGame_playerType';
const SELECTED_PLAYER_KEY = 'siteGame_playerTypeSelected';

/**
 * Manages player character type preferences via localStorage.
 * Automatically prompts user to select a player type on first visit.
 */
export class PlayerPreferences {
  /**
   * Get the saved player type from localStorage.
   * Returns null if no selection has been made yet.
   */
  // eslint-disable-next-line @rushstack/no-new-null
  static getPlayerType(): PlayerType | null {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored && (stored === 'male' || stored === 'female' || stored === 'neutral')) {
        return stored as PlayerType;
      }
    } catch {
      // localStorage not available in some environments
    }
    return null;
  }

  /**
   * Check if user has already selected a player type.
   */
  static hasSelectedPlayerType(): boolean {
    try {
      return localStorage.getItem(SELECTED_PLAYER_KEY) === 'true';
    } catch {
      return false;
    }
  }

  /**
   * Save the selected player type to localStorage.
   */
  static setPlayerType(playerType: PlayerType): void {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, playerType);
      localStorage.setItem(SELECTED_PLAYER_KEY, 'true');
    } catch {
      // localStorage not available
    }
  }

  /**
   * Reset player preferences (for testing or user choice change).
   */
  static resetPlayerType(): void {
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      localStorage.removeItem(SELECTED_PLAYER_KEY);
    } catch {
      // localStorage not available
    }
  }

  /**
   * Get the default player type (male) if none selected yet.
   */
  static getPlayerTypeOrDefault(): PlayerType {
    return this.getPlayerType() || 'male';
  }

  /**
   * Get the sprite key for a given player type.
   */
  static getSpriteKey(playerType: PlayerType): 'player_male' | 'player_female' | 'player_neutral' {
    return `player_${playerType}` as const;
  }
}
