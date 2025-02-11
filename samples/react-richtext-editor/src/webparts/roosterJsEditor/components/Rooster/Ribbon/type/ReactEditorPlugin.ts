import type { EditorPlugin } from "roosterjs-content-model-types";
import type { UIUtilities } from "./UIUtilities";

/**
 * A sub interface of EditorPlugin to provide additional functionalities for rendering react component from the plugin
 */
export interface ReactEditorPlugin extends EditorPlugin {
  /**
   * Set the UI utilities objects to this plugin to help render additional UI elements
   * @param uiUtilities The UI utilities object to set
   */
  setUIUtilities(uiUtilities: UIUtilities): void;
}
