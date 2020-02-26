import * as React from 'react';
import styles from './Tour.module.scss';
import { ITourProps } from './ITourProps';
import Tours from 'reactour';
import { CompoundButton } from 'office-ui-fabric-react';
import { TourHelper } from './TourHelper';
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";



export interface ITourState {
  isTourOpen: boolean;
  steps: any[];
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

  public componentDidMount() {
    this.setState({ steps: TourHelper.getTourSteps(this.props.collectionData) });
    if (this.props.collectionData != undefined && this.props.collectionData.length > 0) {
      this.setState({ tourDisabled: false });
    }
  }

  public componentDidUpdate(newProps) {
    if (JSON.stringify(this.props.collectionData) != JSON.stringify(newProps.collectionData)) {
      this.setState({ steps: TourHelper.getTourSteps(this.props.collectionData) });
      if (this.props.collectionData != undefined && this.props.collectionData.length > 0) {
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
          className={styles.tutorialButton}>

      </CompoundButton>
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

  private _disableBody = target => disableBodyScroll(target);
  private _enableBody = target => enableBodyScroll(target);

  private _closeTour = () => {
    this.setState({ isTourOpen: false });
  }

  private _openTour = () => {
    this.setState({ isTourOpen: true });
  }
}
