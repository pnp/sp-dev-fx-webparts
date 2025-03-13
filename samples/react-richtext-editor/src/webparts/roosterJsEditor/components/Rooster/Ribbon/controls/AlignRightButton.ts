import { setAlignment } from "roosterjs-content-model-api";
import { RibbonItem } from "../type/RibbonItem";

/**
 * "Align right" button on the format ribbon
 */
export const AlignRightButton: RibbonItem = {
  key: "buttonNameAlignRight",
  text: "Align right",
  iconName: "AlignRight",
  type: "button",
  onClick: (editor) => {
    setAlignment(editor, "right");
  },
};
