export interface IScriptEditorWebPartProps {
  script: string;
  useExternalScript: boolean;
  externalScript?: string;
  title: string;
  removePadding: boolean;
  spPageContextInfo: boolean;
  teamsContext: boolean;
}
