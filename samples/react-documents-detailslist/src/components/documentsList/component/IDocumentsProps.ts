
import IDataProvider from '../../../dataproviders/IDataProvider';
import { DisplayMode } from '@microsoft/sp-core-library';

export interface IDocumentsProps {

  title: string;
  webPartDisplayMode: DisplayMode;
  dataProvider: IDataProvider;
  useSearchData: boolean;

}