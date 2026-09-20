import * as React from 'react';

export interface IChartPanelProps {
  /** Heading shown above the chart. */
  title: string;
  /** Chart content. */
  children: React.ReactNode;
}
