import { removeLink } from "roosterjs-content-model-api";
import { RibbonItem } from "../type/RibbonItem";

/**
 * "Remove link" button on the format ribbon
 */
export const RemoveLinkButton: RibbonItem = {
  key: "buttonNameRemoveLink",
  text: "Remove link",
  iconName: "RemoveLink",
  type: "button",
  isDisabled: (formatState) => !formatState.canUnlink,
  onClick: (editor) => {
    removeLink(editor);
  },
};
