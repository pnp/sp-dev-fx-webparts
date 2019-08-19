import { IPropertyPaneFilePickerProps } from '.';

export interface IPropertyPaneFilePickerHostProps extends IPropertyPaneFilePickerProps {
  onChanged: (value: string) => void;
}

export interface IPropertyPaneFilePickerHostState {
  showFullNav: boolean; // reserved for future use
  panelOpen: boolean;
  selectedTab: string;
}
