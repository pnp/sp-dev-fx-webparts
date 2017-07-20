import * as React from 'react';
import { Button, PrimaryButton, IButtonProps } from 'office-ui-fabric-react';

import { IPollProps } from './IPollProps';
import { IPollState } from './IPollState';
import { Vote } from '../Vote';
import { Results } from '../Results';

export class Poll extends React.Component<IPollProps, IPollState> {
  constructor(props: IPollProps) {
    super(props);

    this.state = {
      showResults: true
    };

    this.voted = this.voted.bind(this);
    this.voteNow = this.voteNow.bind(this);
  }

  protected componentWillReceiveProps(nextProps: IPollProps, nextContext: any): void {
    this.setState({
      showResults: true
    });
  }

  public render(): JSX.Element {
    const { title, description } = this.props;
    const showResults: boolean = this.state.showResults;

    return (
      <div>
        <div className={ 'ms-font-xl' }>{title}</div>
        <div className={ 'ms-font-m-plus' }>{description}</div>
        <br />
        { showResults === false &&
          <div>
            <Vote onVoted={this.voted} {...this.props} />

            <PrimaryButton
              data-automation-id='toResults'
              onClick={this.voted }
              disabled={false}
            >View Results
            </PrimaryButton>
          </div>
        }
        { showResults &&
          <div>
            <Results {...this.props} />

            <PrimaryButton
              data-automation-id='toVote'
              onClick={this.voteNow }
              disabled={false}
            >Vote Now
            </PrimaryButton>
          </div>
        }
      </div>
    );
  }

  private voted(): void {
    this.setState({
      showResults: true
    });
  }

  private voteNow(): void {
    this.setState({
      showResults: false
    });
  }
}