import * as React from "react";
import { useEffect } from "react";
import {
  PastePlugin,
  IEditor,
  AutoFormatPlugin,
  MarkdownPlugin,
  EditPlugin,
  ShortcutPlugin,
  TableEditPlugin,
  WatermarkPlugin,
  ImageEditPlugin,
  getDarkColor,
  Editor,
  // insertEntity,
  // InsertEntityOptions,
  insertLink,
} from "roosterjs";

import "./Rooster.css";

const RoosterTest: React.FC = () => {
  const editorDivRef = React.useRef<HTMLDivElement>(null);
  const [editor, setEditor] = React.useState<IEditor>({} as IEditor);

  useEffect(() => {
    if (editorDivRef.current) {
      const plugins = [
        new AutoFormatPlugin({
          autoBullet: true,
          autoLink: true,
          autoNumbering: true,
          autoUnlink: false,
          autoHyphen: true,
          autoFraction: true,
          autoOrdinals: true,
        }),
        new EditPlugin(),
        new PastePlugin(),
        new TableEditPlugin(),
        new ShortcutPlugin(),
        new WatermarkPlugin("Type content here ..."),
        new MarkdownPlugin({
          bold: true,
          italic: true,
          strikethrough: true,
          codeFormat: {},
        }),
        new ImageEditPlugin(),
      ];

      const options = {
        plugins: plugins,
        getDarkColor: getDarkColor,
      };
      const editor = new Editor(editorDivRef.current, options);
      setEditor(editor);

      // Ensure the editor has focus
      editor.focus();

      return () => {
        if (editor) {
          editor.dispose();
        }
      };
    }
  }, [editorDivRef]);

  const insertLinkButton = () => {
    if (editor) {
      insertLink(editor, "https://www.bing.com", "Bing");
      // Create the span element
      // const linkSpan = document.createElement("span");
      // linkSpan.style.color = "blue";
      // linkSpan.style.textDecoration = "underline";
      // linkSpan.setAttribute("role", "link");
      // linkSpan.textContent = "https://www.bing.com";

      // const insertOption: InsertEntityOptions = {
      //   contentNode: linkSpan,
      // };
      // insertEntity(editor, "a", false, "focus", insertOption);

      // Refocus the editor after inserting the link
      editor.focus();
    }
  };

  return (
    <div className="editor-wrapper">
      <h2>Rooster Editor</h2>
      <button onClick={insertLinkButton}>Insert Link</button>
      <div className={"editor"} ref={editorDivRef} tabIndex={-1} />
    </div>
  );
};

export default RoosterTest;
