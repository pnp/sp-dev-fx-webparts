import { Image } from "@fluentui/react-components";
import {
  TextBoldRegular,
  TextClearFormattingRegular,
  TextItalicRegular,
  TextQuoteRegular,
  TextUnderlineRegular,
  ArrowUndoRegular,
  ArrowRedoRegular,
  TextAlignLeftRegular,
  TextAlignCenterRegular,
  TextAlignRightRegular,
  TextBulletListRegular,
  TextNumberListLtrRegular,
  TextStrikethroughRegular,
  ImageRegular,
  LinkRegular,
} from "@fluentui/react-icons";
import * as React from "react";

import UnLink from "./icons/unlink.svg";

export const IconFactory = (iconName: string): JSX.Element | undefined => {
  switch (iconName) {
    case "TextBoldRegular":
      return <TextBoldRegular />;
    case "TextItalicRegular":
      return <TextItalicRegular />;
    case "TextUnderlineRegular":
      return <TextUnderlineRegular />;
    case "TextClearFormattingRegular":
      return <TextClearFormattingRegular />;
    case "TextQuoteRegular":
      return <TextQuoteRegular />;
    case "Undo":
      return <ArrowUndoRegular />;
    case "Redo":
      return <ArrowRedoRegular />;
    case "AlignLeft":
      return <TextAlignLeftRegular />;
    case "AlignCenter":
      return <TextAlignCenterRegular />;
    case "AlignRight":
      return <TextAlignRightRegular />;
    case "BulletedList":
      return <TextBulletListRegular />;
    case "NumberedList":
      return <TextNumberListLtrRegular />;
    case "Strikethrough":
      return <TextStrikethroughRegular />;
    case "imageIcon":
      return <ImageRegular />;
    case "Link":
      return <LinkRegular />;
    case "RemoveLink":
      return <Image height={30} width={30} src={UnLink} />;
    default:
      return null;
  }
};
