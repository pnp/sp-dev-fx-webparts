/* eslint-disable @typescript-eslint/no-explicit-any */
import { DisplayMode } from "@microsoft/sp-core-library";
import { IDesignConfigurations } from "../models/IDesignConfigurations";

export interface IListViewMetricsProps {
  // Core data
  metricsCollection: any[] | undefined;
  viewItems: any[] | undefined;
  listViewFields: any[] | undefined;

  // Display
  title: string;
  displayMode: DisplayMode;
  designConfigurations: IDesignConfigurations;

  // State
  isLoading?: boolean;
  loadingMessage?: string;
  error?: string;

  // Callbacks
  updateProperty: (value: string) => void;
}