//import { adjustLinkSelection, insertLink } from "roosterjs-content-model-api";
//import { showLinkDialog } from "../dialogs/showLinkPopover";
import { RibbonItem } from "../type/RibbonItem";

/**
 * "Insert link" button on the format ribbon
 */
export const InsertLinkButton: RibbonItem = {
  key: "buttonNameInsertLink",
  text: "Insert link",
  type: "link",
  iconName: "Link",
};
