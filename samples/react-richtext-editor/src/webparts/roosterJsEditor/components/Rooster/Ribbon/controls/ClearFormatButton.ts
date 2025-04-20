import { clearFormat } from "roosterjs-content-model-api";
import { RibbonItem } from "../type/RibbonItem";

export const ClearFormatButton: RibbonItem = {
  key: "buttonNameClearFormat",
  type: "button",
  text: "Clear Format",
  value: "ClearFormat",
  iconName: "TextClearFormattingRegular",
  onClick: (editor) => {
    clearFormat(editor);
  },
};
