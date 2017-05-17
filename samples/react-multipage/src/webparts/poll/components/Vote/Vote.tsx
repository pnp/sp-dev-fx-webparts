import * as React from 'react';
import { IVoteProps } from './IVoteProps';
import { IVoteState } from './IVoteState';
import { IVoteOption } from '../../services';

import { Spinner, Button, ButtonType, ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react';

export class Vote extends React.Component<IVoteProps, IVoteState> {
  constructor(props: IVoteProps) {
    super(props);

    this.state = {
      loading: true,
      voteOptions: [],
      voting: false,
      error: undefined,
      voteOptionId: undefined
    };

    this.vote = this.vote.bind(this);
    this.selectVoteOption = this.selectVoteOption.bind(this);
  }

  protected componentDidMount(): void {
    this.props.pollService.getVoteOptions(this.props.listName)
      .then((voteOptions: IVoteOption[]): void => {
        this.setState((prevState: IVoteState, props: IVoteProps): IVoteState => {
          prevState.voteOptions = voteOptions;
          prevState.loading = false;
          return prevState;
        });
      }, (error: any): void => {
        this.setState((prevState: IVoteState, props: IVoteProps): IVoteState => {
          prevState.loading = false;
          prevState.error = error.data['odata.error'].message.value;
          return prevState;
        });
      });
  }

  public render(): JSX.Element {
    const options: IChoiceGroupOption[] = this.state.voteOptions.map<IChoiceGroupOption>((value: IVoteOption, index: number, array: IVoteOption[]): IChoiceGroupOption => {
      return {
        key: value.id.toString(),
        text: value.label
      };
    });

    return (
      <div>
        {this.state.loading &&
          <Spinner label={'Loading poll...'} />
        }
        {this.state.loading === false &&
          this.state.voteOptions.length > 0 &&
          <div>
            <ChoiceGroup options={options} onChanged={this.selectVoteOption} disabled={this.state.voting} />
            <Button buttonType={ButtonType.primary} onClick={this.vote} disabled={this.state.voteOptionId === undefined || this.state.voting}>Vote</Button><br />
            <br />
          </div>
        }
        {this.state.voting &&
          <Spinner label={'Voting...'} />
        }
        {this.state.error !== undefined &&
          <div className={'ms-fontColor-red'}>
            <i className={'ms-Icon ms-Icon--StatusErrorFull'}></i> An error has occurred while loading vote options: <em>{this.state.error}</em>
          </div>
        }
      </div>
    );
  }

//  private selectVoteOption(option: IChoiceGroupOption, evt?: React.SyntheticEvent): void {
  private selectVoteOption(option: IChoiceGroupOption, evt?: any): void {
    this.setState((prevState: IVoteState, props: IVoteProps): IVoteState => {
      prevState.voteOptionId = parseInt(option.key);
      return prevState;
    });
  }

  private vote(): void {
    this.setState((prevState: IVoteState, props: IVoteProps): IVoteState => {
      prevState.error = undefined;
      prevState.voting = true;
      return prevState;
    });
    this.props.pollService.vote(this.state.voteOptionId, this.props.listName)
      .then((): void => {
        this.setState((prevState: IVoteState, props: IVoteProps): IVoteState => {
          prevState.voting = false;
          return prevState;
        });

        //in a sense, trigger the click on Poll-><vote> which will fire Poll.voted();
        this.props.onVoted();
      }, (error: any): void => {
        this.setState((prevState: IVoteState, props: IVoteProps): IVoteState => {
          prevState.voting = false;
          prevState.error = error.data ? error.data['odata.error'].message.value : error;
          return prevState;
        });
      });
  }
}