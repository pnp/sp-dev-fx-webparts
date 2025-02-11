import { useTheme } from "@fluentui/react";

import { DisplayMode } from "@microsoft/sp-core-library";
import * as React from "react";
import { useEffect } from "react";
import {
  AutoFormatPlugin,
  EditPlugin,
  HyperlinkPlugin,
  IEditor,
  ImageEditPlugin,
  MarkdownPlugin,
  PastePlugin,
  ShortcutPlugin,
  TableEditPlugin,
  WatermarkPlugin,
  getDarkColor,
} from "roosterjs";
import { Editor, exportContent } from "roosterjs-content-model-core";
//import { EditPlugin } from "roosterjs-content-model-plugins";
//import { EditorOptions } from "roosterjs-content-model-types";
import type { IRoosterJsEditorProps } from "./IRoosterJsEditorProps";
import { RibbonToolbar } from "./Ribbon/components/RibbonToolbar";
import { RibbonControls } from "./Ribbon/config/toolbarConfig";
import RoosterPlugin from "./Ribbon/plugin/RoosterPlugin";
import { UIUtilities } from "./Ribbon/type/UIUtilities";
import EditorService from "./services/EditorService";
import styles from "./styles/RoosterJsEditor.module.scss";
import { CreateUIUtilities } from "./utils/CreateUIUtilities";

const RoosterJsEditor: React.FC<IRoosterJsEditorProps> = (props) => {
  const { editorContent, onSave, displayMode } = props;
  const editorDivRef = React.useRef<HTMLDivElement>(null);
  const webPartRef = React.useRef<HTMLDivElement>(null);
  const [editor, setEditor] = React.useState<IEditor>({} as IEditor);
  const [isFocused, setIsFocused] = React.useState<boolean>(false);
  const [uiHandler, setUIHandler] = React.useState({} as UIUtilities);
  const theme = useTheme();

  const onLinkHanlder = (anchor: HTMLAnchorElement, mouseEvent: MouseEvent) => {
    window.open(anchor.href, "_blank");
  };

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
        new HyperlinkPlugin(undefined, "_blank", onLinkHanlder),
        new EditPlugin(),
        new PastePlugin(),
        new TableEditPlugin(),
        new ShortcutPlugin(),
        new WatermarkPlugin(""),
        new MarkdownPlugin({
          bold: true,
          italic: true,
          strikethrough: true,
          codeFormat: {},
        }),
        new RoosterPlugin(),
        new ImageEditPlugin(),
      ];

      const defaultSegmentFormat = {
        fontFamily:
          '"Segoe UI", "Segoe UI Web (West European)", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif',
        fontSize: "18px",
        textColor: "#323130",
      };
      const options = {
        plugins: plugins,
        defaultSegmentFormat: defaultSegmentFormat,
        getDarkColor: getDarkColor,
      };
      const editor = new Editor(editorDivRef.current, options);
      const editorService = new EditorService(editorDivRef.current);
      editorService.setContentModel(editorContent);
      setEditor(editor);
    }
  }, [editorContent, editorDivRef]);

  const handleSave = () => {
    if (editor && typeof editor.getContentModelCopy === "function") {
      const model = editor?.getContentModelCopy("clean");
      const html = model ? exportContent(editor, "HTML") : "";
      onSave(html);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (webPartRef.current && !webPartRef.current.contains(event.target as Node)) {
        setIsFocused(false);
        handleSave();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [webPartRef]);

  React.useEffect(() => {
    if (webPartRef.current) {
      const uiUtilities = CreateUIUtilities(webPartRef.current, theme);
      setUIHandler(uiUtilities);
    }
  }, [theme]);

  return (
    <section ref={webPartRef} className={`${styles.editorWrapper}`}>
      {displayMode === DisplayMode.Read && (
        <div className={`${styles.displayContainer}`}>
          <div dangerouslySetInnerHTML={{ __html: editorContent }} />
        </div>
      )}
      {displayMode === DisplayMode.Edit && uiHandler && (
        <div className={`${styles.editContainer}`}>
          {<RibbonToolbar editor={editor} ribbonItems={RibbonControls} uiUtilities={uiHandler} vertical={false} size="medium" />}
          <div
            ref={editorDivRef}
            tabIndex={-1} // Make the div focusable to capture blur events
            className={`${styles.editor} ${isFocused ? styles.focus : ""}`}
            onFocus={handleFocus}
            onBlur={handleSave}
          />
        </div>
      )}
    </section>
  );
};

export default RoosterJsEditor;
