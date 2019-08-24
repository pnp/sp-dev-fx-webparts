import * as React from 'react';
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import AppService from '../../../../services/appService';

export interface IMessageBarSettings{
    visible:boolean;
    message: string;
    type: MessageBarType;
  }
  
  interface IAppContextInterface {
    appService: AppService;
    isGlobalAdmin: boolean;
    isSiteOwner: boolean;
    webUrl: string;
    messageBarSettings: IMessageBarSettings;
    isLoading:boolean;
    toggleLoading: (visible:boolean)=>void;
    updateMessageBarSettings: (settings:IMessageBarSettings)=>void;
  }
  
const AppContext = React.createContext<IAppContextInterface | null>(null);
export default AppContext; 
