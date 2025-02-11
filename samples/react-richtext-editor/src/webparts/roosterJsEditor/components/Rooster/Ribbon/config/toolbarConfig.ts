import { AlignCenterButton } from "../controls/AlignCenterButton";
import { AlignLeftButton } from "../controls/AlignLeftButton";
import { AlignRightButton } from "../controls/AlignRightButton";
import { BlockQuoteButton } from "../controls/BlockQuoteButton";
import { BoldButton } from "../controls/BoldButton";
import { BulletedListButton } from "../controls/BulletedListButton";
import { ClearFormatButton } from "../controls/ClearFormatButton";
import { FontSizeDropdown } from "../controls/FontSizeDropdown";
import { HeadingLevelDropdown } from "../controls/HeadingLevelDropdown";
import { InsertImageButton } from "../controls/InsertImageButton";
import { InsertLinkButton } from "../controls/InsertLinkButton";
import { ItalicButton } from "../controls/ItalicButton";
import { NumberedListButton } from "../controls/NumberedListButton";
import { RedoButton } from "../controls/RedoButton";
import { RemoveLinkButton } from "../controls/RemoveLinkButton";
import { Separator } from "../controls/Separator";
import { StrikethroughButton } from "../controls/StrikethroughButton";
import { UnderlineButton } from "../controls/UnderlineButton";
import { UndoButton } from "../controls/UndoButton";

const controlMapping = {
  redo: RedoButton,
  undo: UndoButton,
  heading: HeadingLevelDropdown,
  fontSize: FontSizeDropdown,
  bold: BoldButton,
  italic: ItalicButton,
  underline: UnderlineButton,
  blockQuote: BlockQuoteButton,
  clearFormat: ClearFormatButton,
  separator: Separator,
  left: AlignLeftButton,
  center: AlignCenterButton,
  right: AlignRightButton,
  bulletedList: BulletedListButton,
  numberedList: NumberedListButton,
  strikethrough: StrikethroughButton,
  insertImage: InsertImageButton,
  insertLink: InsertLinkButton,
  removeLink: RemoveLinkButton,
};

const ribbonButtons = [
  "redo",
  "undo",
  "separator",
  "heading",
  "fontSize",
  "bold",
  "italic",
  "underline",
  "blockQuote",
  "strikethrough",
  "separator",
  "left",
  "center",
  "right",
  "separator",
  "bulletedList",
  "numberedList",
  "separator",
  "clearFormat",
  "separator",
  "insertLink",
  "removeLink",
  "insertImage",
];

export const RibbonControls = ribbonButtons.map((button) => controlMapping[button]);
