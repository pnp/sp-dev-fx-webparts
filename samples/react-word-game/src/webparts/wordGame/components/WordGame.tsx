import * as React from 'react';
import styles from './WordGame.module.scss';
import { IWordGameProps, IWordGameState } from './IWordGameProps';
import { escape, round } from '@microsoft/sp-lodash-subset';
import { WordService, Game } from './WordService';
import { Ref } from 'react';
import { WordGameListItem } from './WordService';
import WordHighScores from './WordHighScores';
const logo: any = require('../assets/ajax-loader.gif');
require('./anims.css');

export enum GameState {
  Title,
  GameLoading,
  GamePlaying,
  GameFinished
}

export default class WordGame extends React.Component<IWordGameProps, IWordGameState> {

  wordService: WordService = new WordService();
  currentGame: Game;
  timerInterval: number = -1;
  numTimer: number;

  state: IWordGameState =
    {
      gamestate: GameState.GameLoading,
      currentWord: '',
      possibleAnswersText: '',
      txtAnswer: '',
      currentRound: 0,
      score: 0,
      lblTimer: '',
      lblMessage: '',
      highScores: [],
      mobileMode: false
    };

  constructor() {
    super();

    console.log('wordgame constructor finished');

  }

  async componentDidMount() {
    this.wordService.SetContext(this.props.context);
    await this.wordService.loadWords();

    if (window.innerWidth<600)
      this.setState({mobileMode:true})
    

    this.setState({
      gamestate: GameState.Title,
    } as IWordGameState);

    this.getHighScores();

  }

  public async redraw() {
    this.forceUpdate();
  }

  answerChanged(event) {
    this.setState({ txtAnswer: event.target.value } as IWordGameState);
  }

  messageCounter = 0;

  showMessage(message: string) {
    this.setState({ lblMessage: message } as IWordGameState);
    this.messageCounter = 3;
  }

  async btnAnswer() {
    let answerFound: boolean = false;

    this.currentGame.rounds[this.state.currentRound].answers.forEach(answer => {
      if (answer.toLowerCase() == this.state.txtAnswer.toLowerCase()) {
        this.currentGame.rounds[this.state.currentRound].correctAnswer = this.state.txtAnswer;
        this.numTimer += 5;
        this.showMessage('Correct!! +5 Seconds');
        this.setState({
          lblTimer: this.numTimer + " seconds",
          score: this.state.score + 1
        } as IWordGameState);
        answerFound = true;
      }
    })

    if (!answerFound) {
      this.showMessage('Incorrect');
      this.currentGame.rounds[this.state.currentRound].incorrectAnswers.push(this.state.txtAnswer);
      this.setState({ txtAnswer: '' } as IWordGameState);
      this.focusOnTextbox();
    }
    else {
      this.nextRound();
    }
  }

  btnSkip() {
    this.nextRound();
    this.focusOnTextbox();
  }

  async nextRound() {

    //state doesn't modify immediately
    await this.setState({
      txtAnswer: '',
      currentRound: this.state.currentRound + 1,
    } as IWordGameState);

    if (this.state.currentRound >= this.currentGame.rounds.length) {
      this.finishGame();
    }
    else { 
      this.setState({
        currentWord: this.currentGame.rounds[this.state.currentRound].word,
        possibleAnswersText: this.getPossibleAnswersText(this.state.currentRound)
      } as IWordGameState);
    }
  }

  getPossibleAnswersText(currentRound:number):string{
    let possibleAnswers = this.currentGame.rounds[currentRound].answers.length;
    let possibleAnswersText = possibleAnswers + ' Possible Answer';
    if (possibleAnswers>1)
      possibleAnswersText = possibleAnswers + ' Possible Answers';
    return possibleAnswersText
  }

  focusOnTextbox() {
    let element = document.getElementById('txtWordGameAnswer');
    if (element)
      element.focus();
  }

  finishGame() {
    this.sendScore(this.state.score, this.numTimer, JSON.stringify(this.currentGame));
    this.stopTimer();
    this.setState({ gamestate: GameState.GameFinished } as IWordGameState);

  }

  async sendScore(score: number, seconds: number, details: string) {
    if (!this.props.enableHighScores)
      return;
    await this.wordService.SubmitScore(score, seconds, details);
    this.getHighScores();
  }

  async getHighScores(){
    if (!this.props.enableHighScores)
      return;

    let scores = await this.wordService.GetHighScores();

    this.setState({
      highScores: scores
    } as IWordGameState);
  }

  keyDownAnswer(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.keyCode == 13)
      this.btnAnswer();
  }


  async btnStartGame() {
    this.setState({
      gamestate: GameState.GameLoading
    } as IWordGameState);

    this.currentGame = this.wordService.GenerateGame();


    await new Promise<void>(resolve => { setTimeout(resolve, 1000); });

    this.setState({
      gamestate: GameState.GamePlaying,
      currentRound: 0,
      txtAnswer: '',
      score: 0,
      lblMessage: '',
      currentWord: this.currentGame.rounds[0].word,
      possibleAnswersText: this.getPossibleAnswersText(0)
    } as IWordGameState);

    this.numTimer = 30;
    this.setState({ lblTimer: this.numTimer + " seconds" });
    this.timerInterval = setInterval(this.timerTick.bind(this), 1000);
  }

  timerTick() {
    //for debugging
    // if (this.numTimer>25)
    this.numTimer--;
    this.setState({ lblTimer: this.numTimer + " seconds" });
    if (this.numTimer == 0) {
      this.finishGame();
    }

    //toast messages
    if (this.messageCounter > 0) {
      this.messageCounter--;
      if (this.messageCounter == 0)
        this.setState({ lblMessage: '' } as IWordGameState);
    }
  }

  stopTimer() {
    this.setState({ lblTimer: '' });
    clearInterval(this.timerInterval);
  }

  public render(): React.ReactElement<IWordGameProps> {
    window["wordgame"] = this;


    let body: JSX.Element;
    switch (this.state.gamestate) {
      case GameState.Title:
        body =
          <div>
            <h1>{this.props.description}</h1>
            {/* <h1>Word Game</h1> */}
            {/* <h4>Count: {this.wordService.GetWordCount()}</h4> */}
            <p>Unscramble as many words as you can before the time runs out</p>
            <button className="blueButton" onClick={this.btnStartGame.bind(this)}>
              Start Game
            </button>
            {
              this.props.enableHighScores ?
              <WordHighScores scores={this.state.highScores}></WordHighScores> : ''
            }
          </div>
        break;
      case GameState.GameLoading:
        body =
          <div>
            <img src={logo} />
            <span style={{ marginLeft: '15px' }}>
              Loading...
            </span>
          </div>
        break;
      case GameState.GamePlaying:
        body =
          <div>
            <div className="currentWord" style={{position:"relative"}}>
              {this.state.currentWord}
              {/* MOBILE TOAST */}
              {
                this.state.lblMessage != '' && this.state.mobileMode?
                <div className={this.state.lblMessage == 'Incorrect' ? 'toastMiniRed word-fade-in' : 'toastMiniGreen word-fade-in'}
                style={{position:"absolute",left:"0",right:"0",fontSize:"10pt",top:"83px",padding:"0"}}>
                {
                  this.state.lblMessage
                }
                </div> : ''
              }
            </div>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"></meta>
            <input type="text" autoFocus={true} placeholder="Enter Answer" id="txtWordGameAnswer"
              autoComplete="off" autoCapitalize="off" autoCorrect="off" spellCheck={false}
              value={this.state.txtAnswer} onChange={this.answerChanged.bind(this)} onKeyDown={this.keyDownAnswer.bind(this)} />
            <div className="numAnswersTip">{this.state.possibleAnswersText}</div>
            <table style={{ marginLeft: 'Auto', marginRight: 'Auto' }}>
              <tbody>
                <tr>
                  <td>
                    <button className="blueButton" style={{ marginTop: '20px' }} onClick={this.btnAnswer.bind(this)}>
                      Submit
                    </button>
                  </td>
                  <td>
                    <button className="greyButton" onClick={this.btnSkip.bind(this)} style={{ marginTop: '20px' }} >
                      Skip
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="timer">{this.state.lblTimer}</div>
            {/* DESKTOP TOAST */}
            {
              this.state.lblMessage != '' && !this.state.mobileMode?
                <div className="toast word-fade-in" >
                  <div className={this.state.lblMessage == 'Incorrect' ? 'toastRed' : 'toastGreen'}>{this.state.lblMessage}</div>
                </div> : ''
            }
          </div>
        break;
      case GameState.GameFinished:

        body =
          <div>
            <h1>Well done! Score {this.state.score} out of 6</h1>
            <p>See answers below to the current round</p>
            <button className="blueButton" onClick={this.btnStartGame.bind(this)}
              style={{ marginBottom: '20px' }}>Play Again</button>
            <div className="gameReview">
              <ul>
                {
                  this.currentGame.rounds.map(round => (
                    <li key={round.word + '_wordgame_word'}><b>Word </b><span>{round.word}</span>
                      {
                        round.answers.map(answer => (
                          <ul key={answer + '_wordgame_answer'}>
                            <b>Answer </b> {answer}
                            {
                              round.correctAnswer == answer ?
                                <svg xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '5px' }} width="15" height="15" viewBox="0 0 24 24" color="#155724">
                                  <path fill="currentcolor" d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" /></svg>
                                : ''
                            }
                          </ul>
                        ))
                      }
                    </li>
                  ))
                }
              </ul>
            </div>
            {
              this.props.enableHighScores ?
              <WordHighScores scores={this.state.highScores}></WordHighScores> : ''
            }
          </div>
        break;

    }

    let maindiv = <div className="wordGameCustom" style={{ position: 'relative' }}>{body}</div>;


    return (
      <div className={styles.wordGame} style={{ textAlign: 'center' }} >
        {maindiv}
      </div >
    );
  }


}
