import { toggleStrikethrough } from "roosterjs-content-model-api";
import { RibbonItem } from "../type/RibbonItem";

/**
 * "Strikethrough" button on the format ribbon
 */
export const StrikethroughButton: RibbonItem = {
  key: "buttonNameStrikethrough",
  text: "Strikethrough",
  type: "button",
  iconName: "Strikethrough",
  isChecked: (formatState) => !!formatState.isStrikeThrough,
  onClick: (editor) => {
    toggleStrikethrough(editor);
  },
};
