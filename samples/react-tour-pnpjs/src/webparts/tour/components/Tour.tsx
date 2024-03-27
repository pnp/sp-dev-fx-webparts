import * as React from 'react';
import styles from './Tour.module.scss';
import { ITourProps } from './ITourProps';
import Tours from 'reactour';
import { CompoundButton } from '@fluentui/react';
import { TourHelper } from './TourHelper';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import ITourStep from '../model/ITourStep';



export interface ITourState {
  isTourOpen: boolean;
  steps: ITourStep[];
  tourDisabled: boolean;
}

export default class Tour extends React.Component<ITourProps, ITourState> {

  constructor(props: ITourProps) {
    super(props);
    this.state = {
      isTourOpen: false,
      steps: [],
      tourDisabled: true
    };
  }

  public componentDidMount(): void {
    this.setState({ steps: TourHelper.getTourSteps(this.props.collectionData) });
    if (this.props.collectionData !== undefined && this.props.collectionData.length > 0) {
      this.setState({ tourDisabled: false });
    }
  }

  public componentDidUpdate(newProps: ITourProps): void {
    if (JSON.stringify(this.props.collectionData) !== JSON.stringify(newProps.collectionData)) {
      this.setState({ steps: TourHelper.getTourSteps(this.props.collectionData) });
      if (this.props.collectionData !== undefined && this.props.collectionData.length > 0) {
        this.setState({ tourDisabled: false });
      } else {
        this.setState({ tourDisabled: true });
      }
    }
  }


  public render(): React.ReactElement<ITourState> {
    return (
      <div className={styles.tour}>
        <CompoundButton primary text={this.props.actionValue} secondaryText={this.props.description}
          disabled={this.state.tourDisabled} onClick={this._openTour} checked={this.state.isTourOpen}
          className={styles.tutorialButton} />
        <Tours
          onRequestClose={this._closeTour}
          startAt={0}
          steps={this.state.steps}
          isOpen={this.state.isTourOpen}
          maskClassName="mask"
          className={styles.reactTourCustomCss}
          accentColor={"#5cb7b7"}
          rounded={5}
          onAfterOpen={this._disableBody}
          onBeforeClose={this._enableBody}
        />
      </div>
    );
  }

  private _disableBody = (target: HTMLDivElement): void => disableBodyScroll(target);
  private _enableBody = (target: HTMLDivElement): void => enableBodyScroll(target);

  private _closeTour = (): void => {
    this.setState({ isTourOpen: false });
  }

  private _openTour = (): void => {
    this.setState({ isTourOpen: true });
  }
}
