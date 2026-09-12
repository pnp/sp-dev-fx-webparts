import * as React from 'react';
import { DonutChart, IChartProps, IChartDataPoint } from '@fluentui/react-charting';
import { paletteColor, DONUT_HEIGHT } from '../dashboard.constants';
import { ITypeDonutProps } from './ITypeDonutProps';

const TypeDonut: React.FC<ITypeDonutProps> = ({ analytics, onSelectType }) => {
  const data: IChartProps = React.useMemo(() => {
    const chartData: IChartDataPoint[] = analytics.byType.map((bucket, index) => ({
      legend: bucket.label,
      data: bucket.count,
      color: paletteColor(index),
      xAxisCalloutData: bucket.label,
      yAxisCalloutData: `${bucket.count} (${bucket.withTeam} with Team)`,
      onClick: () => onSelectType(bucket.type)
    }));
    return { chartTitle: 'Sites by type', chartData };
  }, [analytics.byType, onSelectType]);

  return (
    <DonutChart
      data={data}
      innerRadius={60}
      height={DONUT_HEIGHT}
      valueInsideDonut={analytics.total}
      hideLegend={false}
      legendsOverflowText="more"
    />
  );
};

export default TypeDonut;
