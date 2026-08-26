import {
  EditorPlugin,
  IEditor,
  PluginEvent,
} from "roosterjs-content-model-types"
import { exportContent } from "roosterjs-content-model-core"

export function ContentChangePlugin(
  onChange: (html: string) => void
): EditorPlugin {
  let editor: IEditor | null = null

  return {
    getName: () => "ContentChangePlugin",

    initialize(e: IEditor) {
      editor = e
    },

    dispose() {
      editor = null
    },

    onPluginEvent(event: PluginEvent) {
      if (
        editor &&
        (event.eventType === "input" || event.eventType === "contentChanged")
      ) {
        const html = exportContent(editor, "HTML")
        onChange(html)
      }
    },
  }
}
