import * as React from 'react';
import { LineChart, IChartProps, ILineChartPoints } from '@fluentui/react-charting';
import { paletteColor, CHART_HEIGHT } from '../dashboard.constants';
import { IActivityTrendProps } from './IActivityTrendProps';

const ActivityTrend: React.FC<IActivityTrendProps> = ({ analytics }) => {
  const data: IChartProps = React.useMemo(() => {
    const points: ILineChartPoints[] = [
      {
        legend: 'Sites modified',
        color: paletteColor(0),
        data: analytics.trend.map((point) => ({
          x: point.date,
          y: point.count,
          xAxisCalloutData: point.date.toLocaleDateString(undefined, {
            month: 'short',
            year: 'numeric'
          })
        }))
      }
    ];
    return { chartTitle: 'Activity trend', lineChartData: points };
  }, [analytics.trend]);

  return (
    <LineChart
      data={data}
      height={CHART_HEIGHT}
      yAxisTickCount={4}
      yMinValue={0}
    />
  );
};

export default ActivityTrend;
