import * as React from 'react';
import { IResultsProps } from './IResultsProps';
import { IResultsState } from './IResultsState';
import { Spinner } from 'office-ui-fabric-react';
import { IVoteResult } from '../../services';

import { HorizontalBar } from 'react-chartjs-2';
//const defaults = require('react-chartjs-2').defaults;
const Chart : any = require('chart.js');
const defaults : any = Chart.defaults;

import { merge } from '@microsoft/sp-lodash-subset';

interface IColorInfo {
  backgroundColor: string;
  pointBackgroundColor: string;
  pointHoverBackgroundColor: string;
  borderColor: string;
  pointBorderColor: string;
  pointHoverBorderColor: string;
}

export class Results extends React.Component<IResultsProps, IResultsState> {
  private useExcanvas: boolean = typeof (window as any).G_vmlCanvasManager === 'object' &&
  (window as any).G_vmlCanvasManager !== null &&
  typeof (window as any).G_vmlCanvasManager.initElement === 'function';
  private convertedColors: IColorInfo[] = undefined;
  private data: { labels: string[], datasets: any[] };
  private options: any;

  constructor(props: IResultsProps) {
    super(props);

    this.state = {
      loading: true,
      error: undefined,
      results: []
    };

    this.convertColor = this.convertColor.bind(this);
  }

  protected componentDidMount(): void {
    // from angular-chart.js
    defaults.global.tooltips.mode = 'label';
    defaults.global.elements.line.borderWidth = 2;
    defaults.global.elements.rectangle.borderWidth = 2;
    defaults.global.legend.display = false;
    defaults.global.colors = [
      '#97BBCD', // blue
      '#DCDCDC', // light grey
      '#F7464A', // red
      '#46BFBD', // green
      '#FDB45C', // yellow
      '#949FB1', // grey
      '#4D5360'  // dark grey
    ];
    this.convertedColors = defaults.global.colors.map(this.convertColor);
    // -- from angular-chart.js

    this.data = {
      labels: [],
      datasets: [merge({}, this.convertedColors[0], {
        label: 'Number of votes',
        data: []
      })]
    };
    this.options = {
      scales: {
        xAxes: [{
          gridLines: {
            display: false
          },
          scaleLabel: {
            display: true,
            labelString: 'Number of votes'
          }
        }]
      }
    };

    this.props.pollService.getResults(this.props.listName)
      .then((results: IVoteResult[]): void => {
        this.setState((prevState: IResultsState, props: IResultsProps): IResultsState => {
          prevState.results = results;
          prevState.loading = false;
          return prevState;
        });
      }, (error: any): void => {
        this.setState((prevState: IResultsState, props: IResultsProps): IResultsState => {
          prevState.error = error.data['odata.error'].message.value;
          prevState.loading = false;
          return prevState;
        });
      });
  }

  public render(): JSX.Element {
    if (this.state.results.length > 0) {
      this.data.labels.length = 0;
      this.data.datasets[0].data.length = 0;

      for (let i: number = 0; i < this.state.results.length; i++) {
        const result: IVoteResult = this.state.results[i];
        this.data.labels.push(result.label);
        this.data.datasets[0].data.push(result.numVotes);
      }
    }

    return (
      <div>
        {this.state.loading &&
          <Spinner label={'Loading results...'} />
        }
        {this.state.loading === false &&
          <HorizontalBar data={this.data} options={this.options} />
        }
      </div>
    );
  }

  // from angular-chart.js
  private convertColor(color: IColorInfo | string): IColorInfo {
    if (typeof color === 'object' && color !== null) return color;
    if (typeof color === 'string' && color[0] === '#') return this.getColor(Results.hexToRgb(color.substr(1)));
    return this.getRandomColor();
  }

  private getRandomColor(): IColorInfo {
    const color: number[] = [Results.getRandomInt(0, 255), Results.getRandomInt(0, 255), Results.getRandomInt(0, 255)];
    return this.getColor(color);
  }

  private getColor(color: number[]): IColorInfo {
    return {
      backgroundColor: this.rgba(color, 0.2),
      pointBackgroundColor: this.rgba(color, 1),
      pointHoverBackgroundColor: this.rgba(color, 0.8),
      borderColor: this.rgba(color, 1),
      pointBorderColor: '#fff',
      pointHoverBorderColor: this.rgba(color, 1)
    };
  }

  private static getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private rgba(color: number[], alpha: number): string {
    // rgba not supported by IE8
    return this.useExcanvas ? 'rgb(' + color.join(',') + ')' : 'rgba(' + color.concat(alpha).join(',') + ')';
  }

  // Credit: http://stackoverflow.com/a/11508164/1190235
  private static hexToRgb(hex: string): number[] {
    const bigint: number = parseInt(hex, 16),
      r: number = (bigint >> 16) & 255,
      g: number = (bigint >> 8) & 255,
      b: number = bigint & 255;

    return [r, g, b];
  }
  // -- from angular-chart.js
}