import * as React from 'react';
//import ErrorBoundary from './ErrorBoundary';
import HRAssistant from './HRAssistant';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { DisplayMode } from '@microsoft/sp-core-library';

export interface IAppProps {
  context: WebPartContext;
  themeVariant: IReadonlyTheme | undefined;  
  webPartDisplayMode: DisplayMode;
  title: string;
  description: string;  
  botURL: string;
  greet?: boolean;
  clientId: string;
  tenantName: string;
  scope: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  userEmail: string;  
  botAvatarImage?: string;
  botAvatarInitials?: string;
}

const App: React.FC<IAppProps> = (props) => {
  return (
    // <ErrorBoundary>
      <HRAssistant {...props}/>
    // </ErrorBoundary>
  );
};

export default App;