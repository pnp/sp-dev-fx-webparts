import { toggleNumbering } from "roosterjs-content-model-api";
import { RibbonItem } from "../type/RibbonItem";

/**
 * "Numbering list" button on the format ribbon
 */
export const NumberedListButton: RibbonItem = {
  key: "buttonNameNumberedList",
  text: "Numbered list",
  type: "button",
  iconName: "NumberedList",
  isChecked: (formatState) => !!formatState.isNumbering,
  onClick: (editor) => {
    toggleNumbering(editor);
  },
};
