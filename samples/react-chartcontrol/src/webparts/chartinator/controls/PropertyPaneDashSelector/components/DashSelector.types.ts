import { IDropdownOption } from '@fluentui/react/lib/Dropdown';

/**
 * Properties for the dash selector
 */
export interface IDashSelectorProps {
  disabled: boolean;
  label: string;
  options: IDropdownOption[];
  selectedKey: string | number;
  stateKey: string;
  onChanged: (option: IDropdownOption, index?: number) => void;
}

/**
 * Handles the dash selector state
 */
export interface IDashSelectorState {
  selectedKey: string | number;
}

/**
 * The various types of dash supported.
 * Feel free to add your own
 */
export enum DashType {
  Solid,
  Dot,
  Dash,
  DashDot,
  LongDash,
  LongDashDot,
  LongDashDotDot
}

/**
 * Describes the dash strokes.
 * https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash
 */
export const DashStrokes = {
  [DashType.Solid]: [],
  [DashType.Dot]: [2],
  [DashType.Dash]: [10, 5],
  [DashType.DashDot]: [10, 5, 2, 5],
  [DashType.LongDash]: [16, 5],
  [DashType.LongDashDot]: [16, 5, 3, 5],
  [DashType.LongDashDotDot]: [16, 5, 3, 5, 3, 5]
};
