export interface IDesignConfigurations {
  // Layout & container
  viewDesign?: string;
  containerWidth?: number;
  cardFlexBoxValue?: string;
  cardBoxRadius?: number;
  cardBoxShadow?: boolean;
  cardDefaultBackgroundColor?: string;
  cardMarginTop?: number;
  cardMarginBottom?: number;

  // Icon styling
  iconFontSize?: number;
  iconFontColor?: string;

  // Header text styling
  headerFontSize?: number;
  headerFontWeight?: number;
  headerFontColor?: string;

  // Body text styling
  bodyFontSize?: number;
  bodyFontWeight?: number;
  bodyFontColor?: string;

  // Target text styling
  targetFontSize?: number;
  targetFontWeight?: number;
  targetEffectiveFontColor?: string;
  targetInEffectiveFontColor?: string;

  // Animation
  showNumberAnimation?: boolean;
  animationTimeLength?: number;
}
