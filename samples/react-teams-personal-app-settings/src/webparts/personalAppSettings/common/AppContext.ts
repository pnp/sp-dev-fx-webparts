import { createContext } from 'react';
import { IWebPartProps } from './IWebPartProps';

export interface IAppContext {
  webPartProps: IWebPartProps;
  onUpdateProps: (webPartProps: IWebPartProps) => void;
}

const AppContext = createContext<IAppContext>(undefined);
export default AppContext;
