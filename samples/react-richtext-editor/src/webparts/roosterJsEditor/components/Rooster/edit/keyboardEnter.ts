import { ChangeSource, deleteSelection, normalizeContentModel, runEditSteps } from "roosterjs-content-model-dom";
import type { IEditor } from "roosterjs-content-model-types";
import { deleteEmptyQuote } from "./deleteSteps/deleteEmptyQuote";
import { handleAutoLink } from "./inputSteps/handleAutoLink";
import { handleEnterOnList } from "./inputSteps/handleEnterOnList";
import { handleEnterOnParagraph } from "./inputSteps/handleEnterOnParagraph";

/**
 * @internal
 */
export function keyboardEnter(editor: IEditor, rawEvent: KeyboardEvent, handleNormalEnter: boolean) {
  const selection = editor.getDOMSelection();

  editor.formatContentModel(
    (model, context) => {
      // 1. delete the expanded selection if any, then merge paragraph
      const result = deleteSelection(model, [], context);

      // 2. Add line break
      if (selection && selection.type !== "table") {
        // For ENTER key, although we may have deleted something, since we still need to split the line, we always treat it as not delete
        // so further delete steps can keep working
        result.deleteResult = "notDeleted";

        const steps = rawEvent.shiftKey ? [] : [handleAutoLink, handleEnterOnList, deleteEmptyQuote];

        if (handleNormalEnter) {
          steps.push(handleEnterOnParagraph);
        }

        runEditSteps(steps, result);
      }

      if (result.deleteResult === "range") {
        // We have deleted something, next input should inherit the segment format from deleted content, so set pending format here
        context.newPendingFormat = result.insertPoint?.marker.format;

        normalizeContentModel(model);

        rawEvent.preventDefault();
        return true;
      } else {
        return false;
      }
    },
    {
      rawEvent,
      scrollCaretIntoView: true,
      changeSource: ChangeSource.Keyboard,
      getChangeData: () => rawEvent.which,
      apiName: "handleEnterKey",
    },
  );
}
