import * as React from 'react';
import styles from './WebPartReport.module.scss';
import { IWebPartReportProps } from './IWebPartReportProps';
import { _getSiteWebParts } from '../../WebPartData';
import { WebPart } from '../../types';
import { ListView, IViewField } from "@pnp/spfx-controls-react/lib/ListView";
import { IWebPartReportWebPartState } from './IWebPartReportWebPartState';
import { ChartControl, ChartType } from '@pnp/spfx-controls-react/lib/ChartControl';
import { ChartData } from 'chart.js';
import { Spinner } from '@fluentui/react';

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


let siteWebParts: WebPart[];
let webPartsCounts: number[] = [];
let webPartsTitles: string[] = [];
let aggregatedWebPartData = new Map<string, number>();

export default class WebPartReport extends React.Component<IWebPartReportProps, IWebPartReportWebPartState> {

  constructor(props: IWebPartReportProps) {
    super(props);
    this.state = {
      loading: true,
      webPartList: [],
      aggregatedWebPartList: { titles: [], count: [] }
    };
  }

  public async componentDidMount() {
    this._setChartData();
  }

  private loadingData(): Promise<ChartData> {

    return new Promise<ChartData>((resolve, _reject) => {

      let countWP:number[] = [];
      countWP = this.state.aggregatedWebPartList.count
      const data: ChartData =
      {
        labels: this.state.aggregatedWebPartList.titles.length > 0 ? this.state.aggregatedWebPartList.titles : [],
        datasets: [{ label: "WebParts", data: countWP.length > 0 ? countWP : [] }]
      };
      resolve(data);

    });
  }

  public async _setChartData() {

    webPartsCounts = [];
    webPartsTitles = [];
    aggregatedWebPartData.clear();

    siteWebParts = await _getSiteWebParts(this.props.graphClient, this.props.siteId.toString());
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


  public render(): React.ReactElement<IWebPartReportProps> {
    const {
      hasTeamsContext,
      displayOption
    } = this.props;

    return (
      <section className={`${styles.webPartReport} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={this.state.loading ? styles.hiddenComponent : ''}>
          <div className={displayOption.toString() == "2" ? styles.hiddenComponent : ''}>
          <p className={styles.title}>Web parts list:</p>
            <ListView
              viewFields={_viewFields}
              items={siteWebParts}
            ></ListView>
          </div>
          <ChartControl
            type={ChartType.Doughnut}
            datapromise={this.loadingData()}
            options={options}
            className={displayOption.toString() == "1" ? styles.hiddenComponent : ''}
          />
        </div>
        <div className={!this.state.loading ? styles.hiddenComponent : ''}>
        <Spinner label="Loading webparts..." />
        </div>
      </section>
    );
  }
}
