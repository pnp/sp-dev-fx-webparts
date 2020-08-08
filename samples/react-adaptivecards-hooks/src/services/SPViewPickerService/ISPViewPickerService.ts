import { ISPViews } from "../../controls/PropertyFieldViewPicker";

export interface ISPViewPickerService {
  getViews(): Promise<ISPViews>;
}

