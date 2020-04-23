export interface IMonacoEditorProps {
  value: string;
  theme: string;
  language: string;
  readOnly?: boolean;
  showLineNumbers?: boolean;
  showMiniMap?: boolean;
  showIndentGuides?: boolean;
  folding?: boolean;
  className?: string;
  onValueChange?: (newValue: string) => void;
  onDidBlurEditorText?: (value: string)=> void;
}
