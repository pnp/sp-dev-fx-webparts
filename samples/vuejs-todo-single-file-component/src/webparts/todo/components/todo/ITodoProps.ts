import ITodoDataProvider from '../../../../dataProviders/ITodoDataProvider';
import { DisplayMode } from '@microsoft/sp-core-library';


export interface ITodoProps {
    dataProvider: ITodoDataProvider;
    webPartDisplayMode: DisplayMode;
    
}