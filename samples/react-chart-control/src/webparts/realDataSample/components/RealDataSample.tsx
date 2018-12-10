import * as React from 'react';
import styles from './RealDataSample.module.scss';
import { IRealDataSampleProps } from './IRealDataSample.types';
import { Placeholder } from '@pnp/spfx-controls-react/lib/Placeholder';
import * as strings from 'RealDataSampleWebPartStrings';

// used to add a chart control
import { ChartControl, ChartType } from "@pnp/spfx-controls-react/lib/ChartControl";
import GitHubService from '../../../services/GitHubService/GitHubService';
import { IGitHubService, IGitHubContributor } from '../../../services/GitHubService';

// Let's make Vesa happy
const vesaChromatic: string[] = [
  styles.vesaChromatic1,
  styles.vesaChromatic2,
  styles.vesaChromatic3,
  styles.vesaChromatic4,
  styles.vesaChromatic5,
  styles.vesaChromatic6,
  styles.vesaChromatic7,
  styles.vesaChromatic8,
  styles.vesaChromatic9,
  styles.vesaChromatic10
];
export default class RealDataSample extends React.Component<IRealDataSampleProps, {}> {
  /**
* The chart element
*/
  private _chartElem: ChartControl = undefined;

  /**
   * Handle to async requests
   */
  private _asyncRequest = undefined;

  /**
  * When component is mounted, get the data
  * It is better to use componentDidMount than
  * componentWillMount to prevent calling the service
  * more than once.
  */
  public componentDidMount(): void {
    const { repoOwner, repo } = this.props;
    if (!repoOwner || !repo) {
      // No data to get yet
      return;
    }
    // by default, load only one dataset
    this._loadAsyncData();
  }

  /**
   * Before we unmount, cancel any pending requests
   */
  public componentWillUnmount(): void {
    // any outstading requests?
    if (this._asyncRequest) {
      // cancel them!
      this._asyncRequest.cancel();
    }
  }
  public render(): React.ReactElement<IRealDataSampleProps> {
    const {
      repoOwner,
      repo
    } = this.props;
    // if we're not configured, show the placeholder
    if (!repoOwner || !repo) {
      return <Placeholder
        iconName="GitGraph"
        iconText={strings.PlaceholderTitle}
        description={strings.PlaceholderDescription}
        buttonLabel={strings.ConfigureButton}
        onConfigure={this._onConfigure} />;
    }


    return (
      <div className={styles.realDataSample}>
        <ChartControl
          type={ChartType.Doughnut}
          ref={this._linkElement}
          data={
            {
              datasets: [{
                data: []
              }]
            }}
          options={
            {
              legend: {
                display: false
              },
              title: {
                display: true,
                text: strings.ChartTitle
              },
            }
          }
          onClick={(_ignored?: MouseEvent, activeElements?: Array<{}>) => {
            const clickedElement = activeElements![0];
            const clickedModel = clickedElement!["_model"];
            const clickedLabel: string = clickedModel!.label;
            console.log("Avatatar", clickedLabel);
            this.props.onSelectionChange(clickedLabel);
            return {};
          }}
        />
      </div>
    );
  }

  /**
   * When users click on the Configure button, we display the property pane
   */
  private _onConfigure = () => {
    this.props.context.propertyPane.open();
  }

  /**
  * Links a reference to the chart so that we can
  * refer to it later and change its data
  */
  //  tslint:disable-next-line no-any
  private _linkElement = (e: any) => {
    this._chartElem = e;
  }

  /**
   * Loads data from a service.
   * This is where you would replace for your own code
   */
  private _loadAsyncData = () => {
    const { context,
      repoOwner,
      repo } = this.props;

    // Get the GitHub data provider
    const dataProvider: IGitHubService = new GitHubService();

    // Create an async request
    this._asyncRequest = dataProvider
      .getContributors(context, repoOwner, repo)
      .then((contributors: IGitHubContributor[]) => {
        // mark the request as done
        this._asyncRequest = undefined;

        // get the chart
        const chart = this._chartElem.getChart();
        // get the chart's data
        const data = chart.data;

        const authors: string[] = contributors.map((contributor) => {
          return contributor.login;
        });

        const totalContributions: number[] = contributors.map((contributor) => {
          return contributor.contributions;
        });

        data.labels = authors;
        const dataSet: Chart.ChartDataSets = data.datasets[0];
        dataSet.data = totalContributions;
        dataSet.backgroundColor = [];
        dataSet.borderColor = "#fff";
        dataSet.borderWidth = 1;
        totalContributions.map((value: number, index: number) => {
          (dataSet.backgroundColor as string[]).push(vesaChromatic[index % vesaChromatic.length]);
        });

        // update the chart without refreshing the entire web part
        this._chartElem.update();
      });
  }
}
