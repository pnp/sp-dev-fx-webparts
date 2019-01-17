import * as React from 'react';
import { DisplayMode } from '@microsoft/sp-core-library';

export interface IChartTitleProps {
  displayMode: DisplayMode;
  title: string;
  updateTitle: (value: string) => void;
  className?: string;
  placeholder?: string;
}
