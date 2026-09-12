import * as React from 'react';
import { VerticalBarChart, IVerticalBarChartDataPoint } from '@fluentui/react-charting';
import { paletteColor, CHART_HEIGHT } from '../dashboard.constants';
import { ITypeBarProps } from './ITypeBarProps';

const TypeBar: React.FC<ITypeBarProps> = ({ analytics, onSelectType }) => {
  const data: IVerticalBarChartDataPoint[] = React.useMemo(
    () =>
      analytics.byType.map((bucket, index) => ({
        x: bucket.label,
        y: bucket.count,
        legend: bucket.label,
        color: paletteColor(index),
        xAxisCalloutData: bucket.label,
        yAxisCalloutData: `${bucket.count} sites`,
        onClick: () => onSelectType(bucket.type)
      })),
    [analytics.byType, onSelectType]
  );

  return (
    <VerticalBarChart
      data={data}
      height={CHART_HEIGHT}
      barWidth={28}
      hideLegend
      yAxisTickCount={4}
    />
  );
};

export default TypeBar;
