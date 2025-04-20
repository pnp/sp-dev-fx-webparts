import { 
  createContext,
//  useContext
} from "react";
import { Theme } from "@fluentui/react-components";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { 
  // Models
  IRenderSettings,
  IConfigSettings,
  IFilterSettings,
  IAppliedCategoryColors,  
  IServices,
  // Constants
  AppliedCategoryColors,
  // Service interface
  IFilterService
} from "..";

export interface IWebPartContext {
  context?: WebPartContext;
  theme?: Theme;
  themeString: string;
  planId: string;
  bkId: string;
  activeTasks: boolean; 
  configSettings: IConfigSettings;
  renderSettings?: IRenderSettings;
  filterSettings?: IFilterSettings;
  filterService?: IFilterService;  
  categorySettings?: IAppliedCategoryColors;
  services?: IServices | undefined;
}

export const webPartContext = createContext<IWebPartContext>(
  {     
    themeString: "",  
    planId: "",
    bkId: "",
    activeTasks: false,
    configSettings: {
      groupId: "",
      cacheId: ""      
    },
    filterSettings: {
      bucketId: "All",
      showActiveTasks: true,
      refreshData: false,
    },
    renderSettings: {
      renderYear: true,
      currentYear: 0,
      renderMonth: true,
      currentMonth: -1,
      hideCompletedTasks: false,
      showBuckets: [],
      lastRenderedDate: Date.now().toString(),
      orderBy: "dueDateTime",
      buckets: [],
      users: []
    },
    categorySettings: AppliedCategoryColors,
    services: undefined
  }
);

// export const useContentPackManagerState = () => useContext(webPartContext);
