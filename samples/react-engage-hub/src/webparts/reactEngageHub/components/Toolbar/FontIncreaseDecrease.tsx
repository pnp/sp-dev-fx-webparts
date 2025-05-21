import { setFontSize } from "roosterjs-content-model-api"
import { IEditor } from "roosterjs-content-model-types"

export const increaseFontSize = (editor: IEditor) => {
  if (!editor) return
  editor.focus()
  const domSelection = editor.getDOMSelection()
  if (!domSelection || !domSelection.type || domSelection.type !== "range")
    return
  const node =
    domSelection.range?.startContainer.nodeType === Node.ELEMENT_NODE
      ? (domSelection.range.startContainer as HTMLElement)
      : (domSelection.range?.startContainer?.parentElement as HTMLElement)
  if (!node) return
  const computedStyle = window.getComputedStyle(node)
  const currentPx = parseFloat(computedStyle.fontSize || "14px")
  const newSize = Math.max(currentPx + 2, 8)
  setFontSize(editor, `${newSize}px`)
}

export const decreaseFontSize = (editor: IEditor) => {
  if (!editor) return
  editor.focus()
  const domSelection = editor.getDOMSelection()
  if (!domSelection || !domSelection.type || domSelection.type !== "range")
    return
  const node =
    domSelection.range?.startContainer.nodeType === Node.ELEMENT_NODE
      ? (domSelection.range.startContainer as HTMLElement)
      : (domSelection.range?.startContainer?.parentElement as HTMLElement)
  if (!node) return
  const computedStyle = window.getComputedStyle(node)
  const currentPx = parseFloat(computedStyle.fontSize || "14px")
  const newSize = Math.max(currentPx - 2, 8)
  setFontSize(editor, `${newSize}px`)
}
