import { IPropertyPaneCustomFieldProps } from "@microsoft/sp-property-pane";
import { Theme } from "@fluentui/react-components";
import { HeroMosaicOverflowMode } from "@spteck/react-controls-v2";
import { SPFxHostType } from "./SPFxHostType";

export interface IMosaicOverflowInternalProps extends IPropertyPaneCustomFieldProps {
  label: string | JSX.Element;
  value: HeroMosaicOverflowMode;
  theme: Theme;
  hostType: SPFxHostType;
  onChange: (newValue: HeroMosaicOverflowMode) => void;
}

export interface IMosaicOverflowComponentProps {
  label: string | JSX.Element;
  value: HeroMosaicOverflowMode;
  theme: Theme;
  hostType: SPFxHostType;
  onChange: (newValue: HeroMosaicOverflowMode) => void;
}
