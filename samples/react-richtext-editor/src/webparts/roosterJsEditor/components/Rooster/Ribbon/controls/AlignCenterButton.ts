import { setAlignment } from "roosterjs-content-model-api";
import { RibbonItem } from "../type/RibbonItem";

/**
 * "Align center" button on the format ribbon
 */
export const AlignCenterButton: RibbonItem = {
  key: "buttonNameAlignCenter",
  text: "Align center",
  iconName: "AlignCenter",
  type: "button",
  onClick: (editor) => {
    setAlignment(editor, "center");
  },
};
