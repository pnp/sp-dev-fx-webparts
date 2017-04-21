import { IContentQueryTemplateContext } from './IContentQueryTemplateContext';
import { IContentQueryStrings }         from './IContentQueryStrings';
import { IQuerySettings }               from './IQuerySettings';


export interface IContentQueryProps {
  onLoadTemplate: (templateUrl: string) => Promise<string>;
  onLoadTemplateContext: (querySettings: IQuerySettings, callTimeStamp: number) => Promise<IContentQueryTemplateContext>;
  querySettings: IQuerySettings;
  templateUrl: string;
  strings: IContentQueryStrings;
  stateKey: string;
}