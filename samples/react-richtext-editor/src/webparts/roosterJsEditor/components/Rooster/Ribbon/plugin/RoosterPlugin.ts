/* eslint-disable no-console */
import { IEditor, PluginEvent } from "roosterjs-content-model-types";
import { keyboardEnter } from "../../edit/keyboardEnter";
import { IRoosterPlugin } from "../type/IRoosterPlugin";

class RoosterPlugin implements IRoosterPlugin {
  public editor: IEditor | undefined = undefined;

  getName(): string {
    return "HelloRooster";
  }

  initialize(editor: IEditor): void {
    this.editor = editor;
  }

  dispose(): void {
    this.editor = null;
  }

  onPluginEvent(event: PluginEvent): void {
    if (event.eventType === "keyPress" || event.eventType === "keyDown") {
      if (event.rawEvent.key === "Enter") {
        //console.log("Enter key pressed");
        const editor = this.editor;
        // const selection = editor.getDOMSelection();
        // console.log("Selection: ", selection);
        keyboardEnter(editor, event.rawEvent as KeyboardEvent, true);
      }
    }
    if (event.eventType === "contentChanged") {
      //console.log("Content changed");
    }
  }
  willHandleEventExclusively(event: PluginEvent): boolean {
    return false;
  }
}

export default RoosterPlugin;
