import { IPropertyPaneCustomFieldProps } from "@microsoft/sp-property-pane";
import { Theme } from "@fluentui/react-components";
import { SPFxHostType } from "./SPFxHostType";

/** Props stored inside the SPFx custom field builder */
export interface IRotationInternalProps extends IPropertyPaneCustomFieldProps {
  enabledLabel: string;
  modeLabel: string;
  intervalLabel: string;
  enabled: boolean;
  mode: "interval" | "refresh";
  intervalMs: number;
  theme: Theme;
  hostType: SPFxHostType;
  onEnabledChange: (newValue: boolean) => void;
  onModeChange: (newValue: "interval" | "refresh") => void;
  onIntervalChange: (newValue: number) => void;
}

/** Props forwarded to the React component */
export interface IRotationComponentProps {
  enabledLabel: string;
  modeLabel: string;
  intervalLabel: string;
  enabled: boolean;
  mode: "interval" | "refresh";
  intervalMs: number;
  theme: Theme;
  hostType: SPFxHostType;
  onEnabledChange: (newValue: boolean) => void;
  onModeChange: (newValue: "interval" | "refresh") => void;
  onIntervalChange: (newValue: number) => void;
}
