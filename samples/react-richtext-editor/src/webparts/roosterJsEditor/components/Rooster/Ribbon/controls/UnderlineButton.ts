import { toggleUnderline } from "roosterjs-content-model-api";
import { RibbonItem } from "../type/RibbonItem";

export const UnderlineButton: RibbonItem = {
  key: "buttonNameUnderline",
  type: "toggle",
  text: "Underline",
  value: "underline",
  iconName: "TextUnderlineRegular",
  onClick: (editor) => toggleUnderline(editor),
};
