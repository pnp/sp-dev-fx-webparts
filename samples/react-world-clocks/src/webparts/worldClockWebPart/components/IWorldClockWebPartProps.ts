import { DisplayMode } from "@microsoft/sp-core-library";

export interface IWorldClockWebPartProps {
  selectedList: string;
  description: string;
  loadLocations: () => Promise<ILocation[]>;
  ShowTime: boolean;
  showActiveOnly: boolean;
  showTitle: boolean;
  displayMode: DisplayMode;
  updateProperty: (value: string) => void;
  onConfigure: () => void;
}

export interface ILocation {
  Title?: string;
  GMTValues?: number;
}
export interface IWorldClockWebPartState {
  clocks?: any[];
}
