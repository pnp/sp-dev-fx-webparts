import { DisplayMode } from '@microsoft/sp-core-library';

export interface IChartTitleProps {
  className?: string;
  displayMode: DisplayMode;
  placeholder?: string;
  title: string;
  updateTitle: (value: string) => void;
}
