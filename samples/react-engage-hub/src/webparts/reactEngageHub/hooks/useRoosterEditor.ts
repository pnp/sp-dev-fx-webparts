import { useEffect, useRef, useState } from "react"
import { Editor } from "roosterjs-content-model-core"
import { AutoFormatPlugin, HyperlinkPlugin } from "roosterjs"
import { ContentChangePlugin } from "../components/plugins/ContentChangePlugin"

type RoosterEditorProps = {
  isDarkTheme: boolean
  setContent: React.Dispatch<any>
  handleLink: (anchor: HTMLAnchorElement, mouseEvent: MouseEvent) => void
}

export function useRoosterEditor({
  isDarkTheme,
  setContent,
  handleLink,
}: RoosterEditorProps) {
  const editorDivRef = useRef<HTMLDivElement>(null)
  const [editor, setEditor] = useState<Editor | null>(null)

  useEffect(() => {
    if (editorDivRef.current && !editor) {
      const rooster = new Editor(editorDivRef.current, {
        plugins: [
          new AutoFormatPlugin({
            autoBullet: true,
            autoLink: true,
            autoNumbering: true,
            autoUnlink: false,
            autoHyphen: true,
            autoFraction: true,
            autoOrdinals: true,
          }),
          new HyperlinkPlugin(undefined, "_blank", handleLink),
            ContentChangePlugin((html) => {
            // Remove HTML tags and replace &nbsp; with space, then trim
            const text = html
              ? html.replace(/<[^>]*>/g, '').replace(/&nbsp;/gi, ' ').trim()
              : '';
            const isOnlySpaces = !text;
            setContent(isOnlySpaces ? null : html);
          }),
        ],
      })
      rooster.setDarkModeState(isDarkTheme)
      setEditor(rooster)
    }
    return () => {
      editor?.dispose()
    }
  }, [])

  return { editor, editorDivRef }
}
