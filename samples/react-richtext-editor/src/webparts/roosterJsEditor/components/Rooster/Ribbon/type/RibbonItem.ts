import type { ToolbarButtonProps, ToolbarToggleButtonProps, MenuProps } from "@fluentui/react-components";
import type { ContentModelFormatState, IEditor } from "roosterjs-content-model-types";
import { ExtendedDropdownProps } from "./ExtendedDropdownProps";
import { UIUtilities } from "./UIUtilities";

/**
 * Represents a control on the format ribbon, which can be a button, toggle button, dropdown, or context menu.
 */
export interface RibbonItem {
  /**
   * Key of this control, needs to be unique
   */
  key: string;

  /**
   * Name of the control's icon. See https://developer.microsoft.com/en-us/fluentui#/styles/web/icons for all icons
   */
  iconName?: string;

  /**
   * True if we need to flip the icon when rendered in a Right-to-left page
   */
  flipWhenRtl?: boolean;

  /**
   * Text of the control. This text is not localized. To show a localized text, pass a dictionary to Ribbon component via RibbonProps.strings.
   */
  text: string;

  /**
   * Value of the control, used to identify the control in the editor
   */
  value?: string;

  /**
   * Type of the control. Defaults to 'button'.
   */
  type: "button" | "toggle" | "dropdown" | "menu" | "separator" | "link";

  /**
   * Click handler of this control. Used for buttons and toggle buttons.
   * @param editor The editor instance
   * @param key Key of the control that is clicked
   * @param strings Localized strings used by any UI element of this click handler
   */
  onClick?: (
    editor: IEditor,
    key?: string,
    uiHandler?: UIUtilities,
    e?: React.KeyboardEvent<HTMLElement> | React.MouseEvent<HTMLElement, MouseEvent>,
  ) => void;

  /**
   * Get if the current button should be checked
   * @param formatState The current formatState of editor
   * @returns True to show the button in a checked state, otherwise false
   * @default False When not specified, it is treated as always returning false
   */
  isChecked?: (formatState: ContentModelFormatState) => boolean;

  /**
   * Get if the current button should be disabled
   * @param formatState The current formatState of editor
   * @returns True to show the button in a disabled state, otherwise false
   * @default False When not specified, it is treated as always returning false
   */
  isDisabled?: (formatState: ContentModelFormatState) => boolean;

  /**
   * Dropdown-specific properties. Used when type is 'dropdown'.
   */
  dropdownProps?: ExtendedDropdownProps;

  /**Inline styles */
  styles?: React.CSSProperties;

  onOptionSelect?: (editor: IEditor, event: React.MouseEvent<HTMLElement>, data: { optionValue: string }) => void;
  /**
   * Menu-specific properties. Used when type is 'menu'.
   */
  menuProps?: MenuProps;

  // eslint-disable-next-line prettier/prettier
  popoverProps?:any;

  /**
   * Use this property to pass in Fluent UI ToolbarButton or ToolbarToggleButton properties directly.
   * It will overwrite the values of other conflicting properties.
   */
  toolbarButtonProperties?: Partial<ToolbarButtonProps | ToolbarToggleButtonProps>;
}
