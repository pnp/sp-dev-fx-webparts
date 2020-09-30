import { createContext } from 'react';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

const AppContext = createContext<{ theme: IReadonlyTheme }>(undefined);

export default AppContext;
