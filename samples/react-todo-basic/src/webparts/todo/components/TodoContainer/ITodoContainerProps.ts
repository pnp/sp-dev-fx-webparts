import { DisplayMode } from '@microsoft/sp-core-library';
import ITodoDataProvider from '../../dataProviders/ITodoDataProvider';

interface ITodoContainerProps {
  dataProvider: ITodoDataProvider;
  webPartDisplayMode: DisplayMode;
  configureStartCallback: () => void;
}

export default ITodoContainerProps;