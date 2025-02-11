import { unwrapBlock, getClosestAncestorBlockGroupIndex, createFormatContainer, mutateBlock } from "roosterjs-content-model-dom";
import type {
  DeleteSelectionStep,
  ReadonlyContentModelBlockGroup,
  ReadonlyContentModelFormatContainer,
  ReadonlyContentModelParagraph,
  ShallowMutableContentModelFormatContainer,
  ShallowMutableContentModelParagraph,
} from "roosterjs-content-model-types";

/**
 * @internal
 */

const insertNewLine = (
  quote: ShallowMutableContentModelFormatContainer,
  parent: ReadonlyContentModelBlockGroup,
  quoteIndex: number,
  paragraph: ShallowMutableContentModelParagraph,
) => {
  const paraIndex = quote.blocks.indexOf(paragraph);

  if (paraIndex >= 0) {
    const mutableParent = mutateBlock(parent);

    if (paraIndex < quote.blocks.length - 1) {
      const newQuote: ShallowMutableContentModelFormatContainer = createFormatContainer(quote.tagName, quote.format);

      newQuote.blocks.push(...quote.blocks.splice(paraIndex + 1, quote.blocks.length - paraIndex - 1));

      mutableParent.blocks.splice(quoteIndex + 1, 0, newQuote);
    }

    mutableParent.blocks.splice(quoteIndex + 1, 0, paragraph);
    quote.blocks.splice(paraIndex, 1);

    if (quote.blocks.length === 0) {
      mutableParent.blocks.splice(quoteIndex, 0);
    }
  }
};

const isEmptyParagraph = (paragraph: ReadonlyContentModelParagraph) => {
  return paragraph.segments.every((s) => s.segmentType === "SelectionMarker" || s.segmentType === "Br");
};

const isEmptyQuote = (quote: ReadonlyContentModelFormatContainer) => {
  return quote.blocks.length === 1 && quote.blocks[0].blockType === "Paragraph" && isEmptyParagraph(quote.blocks[0]);
};

export const deleteEmptyQuote: DeleteSelectionStep = (context) => {
  const { deleteResult } = context;

  if (deleteResult === "nothingToDelete" || deleteResult === "notDeleted" || deleteResult === "range") {
    const { insertPoint, formatContext } = context;
    const { path, paragraph } = insertPoint;
    const rawEvent = formatContext?.rawEvent as KeyboardEvent;
    const index = getClosestAncestorBlockGroupIndex(path, ["FormatContainer"], ["TableCell", "ListItem"]);
    const quote = path[index];

    if (quote && quote.blockGroupType === "FormatContainer" && quote.tagName === "blockquote") {
      const parent = path[index + 1];
      const quoteBlockIndex = parent.blocks.indexOf(quote);

      if (isEmptyQuote(quote)) {
        unwrapBlock(parent, quote);
        rawEvent?.preventDefault();
        context.deleteResult = "range";
      } else if (rawEvent?.key === "Enter" && quote.blocks.indexOf(paragraph) >= 0 && isEmptyParagraph(paragraph)) {
        insertNewLine(mutateBlock(quote), parent, quoteBlockIndex, paragraph);
        rawEvent?.preventDefault();
        context.deleteResult = "range";
      }
    }
  }
};
