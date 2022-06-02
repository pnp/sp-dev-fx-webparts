import * as React from 'react';
import styles from './MyAwards.module.scss';
import { IMyAwardsProps } from './IMyAwardsProps';
import { IMyAwardsState } from './IMyAwardsState';
import { IAwardsService } from '../../../services/AwardsService';
import Award from './Award';

export default class MyAwards extends React.Component<IMyAwardsProps, IMyAwardsState> {

  private _service: IAwardsService;

  constructor(props: IMyAwardsProps) {
    super(props);
    this.state = {
      awards: []
    };
    this._service = this.props.awardsService;
  }

  public componentDidMount(): void {
    this._service.getMyAwards().then(awards => {
      this.setState({
        awards: awards
      });
    });
  }

  public render(): React.ReactElement<IMyAwardsProps> {
    const {
      hasTeamsContext,
    } = this.props;

    const awards = <ul>{this.state.awards.map(t => <li key={t.id}><Award award={t} /></li>)}</ul>;

    return (
      <section className={`${styles.myAwards} ${hasTeamsContext ? styles.teams : ''}`}>
        <div>
          <h3>My Awards</h3>
          {awards}
        </div>
      </section>
    );
  }
}
