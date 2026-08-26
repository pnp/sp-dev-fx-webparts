import { toggleBlockQuote } from "roosterjs-content-model-api";
import type { ContentModelFormatContainerFormat } from "roosterjs-content-model-types";
import { RibbonItem } from "../type/RibbonItem";

const DefaultQuoteFormatLtr: ContentModelFormatContainerFormat = {
  borderLeft: "3px solid rgb(200, 200, 200)",
  textColor: "rgb(102, 102, 102)",
};

const DefaultQuoteFormatRtl: ContentModelFormatContainerFormat = {
  borderRight: "3px solid rgb(200, 200, 200)",
  textColor: "rgb(102, 102, 102)",
};

export const BlockQuoteButton: RibbonItem = {
  key: "buttonNameBlockQuote",
  type: "toggle",
  text: "Block Quote",
  value: "BlockQuote",
  iconName: "TextQuoteRegular",
  onClick: (editor) => toggleBlockQuote(editor, DefaultQuoteFormatLtr, DefaultQuoteFormatRtl),
};
