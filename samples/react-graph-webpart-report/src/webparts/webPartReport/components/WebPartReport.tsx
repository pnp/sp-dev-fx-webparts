import * as React from 'react';
import styles from './WebPartReport.module.scss';
import { IWebPartReportProps } from './IWebPartReportProps';
import { _getSiteWebParts } from '../../WebPartData';
import { ListView, IViewField } from "@pnp/spfx-controls-react/lib/ListView";
import { IWebPartReportWebPartState } from './IWebPartReportWebPartState';
import { ChartControl, ChartType } from '@pnp/spfx-controls-react/lib/ChartControl';
import { ChartData } from 'chart.js';
import { Spinner } from '@fluentui/react';
import { Pagination } from "@pnp/spfx-controls-react/lib/Pagination";

const _viewFields: IViewField[] = [
  {
    name: "title",
    displayName: "Web Part type",
    minWidth: 150,
    maxWidth: 300
  },
  {
    name: "id",
    displayName: "Web Part ID",
    minWidth: 150,
    maxWidth: 300
  },
  {
    name: "pageTitle",
    displayName: "Page Title",
    minWidth: 150,
    maxWidth: 300
  },
  {
    name: "siteId",
    displayName: "Site ID",
    minWidth: 250
  }
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const options: any = {
  legend: {
    display: true,
    position: "left"
  },
  title: {
    display: true,
    text: "Site web parts"
  }
};



let webPartsCounts: number[] = [];
let webPartsTitles: string[] = [];
const aggregatedWebPartData = new Map<string, number>();

export default class WebPartReport extends React.Component<IWebPartReportProps, IWebPartReportWebPartState> {

  constructor(props: IWebPartReportProps) {
    super(props);
    this.state = {
      loading: true,
      webPartList: [],
      aggregatedWebPartList: { titles: [], count: [] },
      page: 1
    };
  }

  public async componentDidMount(): Promise<void> {
    await this._setChartData();
  }

  private loadingData(): Promise<ChartData> {

    return new Promise<ChartData>((resolve, _reject) => {

      let countWP: number[] = [];
      countWP = this.state.aggregatedWebPartList.count
      const data: ChartData =
      {
        labels: this.state.aggregatedWebPartList.titles.length > 0 ? this.state.aggregatedWebPartList.titles : [],
        datasets: [{ label: "WebParts", data: countWP.length > 0 ? countWP : [] }]
      };
      resolve(data);

    });
  }

  public async _setChartData(): Promise<void> {
    webPartsCounts = [];
    webPartsTitles = [];
    aggregatedWebPartData.clear();

    const siteWebParts = await _getSiteWebParts(this.props.GraphService, this.props.siteId.toString());
    siteWebParts.forEach(e => {
      if (!aggregatedWebPartData.has(e.title)) {
        aggregatedWebPartData.set(e.title, 1);
      } else {
        aggregatedWebPartData.set(e.title, aggregatedWebPartData.get(e.title) + 1)
      }
    });
    aggregatedWebPartData.forEach(a => {
      webPartsCounts.push(a);
    });

    aggregatedWebPartData.forEach((value, key) => {
      webPartsTitles.push(key);
    });

    this.setState({
      webPartList: siteWebParts,
      aggregatedWebPartList: {
        titles: webPartsTitles,
        count: webPartsCounts
      },
      loading: false
    });
  }

  private _getPage(selectedPage: number): void {
    this.setState({
      page: selectedPage
    });
  }

  public render(): React.ReactElement<IWebPartReportProps> {
    const {
      hasTeamsContext,
      displayOption
    } = this.props;

    return (
      <section className={`${styles.webPartReport} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={this.state.loading ? styles.hiddenComponent : ''}>
          <div className={displayOption === "chart" ? styles.hiddenComponent : ''}>
            <p className={styles.title}>List of web parts:</p>
            <ListView
              viewFields={_viewFields}
              items={this.state.webPartList.slice(this.state.page === 1 ? 0 : this.state.page * 10 - 10, this.state.page * 10)}
              showFilter={true}
              filterPlaceHolder="Search..."
            />
            <Pagination
              currentPage={1}
              totalPages={Math.floor(this.state.webPartList.length / 10) + 1}
              onChange={(page) => this._getPage(page)}
              limiter={3} // Optional - default value 3
              hideFirstPageJump // Optional
              hideLastPageJump // Optional
              limiterIcon={"Emoji12"} // Optional
            />
          </div>
          <ChartControl
            type={ChartType.Doughnut}
            datapromise={this.loadingData()}
            options={options}
            className={displayOption === "list" ? styles.hiddenComponent : ''}
          />
        </div>
        <div className={!this.state.loading ? styles.hiddenComponent : ''}>
          <Spinner label="Loading web parts..." />
        </div>
      </section>
    );
  }
}
