import { redo } from "roosterjs-content-model-core";
import { RibbonItem } from "../type/RibbonItem";

/**
 * "Undo" button on the format ribbon
 */
export const RedoButton: RibbonItem = {
  key: "buttonNameRedo",
  text: "Redo",
  iconName: "Redo",
  type: "button",
  isDisabled: (formatState) => !formatState.canRedo,
  onClick: (editor) => {
    redo(editor);
  },
};
