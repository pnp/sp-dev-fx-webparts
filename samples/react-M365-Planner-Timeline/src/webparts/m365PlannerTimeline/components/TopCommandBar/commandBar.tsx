import * as React from "react";
import { 
  useContext, 
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { useId, useConst } from '@fluentui/react-hooks';
import { webPartContext } from "../Context";
import { TooltipHost } from '@fluentui/react/lib/Tooltip';
import * as strings from 'M365PlannerTimelineWebPartStrings';
import { 
  Stack,
  Dropdown,
  IDropdownOption,
  CommandBarButton,
  IIconProps,
  Toggle,
} from '@fluentui/react';

import { PlannerBucket } from '@microsoft/microsoft-graph-types'
import { CommandBarStyles } from '../../Styles';

interface CommandBarProps {
  onBucketId: (params: { bucketId: string; bucketName: string }) => void;
  onAllTask: (showActiveTasks: boolean) => void;
  onTaskRefresh: (callbackFunction: () => void) => void;
}

export default function CommandBar({ onBucketId, onAllTask, onTaskRefresh }: CommandBarProps): JSX.Element {
  const { renderSettings, filterSettings, configSettings, filterService, bkId, activeTasks } = useContext(webPartContext);

  const [showActiveTasks, setShowActiveTasks] = useState(activeTasks)
  const [bucketName, setBucketName] = useState<string>("In all buckets");  
  const [retrievingTasks, setRetrievingTasks] = useState<boolean>(false);  
  const [refreshData, setRefreshData] = useState<boolean>(false);
  const [bucketId, setBucketId] = useState<string>(bkId);  

  const refreshIcon: IIconProps = { iconName: 'Refresh' };  
  const RefreshToolTipId = useId('Refresh');
  const RefreshButtonId = useId('RefreshButton');

  const clearTaskRefresh = (): void => {
    setRefreshData(false);    
    setRetrievingTasks(false);
    if (filterSettings)
      filterSettings.refreshData = false;
  }

  useEffect(() => { 
    if (filterSettings)
      filterSettings.bucketId = bkId; 

    setBucketId(bkId);
  }, [bkId]);

  const AllTasksClick = useCallback((ev: React.MouseEvent<HTMLElement>, checked?: boolean) => { 
    // Set the show active tasks flag
    setShowActiveTasks(!showActiveTasks);
    if (filterSettings)
      filterSettings.showActiveTasks = !showActiveTasks;

    if (filterService && filterSettings )
      filterService.saveFilterSettings(configSettings.cacheId, filterSettings);

    onAllTask(!showActiveTasks);
  }, [showActiveTasks]);

  useEffect(() => {
    if (filterSettings)
      filterSettings.showActiveTasks = activeTasks; 

    setShowActiveTasks(activeTasks);    
  }, [activeTasks]);

  const PlannerBucketSelect = useCallback((event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => {
    if (option) {      
      // Set the bucket id from selection
      const buckId = (option.key || "All") as string

      if (filterSettings)
        filterSettings.bucketId = buckId; 

      // Set the bucket name from selection
      const name = option.text || "";
      setBucketName(name);      
      
      if (filterService && filterSettings )
        filterService.saveFilterSettings(configSettings.cacheId, filterSettings);

      onBucketId({ bucketId: buckId, bucketName: name });
      setBucketId(buckId);
    }
  }, [bucketId]);
    
  const DropDownPlaceHolder = useMemo(() => {
    const name = bucketName ? bucketName.replace("In all buckets", "All Buckets") : "Select a bucket";
    return name;    
  }, [bucketName]);

  const TaskRefreshClick = useCallback(() => {
    setRefreshData(!refreshData);
    setRetrievingTasks(!refreshData);

    if (filterSettings)
      filterSettings.refreshData = true
    
    onTaskRefresh(clearTaskRefresh);
  }, [refreshData]);

  // initialize the filter settings for command bar
  useEffect(() => {    
    if (filterSettings) {
      setShowActiveTasks(filterSettings.showActiveTasks);

      if (filterSettings.bucketId === 'All') {
        // Set the bucket name
        setBucketName(strings.InAllBucketText);
      } else {
        // Set the bucket name
        if (renderSettings) {
          renderSettings.buckets.forEach((bucket: PlannerBucket) => {
            if (bucket.id === filterSettings.bucketId) {
              setBucketName(strings.BucketTitlePrefix + bucket.name || strings.UnnamedBucketText);
            }
          });          
        }        
      }

      setBucketId(filterSettings.bucketId);
    }    
  }, []);

  const dropDownOptions = useMemo(() => {
    const options: IDropdownOption[] = [];

    options.push({ key: "All", text: strings.AllBucketsText });
    renderSettings?.buckets.forEach((bucket: PlannerBucket) => {
      return options.push({ key: bucket.id ?? 'unknown', text: bucket.name ?? strings.UnnamedBucketText });
    });
    
    return options;
  }, [renderSettings?.buckets]);

  const refreshCalloutProps = useConst({
    gapSpace: 0,
    // If the tooltip should point to an absolutely-positioned element,
    // you must manually specify the callout target.
    target: `#${RefreshButtonId}`,
  });

  return (
    <>
      <Stack enableScopedSelectors horizontal horizontalAlign="start" styles={CommandBarStyles.stackStyles}>
        <div dir="ltr" className={CommandBarStyles.barDivStyle}>
          {/* <label aria-label={strings.ActiveTaskLabel}>{strings.ActiveTaskLabel}</label> */}
          <div className={CommandBarStyles.barDivStyle}>
            <Toggle inlineLabel
                    onText={strings.TaskToggleOn}
                    offText={strings.TaskToggleOff}
                    checked={showActiveTasks}
                    disabled={retrievingTasks}
                    className={CommandBarStyles.activeTasksToggleStyle}
                    onChange={AllTasksClick} />
          <div className={CommandBarStyles.barDivStyle}>
            {/* <label className={CommandBarStyles.BucketLabelStyle} aria-label={strings.BucketSelectLabel}>{strings.BucketSelectLabel}</label> */}
            <Dropdown 
                    placeholder={DropDownPlaceHolder.replace(strings.BucketTitlePrefix, "")} 
                    className={CommandBarStyles.bucketDropdownStyle}
                    disabled={retrievingTasks}
                    defaultSelectedKey={bucketId}
                    options={dropDownOptions}
                    onChange={PlannerBucketSelect} />                
          </div>
          <div className={CommandBarStyles.barDivStyle}>
            {/* <label className={CommandBarStyles.BucketLabelStyle} aria-label="Refresh">Refresh</label> */}
            <TooltipHost content={strings.RefreshTooltipHostText} id={RefreshToolTipId} calloutProps={refreshCalloutProps}>
              <CommandBarButton
                    className={CommandBarStyles.refreshButtonStyle}                  
                    iconProps={refreshIcon} 
                    id={RefreshButtonId}
                    disabled={retrievingTasks}
                    onClick={TaskRefreshClick} />                
            </TooltipHost>
          </div>        
        </div>
      </div>
    </Stack>
  </>);
}
