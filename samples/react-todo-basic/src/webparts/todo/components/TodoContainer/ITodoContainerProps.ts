import { IWebPartContext } from '@microsoft/sp-client-preview';
import { DisplayMode } from '@microsoft/sp-client-base';
import ITodoDataProvider from '../../dataProviders/ITodoDataProvider';

interface ITodoContainerProps {
  dataProvider: ITodoDataProvider;
  webPartContext: IWebPartContext;
  webPartDisplayMode: DisplayMode;
  configureStartCallback: () => void;
}

export default ITodoContainerProps;