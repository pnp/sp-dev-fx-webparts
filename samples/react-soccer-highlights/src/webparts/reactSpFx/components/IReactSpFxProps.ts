import { DisplayMode } from '@microsoft/sp-core-library';
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";

export interface IReactSpFxProps {
  title: string;
  displayMode: DisplayMode;
  pageSize: number;
  updateProperty: (value: string) => void;
  onConfigure: () => void;
}

export interface IVidesList {
  videos: IVideo[];
}

export interface IVideo {
  title: string;
  embed: string;
}

export interface ISportsHighlightsState {
  sportHighlightState: [];
}
export interface ISportsHighlightPagingState {
  currentPage: number;
  indexOfLastHighlight: number;
  indexOfFirstHighlight: number;
  highLightsPerPage: number;
}

export interface ISportsHightLightsProps {
  pageSize:number;
  sportsHighlights: [];
}

export interface ISide {
  name: string;
}
export interface ICompetition{
  name: string;
  id: number;
}

export interface ISportsHighlightProps {
  title: string;
  id: string;
  date: Date;
  side1: ISide;
  side2: ISide;
  competition: ICompetition;
  thumbnail: string;
  videos: IVideo[];
}




