import { toggleBullet } from "roosterjs-content-model-api";
import { RibbonItem } from "../type/RibbonItem";

/**
 * "Bulleted list" button on the format ribbon
 */
export const BulletedListButton: RibbonItem = {
  key: "buttonNameBulletedList",
  text: "Bulleted list",
  iconName: "BulletedList",
  type: "button",
  onClick: (editor) => {
    toggleBullet(editor);
  },
};
