import { setAlignment } from "roosterjs-content-model-api";
import { RibbonItem } from "../type/RibbonItem";

/**
 * "Align left" button on the format ribbon
 */
export const AlignLeftButton: RibbonItem = {
  key: "buttonNameAlignLeft",
  text: "Align left",
  iconName: "AlignLeft",
  type: "button",
  onClick: (editor) => {
    setAlignment(editor, "left");
  },
};
