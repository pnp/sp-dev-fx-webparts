import * as React from 'react';
import { Body1 } from '@fluentui/react-components';
import { DonutChart, IChartDataPoint, IChartProps } from '@fluentui/react-charting';
import { IFileInfo } from '../../../../../common/types';
import { DONUT_HEIGHT, paletteColor } from '../dashboard.constants';

export interface ICheckedOutFilesChartProps {
  files: IFileInfo[];
}

const CheckedOutFilesChart: React.FC<ICheckedOutFilesChartProps> = ({ files }) => {
  const data: IChartProps = React.useMemo(() => {
    const counts = new Map<string, number>();
    for (const file of files) {
      const owner = file.checkedOutTo ?? 'Unknown';
      counts.set(owner, (counts.get(owner) ?? 0) + 1);
    }
    const chartData: IChartDataPoint[] = Array.from(counts.entries()).map(([owner, count], index) => ({
      legend: owner,
      data: count,
      color: paletteColor(index),
      xAxisCalloutData: owner,
      yAxisCalloutData: `${count} checked out`
    }));
    return { chartTitle: 'Checked out files', chartData };
  }, [files]);

  if (files.length === 0) {
    return <Body1>No checked-out files found.</Body1>;
  }

  return (
    <DonutChart
      data={data}
      innerRadius={58}
      height={DONUT_HEIGHT}
      valueInsideDonut={files.length}
      hideLegend={false}
      legendsOverflowText="more"
    />
  );
};

export default CheckedOutFilesChart;