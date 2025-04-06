import * as React from "react";
import { 
  useContext, 
  useState,
  useEffect,  
  // useMemo,
} from "react";
import { webPartContext } from "../Context";
import { Spinner } from '@fluentui/react-components';
import { PlannerTask } from '@microsoft/microsoft-graph-types'
import * as strings from 'M365PlannerTimelineWebPartStrings';
import { 
  TimelineItem,
  CommandBar
} from '..';
import { 
  // Models
  ITimeLineData, 
  // Services
  TimeLineService,  
  ITimeLineService,
  // Styles
  MonthYearStyles,
  TimelineTabStyles,  
} from '../..';

export function Timeline(): JSX.Element {
 const { themeString, context, renderSettings, configSettings, filterSettings, categorySettings, services, planId, bkId, activeTasks } = useContext(webPartContext);
  
  // states    
  const [timeLineData, setTimeLineData] = useState<ITimeLineData | undefined>(undefined);
  const [plannerCategory, setPlannerCategory] = useState<{ [key: string]: string } | undefined>(undefined); 
  const [tasks, setTasks] = useState<PlannerTask[]>([]);
  const [timelineService, setTimelineService] = useState<ITimeLineService | undefined>(undefined);
  const [retrievingTasks, setRetrievingTasks] = useState(true);
  const [bucketId, setBucketId] = useState<string>("");
  const [showActiveTasks, setShowActiveTasks] = useState(activeTasks);
  const [refreshData, setRefreshData] = useState(true);
  const [manualRefresh, setManualRefresh] = useState(false);
  const [bucketName, setBucketName] = useState<string>("");
  
  // Callback sent into the CommandBar to handle the bucket change
  const bucketHandler = ({bucketId, bucketName}: {bucketId: string; bucketName: string}): void => {
    // check if the filter settings are initialized
    if (filterSettings)
      // Set
      filterSettings.bucketId = bucketId;

    // Set to re-render the tasks
    setRefreshData(true);
    // Set the bucket id to re-render the tasks
    setBucketId(bucketId)    
  }

  useEffect(() => {
    // update timeLineService with the new planId
    if (timelineService && planId)
      timelineService.updateTimelineData(planId);
    
    // Check if the filter settings are initialized
    if (filterSettings) {
      filterSettings.bucketId = bkId;
      // Set the bucket id and show active tasks flag
      setBucketId(bkId);      
    }    
    // Set to re-render the tasks
    setRefreshData(true);    
  }, [planId]);

  
  // Callback sent into the CommandBar to handle the all tasks flag change
  const allTaskHandler = (allTasksFlag: boolean): void => {
    // check if the filter settings are initialized
    if (filterSettings)
      // Set filter the show active tasks flag
      filterSettings.showActiveTasks = allTasksFlag;

    // Set to re-render the tasks
    setRefreshData(true);
    // Set the show active tasks flag
    setShowActiveTasks(allTasksFlag);
  }

  // Callback sent into the CommandBar to handle the task refresh
  const TaskRefreshHandler = (callbackFunction: () => void): void => {
    // Set the retrieving tasks flag
    setRetrievingTasks(true);
    // Set the refresh data flag
    setRefreshData(true);
    // Set the manual refresh flag
    setManualRefresh(true);
    
    // Call the callback function to the CommandBar.
    callbackFunction();    
  } 
  
  useEffect(() => {
    let name: string = strings.UnknownBucketText;

    if (bkId === 'All') {
      // Set the bucket name
      setBucketName(strings.InAllBucketText);
    } else {
      // Get the bucket name from buckets with the bucket id      
      if ((renderSettings?.buckets ?? []).length > 0) {
        renderSettings?.buckets.forEach((bucket: { id: string; name: string }) => {
          if (bucket.id === bkId) {
            name = bucket.name;          
          }
        });
      }

      setBucketName(name);
    }

    setBucketId(bkId);
  }, [bkId]);

  // Set the bucket id and show active tasks flag from the filter settings
  useEffect(() => {
    // Check if the filter settings are initialized
    if (filterSettings) {
      // Set the bucket id and show active tasks flag
      setBucketId(filterSettings.bucketId);
      // Set the show active tasks flag
      setShowActiveTasks(filterSettings.showActiveTasks);
    }    
  }, [filterSettings]);
  
  useEffect(() => {
    if (filterSettings)
  //     // Set filter the show active tasks flag
      filterSettings.showActiveTasks = activeTasks;

    // Set to re-render the tasks
    setRefreshData(true);
    // Set the show active tasks flag
    setShowActiveTasks(activeTasks);
  }, [activeTasks]);

  // Function to set the categories text from te plan settings
  function SetCategories(): void {
    if (plannerCategory && categorySettings) {
      // iterate through the categories
      for (let i = 1; i < 26; i++) {
        // Generate the category key
        const categoryKey = `category${i}`;
        // only set if there is text label in plan settings
        categorySettings[categoryKey].text = plannerCategory[categoryKey] ? plannerCategory[categoryKey] : categorySettings[categoryKey].text;
      }     
    }
  }

  useEffect(() => {
    const initializeService = async (): Promise<void> => {
    
    if (context && configSettings) {
      // initialize the timeline service
      const tlService = new TimeLineService(context, configSettings, planId);
      await tlService.initializeGraphClient();
      setTimeLineData( await tlService.getTimelineData() );

      // Set to re-render the tasks
      setRefreshData(true);    

      if (services)
        services.timeLineService = tlService;

      // Return the timeline service
      setTimelineService(tlService);
    } 
  };

  initializeService().catch(error => {
    console.error(strings.InitializeServiceError, error);
  });
  }, [context, configSettings]);
  
  // Refresh the tasks
  useEffect( () => {
    const fetchData = async (): Promise<void> => {      
      // Check if the refresh data flag is set
      if (refreshData) {
        // Check if the timeline service and render settings are initialized
        if (timelineService && renderSettings) {
          // Check if require new data from graph
          if (retrievingTasks && (filterSettings?.refreshData || manualRefresh)) {            
            setTimeLineData( await timelineService.refreshTasks() );
          } else {
            setTimeLineData( await timelineService.getTimelineData() );
          
            // Check if the group id is empty
            if (timeLineData?.refresh) {
              setTimeLineData( await timelineService.refreshTasks() );
            }  
          }

          if (renderSettings) {
            // Update the buckets and users data
            renderSettings.buckets = timelineService.getBuckets();
            renderSettings.users = timelineService.getTaskUsers();

            // Get the plan category descriptions
            setPlannerCategory(timelineService.getPlannerCategoryDescriptions());
            // update the category text settings
            SetCategories();
            
            setRefreshData(false);
            renderSettings.renderYear =false;
            renderSettings.currentYear = 0;
            renderSettings.renderMonth = true;
            renderSettings.currentMonth = -1;
            renderSettings.lastRenderedDate = (new Date()).toISOString();
          }

          // Check if the filter settings are initialized
          if (filterSettings) {
            // Get the filtered tasks
            setTasks(timelineService.getTasksForBucket(filterSettings));
          }
          
          // Set the retrieving tasks flag
          setRetrievingTasks(false);
        }
      }
    };
    
    fetchData().catch(error => {
      console.error(strings.fetchErrorText, error);
    });
  }, [refreshData, manualRefresh, timelineService, filterSettings, renderSettings, retrievingTasks, bucketId, showActiveTasks, services]);

  // Set the bucket name
  useEffect(() => {
    let name: string = strings.UnknownBucketText;

    if (bucketId === 'All') {
      // Set the bucket name
      setBucketName(strings.InAllBucketText);
    } else {
      // Get the bucket name from buckets with the bucket id      
      if ((renderSettings?.buckets ?? []).length > 0) {
        renderSettings?.buckets.forEach((bucket: { id: string; name: string }) => {
          if (bucket.id === bucketId) {
            name = bucket.name;          
          }
        });
      }

      setBucketName(name);
    }
  }, [bucketId, renderSettings?.buckets]);
  
  return (
    <>
      <div>
        { retrievingTasks &&  
          <div className={TimelineTabStyles.spinnerDiv}>
            <Spinner className={TimelineTabStyles.spinnerStyle} labelPosition="below"  label="Retrieving Tasks..."/>
          </div>
        }
        { !retrievingTasks &&      
        <>
          <div className={TimelineTabStyles.CommandBarBlockStyle(themeString)}>
            <CommandBar onAllTask={allTaskHandler} onBucketId={bucketHandler} onTaskRefresh={TaskRefreshHandler} />
          </div>
          <div className={TimelineTabStyles.pagePaddingStyle}>
            { timeLineData?.error &&
              <pre className={TimelineTabStyles.errorStyle}>Error: {timeLineData?.error}</pre>
            }
            <div>
              <div className={TimelineTabStyles.BucketNameStyle}>
                {bucketName}
              </div>
              {/* Bucket Name */}
              <div className={TimelineTabStyles.listedTaskStyle}>
                <span>{showActiveTasks ? strings.TimelineShowAllTasks : strings.TimelineShowActiveTasks }</span>                      
              </div>
              {/* Render the timeline */}
              { tasks.map((task: PlannerTask) =>
                <> 
                  <TimelineItem key={task.id} {...task}/>
                </>
              )}
              <header className={MonthYearStyles.timelineHeaderStyle}>
                <span className={MonthYearStyles.timelineYearStyle}>
                  { tasks.length > 0 ? strings.TimelineEnd : tasks.length === 0 && strings.TimelineNoTasks }
                </span>
              </header>                
            </div>
          </div>
        </>
      }
      </div>
    </>
  );
}