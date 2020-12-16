import { DisplayMode } from '@microsoft/sp-core-library';
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";

export interface IReactSpFxProps {
  title: string;
  displayMode: DisplayMode;
  pageSize: number;
  showFlatMode: boolean;
  updateProperty: (value: string) => void;
  onConfigure: () => void;
}

export interface IVideosList {
  videos: IVideo[];
}

export interface IVideo {
  title: string;
  embed: string;
}

export interface ISportsHighlightsState {
  sportHighlightState: any;
}
export interface ISportsHighlightPagingState {
  pagedSportHighlights?: ISportsHighlightProps[];
  slicedSportHighlights?: ISportsHighlightProps[];
}

export interface ISportsHightLightsProps {
  pageSize:number;
  showFlatMode: boolean;
}

export interface ISide {
  name: string;
}
export interface ICompetition{
  name: string;
  id: number;
}

export interface ISportsHighlights {
  highLights?: ISportsHighlightProps[];
}

export interface ISportsHighlightProps {
  title: string;
  embed: string;
  id: string;
  date: Date;
  side1: ISide;
  side2: ISide;
  competition: ICompetition;
  thumbnail: string;
  videos: IVideo[];
  url: string;
}




