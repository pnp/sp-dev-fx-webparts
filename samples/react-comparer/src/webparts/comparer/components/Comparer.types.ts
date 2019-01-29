import { DisplayMode } from "@microsoft/sp-core-library";

export interface IComparerProps {
  afterClassName?: string;
  afterImg: string;
  afterLabel: string;
  beforeClassName?: string;
  beforeImg: string;
  beforeLabel: string;
  className?: string;
  displayMode: DisplayMode;
  handleClassName?: string;
  height: number;
  startPosition: number;
  title: string;
  width: number;
  beforeAlternateText: string;
  afterAlternateText: string;
  onConfigure: () => void;
  onUpdateTitle: (value: string) => void;
}

export interface IComparerState {
  sliderPosition: number;
  sliderPositionX: number;
  showChooseImagePanel: boolean;
  hasLabels: boolean;
}
