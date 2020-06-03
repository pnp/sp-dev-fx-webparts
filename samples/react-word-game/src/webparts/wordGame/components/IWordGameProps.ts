import { WordGameListItem } from './WordService';
import { GameState } from './WordGame';
import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IWordGameProps {
  description: string;
  enableHighScores: boolean;
  context: WebPartContext;
}

export interface IWordGameState {
  gamestate: GameState;
  currentWord: string;
  possibleAnswersText: string;
  txtAnswer: string;
  currentRound: number;
  score: number;
  lblTimer: string;
  lblMessage: string;
  highScores: WordGameListItem[];
  mobileMode: boolean;
}
