import { promoteLink } from "roosterjs-content-model-api";
import type { DeleteSelectionStep } from "roosterjs-content-model-types";

/**
 * @internal
 */
export const handleAutoLink: DeleteSelectionStep = (context) => {
  const { deleteResult, insertPoint } = context;

  if (deleteResult === "notDeleted" || deleteResult === "nothingToDelete") {
    const { marker, paragraph } = insertPoint;
    const index = paragraph.segments.indexOf(marker);
    const segBefore = index > 0 ? paragraph.segments[index - 1] : null;

    if (
      segBefore?.segmentType === "Text" &&
      promoteLink(segBefore, paragraph, {
        autoLink: true,
      }) &&
      context.formatContext
    ) {
      context.formatContext.canUndoByBackspace = true;
    }

    // Do not set deleteResult here since we haven't really start a new paragraph, we need other delete step to keep working on it
  }
};
