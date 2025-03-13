import { setFontSize, setHeadingLevel } from "roosterjs-content-model-api";
import { RibbonItem } from "../type/RibbonItem";

const headingLevelOptions = [
  { key: "0", text: "Normal" },
  { key: "2", text: "Heading 2" },
  { key: "3", text: "Heading 3" },
  { key: "4", text: "Heading 4" },
];

export const HeadingLevelDropdown: RibbonItem = {
  key: "headingLevelDropdown",
  text: "Heading Level",
  value: "headingLevel",
  type: "dropdown",
  styles: { minWidth: 50 },
  dropdownProps: {
    placeholder: "Heading Level",
    options: headingLevelOptions,
    defaultSelectedKey: "Normal",
  },
  onOptionSelect: (editor, event, data) => {
    const headingLevel = parseInt(data.optionValue, 10) as 0 | 2 | 3 | 4;
    if (headingLevel === 0) {
      editor.setEditorStyle("font-size", "18px");
      setFontSize(editor, "18px");
    }
    setHeadingLevel(editor, headingLevel);
  },
};
