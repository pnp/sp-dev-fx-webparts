import { setFontSize } from "roosterjs-content-model-api";
import { RibbonItem } from "../type/RibbonItem";

const fontSizeOptions = [
  { key: "8px", text: "8" },
  { key: "10px", text: "10" },
  { key: "12px", text: "12" },
  { key: "14px", text: "14" },
  { key: "18px", text: "18" },
  { key: "24px", text: "24" },
  { key: "36px", text: "36" },
  { key: "48px", text: "48" },
  { key: "60px", text: "60" },
  { key: "72px", text: "72" },
];

export const FontSizeDropdown: RibbonItem = {
  key: "fontSizeDropdown",
  text: "Font Size",
  value: "fontSize",
  type: "dropdown",
  styles: { minWidth: 40 },
  dropdownProps: {
    placeholder: "Font Size",
    options: fontSizeOptions,
  },
  onOptionSelect: (editor, event, data) => {
    setFontSize(editor, data.optionValue);
  },
};
