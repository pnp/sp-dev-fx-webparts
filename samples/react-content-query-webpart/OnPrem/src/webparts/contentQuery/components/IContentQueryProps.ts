import { IWebPartContext }              from '@microsoft/sp-webpart-base';
import { IContentQueryTemplateContext } from './IContentQueryTemplateContext';
import { IContentQueryStrings }         from './IContentQueryStrings';
import { IQuerySettings }               from './IQuerySettings';

export interface IContentQueryProps {
  onLoadTemplate: (templateUrl: string) => Promise<string>;
  onLoadTemplateContext: (querySettings: IQuerySettings, callTimeStamp: number) => Promise<IContentQueryTemplateContext>;
  siteUrl: string;
  querySettings: IQuerySettings;
  templateText?: string;
  templateUrl?: string;
  wpContext: IWebPartContext;
  externalScripts?: string[];
  strings: IContentQueryStrings;
  stateKey: string;
}