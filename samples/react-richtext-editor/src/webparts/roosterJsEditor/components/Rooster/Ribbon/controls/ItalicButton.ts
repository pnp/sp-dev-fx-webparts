import { toggleItalic } from "roosterjs-content-model-api";
import { RibbonItem } from "../type/RibbonItem";

export const ItalicButton: RibbonItem = {
  key: "buttonNameItalic",
  type: "toggle",
  text: "Italic",
  value: "Italic",
  iconName: "TextItalicRegular",
  onClick: (editor) => toggleItalic(editor),
};
