import * as React from 'react';
import { IPollProps } from './IPollProps';
import { IPollState } from './IPollState';
import { Vote } from '../Vote';
import { Results } from '../Results';

export class Poll extends React.Component<IPollProps, IPollState> {
  constructor(props: IPollProps) {
    super(props);

    this.state = {
      showResults: false
    };

    this.voted = this.voted.bind(this);
  }

  protected componentWillReceiveProps(nextProps: IPollProps, nextContext: any): void {
    this.setState({
      showResults: false
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
          <Vote onVoted={this.voted} {...this.props} />
        }
        { showResults &&
          <Results {...this.props} />
        }
      </div>
    );
  }

  private voted(): void {
    this.setState({
      showResults: true
    });
  }
}