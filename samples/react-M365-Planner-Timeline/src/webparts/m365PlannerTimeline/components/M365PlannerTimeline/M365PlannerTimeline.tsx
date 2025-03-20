import * as React from 'react';
import { 
  useMemo,
  useRef,
  useState,
} from "react";
import { webPartContext } from "../Context";
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import { DisplayMode } from '@microsoft/sp-core-library';
import * as strings from 'M365PlannerTimelineWebPartStrings';
import {
  // Models
  IRenderSettings,
  IConfigSettings,  
  IFilterSettings,
  IServices,
  AppliedCategoryColors,
  // Services
  FilterService
} from "../..";
import styles from './M365PlannerTimeline.module.scss';
import type { IM365PlannerTimelineProps } from '.';
import { Timeline } from '..';
import { WebPartContext } from "@microsoft/sp-webpart-base";
  
export const M365PlannerTimeline: React.FC<IM365PlannerTimelineProps> = (props) => {
  const context = useRef<WebPartContext>(props.context);  
  const themeString = useMemo<string>(() => props.isDarkTheme ? "dark" : "light", [props.isDarkTheme]);
  const [filterService] = useState<FilterService>(() => new FilterService({ bucketId: props.timeLinePlan.bucketId, showActiveTasks: props.showActiveTasks, refreshData: false }));  
  
  const configSettings = useMemo<IConfigSettings> (() => {
    return {
      groupId: props.groupId,
      bucketId: props.timeLinePlan.bucketId,
      cacheId: props.cacheId,
      planId: props.timeLinePlan.planId,
      showActiveTasks: props.showActiveTasks,
    }
  }, [props.groupId, props.cacheId, props.timeLinePlan.planId, props.timeLinePlan.bucketId, props.showActiveTasks]);
  
  const services: IServices = {
    timeLineService: undefined,
  }

  const filterSettings = useMemo<IFilterSettings>(() => {  
    if (!props.cacheId || !filterService) {
      return {
        bucketId: props.timeLinePlan.bucketId,
        showActiveTasks: props.showActiveTasks,
        refreshData: false,
      }
    } else {
      return filterService.getFilterSettings(props.cacheId);
    }
  }, [props.cacheId, filterService, props.timeLinePlan.bucketId]);

  const renderSettings: IRenderSettings = {
    renderYear: true,
    currentYear: 0,
    renderMonth: true,
    currentMonth: -1,
    hideCompletedTasks: false,
    showBuckets: [],
    lastRenderedDate: (new Date()).toISOString(),
    orderBy: "dueDateTime",
    buckets: [],
    users: []
  } 

  return (
    <webPartContext.Provider value={{ 
                  context: context.current, 
                  bkId: props.timeLinePlan.bucketId,
                  planId: props.timeLinePlan.planId,
                  activeTasks: props.showActiveTasks,
                  themeString, 
                  configSettings, 
                  filterSettings, 
                  filterService, 
                  renderSettings, 
                  categorySettings: AppliedCategoryColors, 
                  services }}>
      <section className={styles.m365PlannerTimeline}>
        { props.showTitle &&
          <div className={styles.webPartTitle}>{props.webPartTitle}</div>
        }
        { !props.timeLinePlan.planId &&
          <Placeholder iconName='Edit'
                iconText={strings.Config_IconText}
                description={props.noM365Group ? strings.Not_Supported : strings.Config_Desc}
                buttonLabel={strings.Config_ButtonText}
                hideButton={props.displayMode === DisplayMode.Read || props.noM365Group}
                onConfigure={props.onConfigure} />
        }
        { renderSettings && props.timeLinePlan.planId &&
          <Timeline />
        }        
      </section>
    </webPartContext.Provider>
  );
}