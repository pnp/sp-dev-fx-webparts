import { ServiceScope } from '@microsoft/sp-core-library';
import { createContext } from 'react';

export interface AppContextProps {
    serviceScope: ServiceScope;
}

// AppContext is created and has an initial value set
const AppContext = createContext<AppContextProps>(undefined);

export default AppContext;