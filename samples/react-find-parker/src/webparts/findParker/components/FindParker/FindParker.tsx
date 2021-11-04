import * as React from 'react';
import * as strings from 'FindParkerWebPartStrings';
import styles from './FindParker.module.scss';
import { IFindParkerProps } from './IFindParkerProps';
import { IFindParkerState } from './IFindParkerState';
import { DefaultButton } from '@microsoft/office-ui-fabric-react-bundle/node_modules/office-ui-fabric-react/lib/Button';
import Constants from '../../model/Constants';
import Icon from '../../model/Icon';
import IParker from '../../model/IParker';

export default class FindParker extends React.Component<IFindParkerProps, IFindParkerState> {

  constructor(props: IFindParkerProps) {
    super(props);

    this.state = {
      numberOfFoundElements: 0,
      gameStarted: false,
      gameFinsihed: false,
      foundPlaceForParkers: false,
      listOfParkers: [],
      elements: []
    };
  }

  public componentDidMount(): void {
    const { numberOfElements } = this.props;

    if(document.querySelector(Constants.mainPageContent) === null){
      this.setState({ foundPlaceForParkers: false });
      return;
    }

    const listOfParkers = this.createListOfParkers(numberOfElements);
    this.setState(
      { 
        listOfParkers: listOfParkers,
        foundPlaceForParkers: true 
      });
  }

  public render(): React.ReactElement<IFindParkerProps> {

    const {
      gameStarted,
      gameFinsihed,
      foundPlaceForParkers,
      numberOfFoundElements,
      elements } = this.state;
    const { numberOfElements } = this.props;

    return (
      <div id='findParkerId' className={styles.findParker}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <p className={styles.title}>{strings.GameTitle}</p>
              {foundPlaceForParkers ? 
                <p className={styles.label}>{strings.GameDescription}</p>
                :
                <p className={styles.label}>{strings.CouldNotFindPlaceForParkersDescription}</p>
              }
            </div>
          </div>
          {!gameStarted ?
            <div className={styles.row}>
              <div className={styles.column}>
                {foundPlaceForParkers ? 
                  <DefaultButton onClick={() => this.startGame()}>{strings.StartGameButton}</DefaultButton>
                  : ''
                }
              </div>
            </div>
            :
            <div className={styles.row}>
              {!gameFinsihed ?
                <div className={styles.column}>
                  <p className={styles.label}>{strings.GameProgressELementsLabel} <strong>{numberOfElements}</strong></p>
                  <p className={styles.label}>{strings.GameProgressLabel} <strong>{numberOfFoundElements}</strong></p>
                </div>
                :
                <div className={styles.column}>
                  <p className={styles.label}>{strings.EndGameMessage}</p>
                  <DefaultButton onClick={() => this.restartGame()}>{strings.RestartGameButton}</DefaultButton>
                </div>
              }
              <div className={styles.parkersContener}>
                {elements}
              </div>
            </div>
          }
        </div>
      </div>
    );
  }

  private renderParkers(listOfParkers: Array<IParker>): void {
    let items = [];
    listOfParkers.forEach(parker => {
      const style = {
        top: parker.top,
        left: parker.left,
        transform: parker.transform
      };
      items.push(<img alt='pnpParker' src={Icon.svg} width='65' className={styles.parker} style={style} onClick={() => this.parkerFound(parker.id)} />);
    });
    this.setState({ elements: items });
  }

  private parkerFound(id: number): void {
    let numberOfFoundElements = this.state.numberOfFoundElements + 1;
    this.setState({ numberOfFoundElements: numberOfFoundElements });
    let parkers = this.state.listOfParkers;
    parkers = parkers.filter(parker => parker.id !== id);
    this.setState({ listOfParkers: parkers });
    this.renderParkers(parkers);

    if (numberOfFoundElements === this.props.numberOfElements) {
      this.setState({ gameFinsihed: true });
    }
  }

  private startGame(): void {
    this.setState({ gameStarted: true });
    this.renderParkers(this.state.listOfParkers);
  }

  private restartGame(): void {
    const { numberOfElements } = this.props;
    this.setState({ gameFinsihed: false });
    const listOfParkers = this.createListOfParkers(numberOfElements);
    this.setState({
      listOfParkers: listOfParkers,
      numberOfFoundElements: 0
    });
    this.renderParkers(listOfParkers);
  }

  private createListOfParkers(numberOfElements: number): Array<IParker> {
    const pageHeight: number = document.querySelector(Constants.mainPageContent).scrollHeight;
    const pageWidth: number = document.querySelector(Constants.mainPageContent).scrollWidth;
    const findParkerWebPart = document.getElementById('findParkerId').getBoundingClientRect();
    let listOfParkers = [];
    for (let index = 0; index < numberOfElements; index++) {
      const y: number = this.randomNumber((0 - findParkerWebPart.y + 185), (pageHeight  - findParkerWebPart.y  - 300));
      const x: number = this.randomNumber((0 - findParkerWebPart.x + 100), (pageWidth - findParkerWebPart.x - 300));
      const rotate: number = this.randomNumber(0, 180);
      const parker: IParker = {
        id: index,
        left: x,
        top: y,
        transform: `rotate(${rotate}deg)`
      };
      listOfParkers.push(parker);
    }

    return listOfParkers;
  }

  private randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
