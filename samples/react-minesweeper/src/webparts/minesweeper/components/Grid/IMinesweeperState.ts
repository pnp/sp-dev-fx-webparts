import { TileInfo } from "../../../../models/TileInfo";
import { GameStatus } from "../../../../enums/GameStatus";
import { GameMode } from "../../../../enums/GameMode";
import { GameDifficulty } from "../../../../enums/GameDifficulty";
import { DifficultySettings } from "../../../../models/DifficultySettings";

export interface IMinesweeperState {
    gameDifficulty: GameDifficulty;
    gameMode: GameMode;
    gameStatus: GameStatus;
    grid: TileInfo [] [];
    highScoreMs: number;
    nrMinesLeft: number;
    showHighScore: boolean;
    settings: DifficultySettings;
    timeMs: number;
  }