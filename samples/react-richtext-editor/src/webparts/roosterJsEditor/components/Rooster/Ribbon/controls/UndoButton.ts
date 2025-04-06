import { undo } from "roosterjs-content-model-core";
import { RibbonItem } from "../type/RibbonItem";

/**
 * "Undo" button on the format ribbon
 */
export const UndoButton: RibbonItem = {
  key: "buttonNameUndo",
  text: "Undo",
  iconName: "Undo",
  type: "button",
  isDisabled: (formatState) => !formatState.canUndo,
  onClick: (editor) => {
    undo(editor);
  },
};
