interface IContentZoneEditorProps {
    content: string;
    locale?: string;
    onContentChanged: (newContent: string) => void;
}

export default IContentZoneEditorProps;