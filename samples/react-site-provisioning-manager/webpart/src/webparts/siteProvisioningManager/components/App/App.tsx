import * as React from 'react';
import styles from './App.module.scss';
import { IAppProps } from './IAppProps';
import AppContext,{IMessageBarSettings} from "./AppContext";
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import AppContent from "./AppContent";
import * as Strings from "SiteProvisioningManagerWebPartStrings";

const App: React.FC<IAppProps> = (props) => {
  const {webUrl,appService} = props;
  const [isGlobalAdmin,setIsGlobalAdmin] = React.useState(false);
  const [isSiteOwner,setIsSiteOwner] = React.useState(false);
  const [isLoading,setIsLoading] = React.useState(false);
  const [messageBarSettings,setMessageBarSettings] =React.useState({
    message:"",
    type:MessageBarType.info,
    visible:false
  } as IMessageBarSettings);
  
  
  const updateMessageBarSettings = (settings:IMessageBarSettings)=>{
    setMessageBarSettings(settings);
  };

  const toggleLoading = (visibleLoading:boolean)=>{
    setIsLoading(visibleLoading);
  };

  React.useEffect(()=>{
    let didCancel = false;

    const fetchIsGloablAdmin = async ()=>{
      const globalAdmin = await appService.checkUserIsGlobalAdmin();      
      if (!didCancel) {
        setIsGlobalAdmin(globalAdmin);
      }
      
    };
  
    const fetchIsSiteOwner = async ()=>{
      const siteOwner = await appService.IsSiteOwner();
      if (!didCancel) {
        setIsSiteOwner(siteOwner);
        if(!siteOwner){
          setMessageBarSettings({
            message: Strings.ErrorMessageUserNotAdmin,
            type: MessageBarType.error,
            visible: false
          });
        }
      }
    };

    fetchIsGloablAdmin();
    fetchIsSiteOwner();

    return ()=>{didCancel=true;};
  },[]);

  return (
    <div className={styles.siteProvisioningWebPart}>
      <AppContext.Provider value={{ 
        appService,
        isGlobalAdmin,
        isSiteOwner,
        webUrl,
        messageBarSettings,
        isLoading,
        toggleLoading,
        updateMessageBarSettings
        } }>
      <AppContent/>
      </AppContext.Provider>
    </div>
  );
};

export default App;