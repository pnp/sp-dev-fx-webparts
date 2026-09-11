import * as React from 'react';
import { SPHttpClient } from '@microsoft/sp-http';
import { IDashboardConfig } from '../model/DashboardService';

export interface IListDashboardProps {
  spHttpClient: SPHttpClient;
  webUrl: string;
  config: IDashboardConfig;
  accent: string;
  showTitle: boolean;
  title: string;
  frameStyle: React.CSSProperties;
}
