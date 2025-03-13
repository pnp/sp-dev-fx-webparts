import { toggleCode } from "roosterjs-content-model-api";
import { Editor } from "roosterjs-content-model-core";
import { RibbonItem } from "../type/RibbonItem";

/**
 * "Code" button on the format ribbon
 */
export const codeButton: RibbonItem = {
  key: "buttonNameCode",
  type: "toggle",
  text: "Code",
  value: "Code",
  iconName: "CodeSnippetIcon",
  isChecked: (formatState: { isCodeInline: boolean }) => !!formatState.isCodeInline,
  onClick: (editor: Editor) => {
    toggleCode(editor);
  },
};
