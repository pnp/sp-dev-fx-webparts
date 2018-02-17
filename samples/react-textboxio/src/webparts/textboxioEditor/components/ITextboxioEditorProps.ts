import { DisplayMode } from "@microsoft/sp-core-library";

interface ITextboxioEditorProps {
    content: string;
    locale: string;
    displayMode: DisplayMode;
    onContentChanged: (newContent: string) => void;
}

export default ITextboxioEditorProps;