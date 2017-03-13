import * as React from 'react';
import styles from './ModernCharts.module.scss';
import { IModernChartsProps } from '../IModernChartsWebPartProps';
import { MChart } from '../IModernChartsWebPartProps';
import 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { HorizontalBar } from 'react-chartjs-2';
import { Radar } from 'react-chartjs-2';
import { Polar } from 'react-chartjs-2';
import ChartOptions from '../ChartOptions';
import {
	DocumentCard,
	DocumentCardTitle,
  DocumentCardLocation,
  DocumentCardPreview,
  IDocumentCardPreviewProps
} from 'office-ui-fabric-react/lib/DocumentCard';

export default class ModernCharts extends React.Component<IModernChartsProps, void> {

  public render(): JSX.Element {
    const charts: JSX.Element[] = this.props.charts.map((chart: MChart, i: number) => {
    return (
      <DocumentCard onClickHref='#' className={styles.docContainer + ' ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg' + chart.config.size} key={chart.key}>
        <div className={styles.chartCard}>
        {this.chart(ChartOptions.Data(chart),ChartOptions.Options(),chart.config.type)}        
        </div>
        <DocumentCardLocation location={chart.config.description}/>
        <DocumentCardTitle title={chart.config.title}/>
      </DocumentCard>
    );
  });
  
    return (
      <div className={styles.chartjs + ' ms-Grid'}>
        <div className={'ms-Grid-row'}>
          {charts}
        </div>
        <div style={{clear: 'both'}}/>
        </div>
    );

  }

  public chart(data: Object, options: Object, type: string) {
    var tChart: any;
    switch (type) {
      case 'doughnut':
        tChart = <Doughnut data={data} options={options} />;
        return tChart;
      case 'line':
        tChart = <Line data={data} options={options} />;
        return tChart;
      case 'pie':
        tChart = <Pie data={data} options={options} />;
        return tChart;
      case 'bar':
        tChart = <Bar data={data} options={options} />;
        return tChart;
      case 'horizontalbar':
        tChart = <HorizontalBar data={data} options={options} />;
        return tChart;
      case 'radar':
        tChart = <Radar data={data} options={options} />;
        return tChart;
      case 'polar':
        tChart = <Polar data={data} options={options} />;
        return tChart;
      default:
        tChart = <Line data={data} options={options} />;
        return tChart;
    }
  }
}
