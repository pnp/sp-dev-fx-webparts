import * as React from 'react';
import styles from './Minesweeper.module.scss';
import { IMinesweeperProps } from './IMinesweeperProps';
import { IMinesweeperState } from './IMinesweeperState';
import Tile from '../Tile/Tile';
import { FieldType as FieldType } from '../../../../enums/FieldType';
import { Coords } from '../../../../models/Coords';
import { TileInfo } from '../../../../models/TileInfo';
import { GameStatus } from '../../../../enums/GameStatus';
import Globals from '../../../../data/Globals';
import {IconButton, Icon, Callout, Dropdown, IDropdownOption} from 'office-ui-fabric-react';
import { GameMode } from '../../../../enums/GameMode';
import { GameDifficulty } from '../../../../enums/GameDifficulty';
import { DifficultySettings } from '../../../../models/DifficultySettings';

export default class Minesweeper extends React.Component<IMinesweeperProps, IMinesweeperState> {

  //#region Init

  private _timerRef: any = null;

  constructor(props) {
    super(props);

    const settings = Globals.DifficultySettings.Beginner;
    let highScoreMs = Number(localStorage.getItem(this.getHighScoreCacheKey(settings)));
    if(highScoreMs === 0){
      highScoreMs = undefined;
    }

    let grid = this.initGrid(settings);
    
    this.state = {
      gameDifficulty: GameDifficulty.Beginner,
      gameMode: GameMode.Mine,
      gameStatus: GameStatus.Idle,
      grid,
      highScoreMs,
      nrMinesLeft: settings.nrMines,
      showHighScore: false,
      settings,
      timeMs: 0
    };
  }
  
  //#endregion

  //#region Render

  public render(): React.ReactElement<IMinesweeperProps> {
    return (
      <div className={ styles.minesweeper }>
        {this.renderGameInfo()}
        {this.renderGrid()}
        {this.state.showHighScore && <Callout target={"#minesweeper_highScore"} onDismiss={this.toggleHighScore} ><div style={{padding: '5px'}}>{isNaN(this.state.highScoreMs) ? `No high score yet` : `Best time: ${this.state.highScoreMs / 1000}s`}</div></Callout>}
      </div>
    );
  }

  private renderGameInfo(){
    return(
      <div className={`${styles.grid} ${styles.gameInfo} ${styles[`difficulty_${GameDifficulty[this.state.gameDifficulty]}`]}`} dir={'ltr'}>
        <div className={styles.row} >
          <div className={styles.col}>
          <Dropdown options={[{key: GameDifficulty.Beginner, text: 'Beginner'}, {key: GameDifficulty.Intermediate, text: 'Intermediate'}, {key: GameDifficulty.Expert, text: 'Expert'}]} onChange={(e, d) => this.selectDifficulty(e, d)} selectedKey={this.state.gameDifficulty} styles={{root: {minWidth: '150px'}}}></Dropdown>
          </div>
        </div>
        <div className={styles.row} >
          <div className={styles.col}>
            <span className={styles.gameInfoSpans} title={"Time"}>{(this.state.timeMs / 1000).toFixed(1)} <Icon iconName={'clock'}/></span>
            <span className={styles.gameInfoSpans} title={"Mines left"}>{this.state.nrMinesLeft} <Icon iconName={'StarburstSolid'}/></span>
          </div>
          <div className={styles.col} dir={'rtl'}>
            <IconButton iconProps={Globals.Icons.Reset} onClick={this.reset} title={"Reset"}/>
            <IconButton iconProps={this.state.gameStatus === GameStatus.Won ? Globals.Icons.PlayerWon : Globals.Icons.HighScore} onClick={this.toggleHighScore} id={"minesweeper_highScore"} title={"High score"}/>
            <IconButton iconProps={this.state.gameMode === GameMode.Mine ? Globals.Icons.Mine: Globals.Icons.Flag} onClick={this.toggleMode} title={this.state.gameMode === GameMode.Mine ? "Mine mode":"Flag mode"}/>
          </div>
        </div>
    </div>
    );
  }

  private renderGrid(){
    return(
        <table className={styles.table}>
          <tbody>
          {this.state.grid.map((row: TileInfo[], rowIndex) =>{
            return (
              <tr key={rowIndex}>
                {row.map((tileInfo: TileInfo, colIndex) => {
                  return (
                    <td key={`${rowIndex}_${colIndex}`}>
                      <Tile
                        tileInfo={tileInfo}
                        onClick={this.tileClick}
                        onContextMenu={this.tileRightClick}
                      />
                    </td>
                  );
                })}
              </tr>
            );
          })}
          </tbody>
        </table>
    );
  }

  //#endregion

  //#region Events

  private tileClick = (coord: Coords): void => {
    if(this.shouldDiscoverSurrounding(coord)){
      this.discoverSurrounding(coord);
    }
    else if(this.state.gameMode === GameMode.Flag){
      this.plantFlag(coord);
    }
    else{
      this.discover(coord);
    }
  }

  private tileRightClick = (coord: Coords, e: React.MouseEvent): void =>{
    e.preventDefault();

    if(this.shouldDiscoverSurrounding(coord)){
      this.discoverSurrounding(coord);
    }
    else if(this.state.gameMode === GameMode.Flag){
      this.discover(coord);
    }
    else{
      this.plantFlag(coord);
    }
  }

  private toggleMode = (): void => {
    this.setState({
      gameMode: this.state.gameMode === GameMode.Mine ? GameMode.Flag : GameMode.Mine
    });
  }

  private selectDifficulty = (e: React.FormEvent, option: IDropdownOption): void => {
    let settings = Globals.DifficultySettings.Beginner;

    switch(option.key){
      case GameDifficulty.Intermediate:
        settings = Globals.DifficultySettings.InterMediate;
        break;
      case GameDifficulty.Expert:
        settings = Globals.DifficultySettings.Expert;
        break;
    }

    let highScoreMs = Number(localStorage.getItem(this.getHighScoreCacheKey(settings)));
    if(highScoreMs === 0){
      highScoreMs = undefined;
    }

    this.setState({
      gameDifficulty: +option.key,
      highScoreMs,
      settings,
    }, () => this.reset());
  }

  private reset = (): void => {
    let executeReset = true;
    if(this.state.gameStatus === GameStatus.Playing){
      executeReset = window.confirm('Are you sure you want to reset the game?');
    }

    if(executeReset){
      clearInterval(this._timerRef);

      this.setState({
        gameStatus: GameStatus.Idle,
        timeMs: 0,
        nrMinesLeft: this.state.settings.nrMines,
        grid: this.initGrid(this.state.settings)
      });
    }
  }

  private toggleHighScore = (): void => {
    this.setState({
      showHighScore: !this.state.showHighScore
    });
  }

  private updateTimer(): void{
    this.setState({
      timeMs: this.state.timeMs + Globals.GeneralSettings.TimerIntervalMs
    });
  }

  //#endregion

  //#region Game logic

  private initGrid(settings: DifficultySettings): TileInfo[][]{
    let grid: TileInfo [][] = [];
    let minePositions: number [] = [];

    while(minePositions.length < settings.nrMines){
      let pos = this.getRandomInt(settings.rows*settings.cols);
      if(minePositions.indexOf(pos) < 0){
        minePositions.push(pos);
      }
    }

    for(let i = 0; i < settings.rows; i++){
      grid[i] = [];
      for(let j = 0; j < settings.cols; j++){
        let pos = i*settings.rows + j;
        let hasMine = minePositions.indexOf(pos) > -1;

        grid[i][j] = {coords: {row: i, col: j}, fieldType: FieldType.Unknown, hasMine};
      }
    }

    return grid;
  }

  private discover(coord: Coords){
    let grid = this.state.grid;
    let tile = grid[coord.row][coord.col];
    let highScoreMs = this.state.highScoreMs;
    let nrMinesLeft = this.state.nrMinesLeft;

    switch(this.state.gameStatus){
      case GameStatus.Idle: // first click starting the game
        while(tile.hasMine){
          grid = this.initGrid(this.state.settings);
          tile = grid[coord.row][coord.col];
        }

        this.setState({
          gameStatus: GameStatus.Playing
        }, () => this._timerRef =  setInterval(() => this.updateTimer(), Globals.GeneralSettings.TimerIntervalMs));
        break;

      case GameStatus.GameOver:
      case GameStatus.Won:
        return;
    }

    if(tile.fieldType === FieldType.Number || tile.fieldType === FieldType.Empty || tile.fieldType === FieldType.Flag){
      return;
    }


    if(tile.hasMine){
      this.gameOver(grid, tile);
      return;
    }

    let closeMines = this.getSurroundingMines(grid, coord);
    if(closeMines > 0){
      tile.closeMines = closeMines;
      tile.fieldType = FieldType.Number;
    }
    else{
      tile.fieldType = FieldType.Empty;
      this.traverseEmptyTiles(grid, coord);
    }

    let playerWon = this.checkPlayerWon(grid);

    if(playerWon){
      highScoreMs = this.playerWon();
    }
    
    this.setState({
      grid,
      gameStatus: playerWon ? GameStatus.Won : GameStatus.Playing,
      highScoreMs,
      nrMinesLeft,
      showHighScore: playerWon
    });
  }

  private plantFlag(coord: Coords){
    let grid = this.state.grid;
    let tile = grid[coord.row][coord.col];
    let nrMinesLeft = this.state.nrMinesLeft;

    if(
        this.state.gameStatus !== GameStatus.Playing ||
        (tile.fieldType !== FieldType.Unknown && tile.fieldType !== FieldType.Flag)
      )
    {
      return;
    }

    if(tile.fieldType === FieldType.Flag){
      tile.fieldType = FieldType.Unknown;
      nrMinesLeft++;
    }
    else{
      if(nrMinesLeft === 0){
        return;
      }

      tile.fieldType = FieldType.Flag;
      nrMinesLeft--;
    }

    this.setState({
      grid,
      nrMinesLeft
    });
  }

  private discoverSurrounding(coord){
    let coordsToDiscover: Coords[] = [];
    let gameOver = false;
    Globals.GeneralSettings.DeltaCoords.forEach(deltaCoord => {
      if(this.isValidCoord(coord, deltaCoord)){
        if(this.state.grid[coord.row + deltaCoord.row][coord.col + deltaCoord.col].fieldType === FieldType.Unknown){
          if(this.state.grid[coord.row + deltaCoord.row][coord.col + deltaCoord.col].hasMine){
            this.gameOver(this.state.grid, this.state.grid[coord.row + deltaCoord.row][coord.col + deltaCoord.col]);
            gameOver = true;
          }
          coordsToDiscover.push({row: coord.row + deltaCoord.row, col: coord.col + deltaCoord.col});
        }
      }
    });

    if(!gameOver){
      coordsToDiscover.forEach(c => {
        this.discover(c);
      });
    }
  }

  private traverseEmptyTiles(grid: TileInfo[][], coord: Coords){
    Globals.GeneralSettings.DeltaCoords.forEach(deltaCoord => {
      if(this.isValidCoord(coord, deltaCoord)){
        let tile = grid[coord.row + deltaCoord.row][coord.col + deltaCoord.col];
        if(tile.fieldType === FieldType.Unknown || tile.fieldType === FieldType.Flag){
          let closeMines = this.getSurroundingMines(grid, {row: coord.row + deltaCoord.row, col: coord.col + deltaCoord.col});
          if(closeMines === 0){
            tile.fieldType = FieldType.Empty;
            this.traverseEmptyTiles(grid, {row: coord.row + deltaCoord.row, col: coord.col + deltaCoord.col});
          }
          else{
            tile.fieldType = FieldType.Number;
            tile.closeMines = closeMines;
          }
        }
      }
    });
  }

  private getSurroundingMines(grid: TileInfo[][], coord: Coords): number{

    let surroundingMines = 0;

    Globals.GeneralSettings.DeltaCoords.forEach(deltaCoord => {
      if(this.isValidCoord(coord, deltaCoord)){
        if(grid[coord.row + deltaCoord.row][coord.col + deltaCoord.col].hasMine){
          surroundingMines++;
        }
      }
    });

    return surroundingMines;
  }

  private getSurroundingFlags(grid: TileInfo[][], coord: Coords): number{

    let surroundingFlags = 0;

    Globals.GeneralSettings.DeltaCoords.forEach(deltaCoord => {
      if(this.isValidCoord(coord, deltaCoord)){
        if(grid[coord.row + deltaCoord.row][coord.col + deltaCoord.col].fieldType === FieldType.Flag){
          surroundingFlags++;
        }
      }
    });

    return surroundingFlags;
  }

  private isValidCoord(coord: Coords, deltaCoord: Coords): boolean {
    let validCoords = true;

    if(coord.row + deltaCoord.row < 0 || coord.row + deltaCoord.row >= this.state.settings.rows){
      validCoords = false;
    }

    if(coord.col + deltaCoord.col < 0 || coord.col + deltaCoord.col >= this.state.settings.cols){
      validCoords = false;
    }

    return validCoords;
  }

  private shouldDiscoverSurrounding(coord: Coords): boolean{
    let grid = this.state.grid;
    let tile = grid[coord.row][coord.col];

    return tile.fieldType === FieldType.Number && this.getSurroundingMines(grid, coord) === this.getSurroundingFlags(grid, coord);
  }

  private checkPlayerWon(grid: TileInfo[][]): boolean{
    let playerWon = true;
    
    grid.forEach(row => {
      row.forEach(t => {
        if(t.fieldType === FieldType.Unknown && t.hasMine === false){
          playerWon = false;
        }
      });
    });

    return playerWon;
  }

  private playerWon(): number{
    clearInterval(this._timerRef);

    let highScoreMs = this.state.highScoreMs;
    let timeMs = this.state.timeMs;

    if(this.state.highScoreMs && this.state.highScoreMs < timeMs){
      // nothing
    }
    else{
      localStorage.setItem(this.getHighScoreCacheKey(this.state.settings), timeMs.toString());
      highScoreMs = timeMs;
    }

    return highScoreMs;
  }

  private gameOver(grid: TileInfo[][], tile: TileInfo){
    grid.forEach(row => {
      row.forEach(t => {
        if(t.hasMine && t.fieldType !== FieldType.Flag){
          t.fieldType = FieldType.Mine;
        }
        else if (!t.hasMine && t.fieldType === FieldType.Flag){
          t.fieldType = FieldType.FlagMistake;
        }
      });
    });

    tile.fieldType = FieldType.MineExploded;

    clearInterval(this._timerRef);

    this.setState({
      gameStatus: GameStatus.GameOver,
      grid
    });
  }

  //#endregion

  //#region Helpers

  private getRandomInt(max: number): number{
    return Math.floor(Math.random() * Math.floor(max));
  }

  private getHighScoreCacheKey(settings: DifficultySettings): string{
    return `${Globals.CacheKey.HighScore}_${settings.cols}x${settings.rows}`;
  }

//#endregion

}
