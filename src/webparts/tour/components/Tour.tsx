import * as React from 'react';
import styles from './Tour.module.scss';
import { ITourProps } from './ITourProps';
import Tours from 'reactour';
import { DefaultButton } from 'office-ui-fabric-react';
import { TourHelper } from './TourHelper';
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";



export interface ITourState {
  isTourOpen: boolean;
  steps: any[];
}

export default class Tour extends React.Component<ITourProps, ITourState> {

  constructor(props: ITourProps) {
    super(props);
    this.state = {
      isTourOpen: false,
      steps: []
    };
  }

  public componentDidMount() {
    this.setState({ steps: TourHelper.getTourSteps(this.props.collectionData) });
  }

  public LoadValue(){
    this.setState({ steps: TourHelper.getTourSteps(this.props.collectionData) });
  }
  //public componentDidUpdate(propsPrecedenti) {
  //   this.setState({ steps: TourHelper.getTourSteps(this.props.collectionData) });
  //}


  public render(): React.ReactElement<ITourState> {
    return (
      <div className={styles.tour} >
        <DefaultButton text={this.props.actionValue} onClick={this._openTour} allowDisabledFocus />

        <Tours
          onRequestClose={this._closeTour}
          steps={this.state.steps}
          isOpen={this.state.isTourOpen}
          maskClassName="mask"
          className="helper"
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
