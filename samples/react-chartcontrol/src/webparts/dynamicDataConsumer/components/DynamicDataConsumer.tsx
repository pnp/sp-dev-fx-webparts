import * as React from 'react';
import styles from './DynamicDataConsumer.module.scss';
import { IDynamicDataConsumerProps } from './IDynamicDataConsumerProps';

// Used to make http requests
import { HttpClient } from '@microsoft/sp-http';

// used to call GitHub
import GitHubService from '../../../services/GitHubService/GitHubService';
import { IGitHubService } from '../../../services/GitHubService';
import { IContributor, IAuthorCommit } from '../../../services/GitHubService';

// used to group GitHub results by date
import { groupBy, toPairs } from '@microsoft/sp-lodash-subset';
import * as moment from 'moment';

// Used to display configuration placeholder, wait messages, and error messages
import { Placeholder } from '@pnp/spfx-controls-react/lib/Placeholder';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import * as strings from 'DynamicDataConsumerWebPartStrings';

// used to add a chart control
import { ChartControl, ChartType, PaletteGenerator } from '@pnp/spfx-controls-react/lib/ChartControl';

export default class DynamicDataConsumer extends React.Component<IDynamicDataConsumerProps, {}> {

  public render(): React.ReactElement<IDynamicDataConsumerProps> {
    const {
      contributor,
      needsConfiguration,
      onConfigure
    } = this.props;

    const contributorData: IContributor | undefined = contributor.tryGetValue();

    let alias: string = undefined;
    let repoOwner: string = undefined;
    let repo: string = undefined;

    if (contributorData) {
      try {
        alias = contributorData.alias;
        repoOwner = contributorData.repoOwner;
        repo = contributorData.repo;
      } catch (error) {

      }
    } else {
      alias = this.props.alias;
      repoOwner = this.props.repoOwner;
      repo = this.props.repo;
    }

    return (
      <div className={styles.dynamicDataConsumer}>
        {needsConfiguration &&
          <Placeholder
            iconName='Edit'
            iconText={strings.PlaceHolderConfigureTitle}
            description={strings.PlaceHolderConfigureDescription}
            buttonLabel={strings.ConfigureButtonLabel}
            onConfigure={onConfigure} />
        }
        {!needsConfiguration && (alias === undefined || alias === '') &&
          <Placeholder
            iconName='GitGraph'
            iconText={strings.PlaceHolderDynamicDataTitle}
            description={strings.PlaceHolderDynamicDataDescription} />
        }
        {!needsConfiguration &&
          alias !== undefined && alias !== '' &&
          <ChartControl
            type={ChartType.Bar}
            datapromise={this._loadAsyncData()}
            loadingtemplate={() => <Spinner size={SpinnerSize.large} label={strings.Loading} ariaLive="assertive" />}
            rejectedtemplate={(error: string) => <MessageBar messageBarType={MessageBarType.error} isMultiline={false}>
              {strings.Error}: {error}
            </MessageBar>}
            options={
              {
                legend: {
                  display: false
                },
                title: {
                  display: true,
                  text: [alias, strings.ChartTitle] // when title is a string array, it spans over multiple lines
                },
                scales: {
                  xAxes: [{
                    type: 'time',
                    time: {
                      displayFormats: {
                        'millisecond': strings.MonthLabel,
                        'second': strings.MonthLabel,
                        'minute': strings.MonthLabel,
                        'hour': strings.MonthLabel,
                        'day': strings.MonthLabel,
                        'week': strings.MonthLabel,
                        'month': strings.MonthLabel,
                        'quarter': strings.MonthLabel,
                        'year': strings.MonthLabel,
                      }
                    }
                  }]
                }
              }}
          />
        }
      </div>
    );
  }

  /**
   * Loads data from a service.
   * This is where you would replace for your own code
   */
  private _loadAsyncData(): Promise<Chart.ChartData> {
    const { contributor } = this.props;
    const contributorData: IContributor | undefined = contributor.tryGetValue();

    let repoOwner: string = undefined;
    let repo: string = undefined;
    let alias: string = undefined;
    try {
      repoOwner = contributorData.repoOwner;
      repo = contributorData.repo;
      alias = contributorData.alias;
    } catch (error) {
    }

    if (!repoOwner || !repo || !alias) {
      return undefined;
    }

    return new Promise<Chart.ChartData>((resolve, reject) => {
      // Get the GitHub data provider
      const dataProvider: IGitHubService = new GitHubService();

      // Create an async request
      dataProvider.getCommits(this.props.httpClient, repoOwner, repo, alias)
        .then((commits: IAuthorCommit[]) => {

          // Group them by month
          var groupedOccurences: [string, IAuthorCommit[]][] = toPairs(groupBy(commits, (commit) => moment(commit.commit.author.date).startOf('month')));

          // Create time series structures so that Chart.js can display them
          const uniqueDateList: { "t": string, "y": number }[] = [];
          groupedOccurences.forEach(group => {
            uniqueDateList.push({ "t": group[0], "y": group[1].length });
          });

          // sort that list so that we don't get overlapped bars on the chart
          uniqueDateList.sort((leftSide, rightSide): number => {
            // convert to moments so that we can sort them as dates
            const leftMoment = moment(leftSide.t);
            const rightMoment = moment(rightSide.t);
            if (leftMoment.isBefore(rightMoment)) {
              return -1;
            }
            if (leftMoment.isAfter(rightMoment)) {
              return 1;
            }
            return 0;
          });

          // Generate an orange semi transparent color
          const backgroundColor = PaletteGenerator.alpha('#d83b01', 0.2);

          const data = {
            datasets: [{
              label: strings.SeriesLabel,
              data: uniqueDateList,
              backgroundColor: backgroundColor,
              borderWidth: 1,
              borderColor: '#d83b01'
            }]
          };
          resolve(data);
        }, (error) => {
          reject(error);
        });
    });
  }
}
