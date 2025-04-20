import { mutateBlock } from "roosterjs-content-model-dom";
import type { DeleteSelectionStep } from "roosterjs-content-model-types";
import { splitParagraph } from "../utils/splitParagraph";

/**
 * @internal
 */
export const handleEnterOnParagraph: DeleteSelectionStep = (context) => {
  const { paragraph, path } = context.insertPoint;
  const paraIndex = path[0]?.blocks.indexOf(paragraph) ?? -1;

  if (context.deleteResult === "notDeleted" && paraIndex >= 0) {
    const newPara = splitParagraph(context.insertPoint);

    mutateBlock(path[0]).blocks.splice(paraIndex + 1, 0, newPara);

    context.deleteResult = "range";
    context.lastParagraph = newPara;
    context.insertPoint.paragraph = newPara;
  }
};
