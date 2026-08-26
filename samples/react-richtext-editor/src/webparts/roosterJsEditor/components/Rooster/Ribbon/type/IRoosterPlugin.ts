import type { EditorPlugin } from "roosterjs-content-model-types";

/**
 * Represents a plugin to connect format ribbon component and the editor
 */
export interface IRoosterPlugin extends EditorPlugin {
  // /**
  //  * When user clicks on a button, call this method to let the plugin to handle this click event
  //  * @param button The button that is clicked
  //  * @param key Key of child menu item that is clicked if any
  //  * @param strings The localized string map for this button
  //  */
  // onButtonClick: (
  //     button: RibbonItem,
  //     key?: string,
  //     strings?: string
  // ) => void;
  // /**
  //  * Enter live preview state (shadow edit) of editor if there is a non-collapsed selection
  //  * @param button The button that triggered this action
  //  * @param key Key of the hovered button sub item
  //  * @param strings The localized string map for this button
  //  */
  // startLivePreview: (
  //     button: RibbonItem,
  //     key?: string,
  //     strings?: string
  // ) => void;
  // /**
  //  * Leave live preview state (shadow edit) of editor
  //  */
  // stopLivePreview: () => void;
}
