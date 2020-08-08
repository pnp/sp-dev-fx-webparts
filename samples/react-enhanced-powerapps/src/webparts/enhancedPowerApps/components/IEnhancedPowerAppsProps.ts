import { DynamicProperty } from '@microsoft/sp-component-base';
import { DisplayMode } from "@microsoft/sp-core-library";
import { IReadonlyTheme } from '@microsoft/sp-component-base';

export interface IEnhancedPowerAppsProps {
  /**
   * The current web part culture
   */
  locale: string;

  /**
   * Event handler for clicking the Configure button on the Placeholder
   */
  onConfigure: () => void;

  /**
   * The selected dynamic property to pass
   */
  dynamicProp: string;

  /**
   * The parameter name of the dynamic prop
   *
   */
  dynamicPropName: string;

  /**
   * Whether we use dynamic props
   */
  useDynamicProp: boolean;

  /**
   * Power Apps
   */
  appWebLink: string;

  /**
   * Width
   */
  width: number;

  /**
   * Height
   */
  height: number;

  /**
   * Support theme variant
   */
  themeVariant: IReadonlyTheme | undefined;

  /**
   * Whether we show border or not
   */
  border: boolean;

  /**
   * Selected theme values to pass to Power Apps
   */
  themeValues: string[];
}
