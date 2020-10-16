import { DifficultySettings } from "../models/DifficultySettings";
import { IIconProps } from "office-ui-fabric-react";
import { Coords } from "../models/Coords";

export default abstract class Globals {
    public static CacheKey = class {
        public static readonly HighScore = 'MinesweeperHighScore';
    };

    public static DifficultySettings = class {
        public static readonly Beginner: DifficultySettings = {rows: 8, cols: 8, nrMines: 10};
        public static readonly InterMediate: DifficultySettings = {rows: 16, cols: 16, nrMines: 40};
        public static readonly Expert: DifficultySettings = {rows: 16, cols: 30, nrMines: 99}; 
    };

    public static GeneralSettings = class{
        public static readonly TimerIntervalMs: number = 100;
        public static readonly DeltaCoords: Coords[] = [
            {row:-1, col:-1},
            {row:0, col:-1},
            {row:1, col:-1},
            {row:-1, col:0},
            {row:1, col:0},
            {row:1, col:1},
            {row:0, col:1},
            {row:-1, col:1}
          ];
    };

    public static Icons = class {
        public static readonly Flag: IIconProps = { iconName: 'IconSetsFlag' };
        public static readonly HighScore: IIconProps = { iconName: 'FavoriteStarFill' };
        public static readonly Mine: IIconProps = { iconName: 'StarBurstSolid' };
        public static readonly PlayerWon: IIconProps = { iconName: 'CheckMark' };
        public static readonly Reset: IIconProps = { iconName: 'Refresh' };
    };
}