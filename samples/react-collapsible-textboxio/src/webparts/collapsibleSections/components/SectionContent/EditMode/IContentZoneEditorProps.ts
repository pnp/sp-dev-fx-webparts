interface IContentZoneEditorProps {
    content: string;
    domElementId: string;
    locale?: string;
    onContentChanged: (newContent: string) => void;
}

export default IContentZoneEditorProps;