import * as React from 'react';
import styles from './Awards.module.scss';
import { IAwardsContainerProps } from './IAwardsContainerProps';
import { IAwardsContainerState } from './IAwardsContainerState';
import { IAwardsService } from '../../../services/AwardsService';
import AwardListItem from './AwardListItem';
import AwardCard from './AwardCard';

export default class AwardsContainer extends React.Component<IAwardsContainerProps, IAwardsContainerState> {

  private _service: IAwardsService;

  constructor(props: IAwardsContainerProps) {
    super(props);
    this.state = {
      awards: []
    };
    this._service = this.props.awardsService;
  }

  public componentDidMount(): void {
    this._service.getMyAwards(this.props.userId).then(awards => {
      this.setState({
        awards: awards
      });
    });
  }

  public componentDidUpdate(prevProps: IAwardsContainerProps): void {
    if (this.props.userId !== prevProps.userId) {
      this._service.getMyAwards(this.props.userId).then(awards => {
        this.setState({
          awards: awards
        });
      });
    }
  }

  public render(): React.ReactElement<IAwardsContainerProps> {

    if(this.state.awards.length == 0) {
      return (<div>User {this.props.userId} has no awards.</div>);
    }
    
    const {
      hasTeamsContext,
    } = this.props;

    let awards: JSX.Element[] = [];
    let containerClassName = styles.awards_container;
    if (this.props.layoutType == 'List') {
        awards = this.state.awards.map(award => <AwardListItem award={award} />);
        containerClassName = styles.awards_list_container;
    } else {
        awards = this.state.awards.map(award => <AwardCard award={award} />);
    }

    return (<div className={containerClassName}>
        {awards}
    </div>);
  }
}