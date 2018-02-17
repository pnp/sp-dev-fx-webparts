export interface IScriptEditorProps {
  script: string;
  title: string;
  save(script: string): void;
}
