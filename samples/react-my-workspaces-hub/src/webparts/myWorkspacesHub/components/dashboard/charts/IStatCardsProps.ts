import * as React from 'react';
import { IAnalyticsViewModel } from '../../../../../common/types';

export interface IStatCardsProps {
  analytics: IAnalyticsViewModel;
}

/** A single hero statistic shown in the dashboard stat row. */
export interface IStat {
  key: string;
  label: string;
  value: number;
  caption: string;
  icon: React.ReactElement;
}
