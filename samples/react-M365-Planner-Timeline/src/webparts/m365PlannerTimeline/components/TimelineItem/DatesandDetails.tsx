import * as React from 'react';
import { PlannerTask } from '@microsoft/microsoft-graph-types'
import { 
  Callout,
  DirectionalHint  
 } from "@fluentui/react";
 import { 
  useBoolean, 
  useId 
} from '@fluentui/react-hooks';
import * as moment from "moment";
import { Info24Filled as InfoIcon } from "@fluentui/react-icons";
import CalloutPane from './CalloutPane'; // Adjust the import path as necessary
import { 
  calloutStyles,
  DatesAndDetailsStyles,
  TimelineItemStyles,
} from '../../Styles';
import { PriorityIcon } from '.';
import { useContext } from 'react';
import { webPartContext } from '../Context';
import * as strings from 'M365PlannerTimelineWebPartStrings';

export default function TimelineDetails(task: PlannerTask): JSX.Element {
  const { themeString } = useContext(webPartContext);

  const aline: string = "right";
  
  const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] = useBoolean(false);
  
  const buttonId = useId('callout-button');
  const labelId = useId('callout-label');
  const descriptionId = useId('callout-description');

  function isOverDue(task: PlannerTask): boolean {
    // if the task has a due date, get the due date
    if (task.dueDateTime)
      // check if the task is overdue by comparing the due date + 1 day to today's date
      return moment(new Date(task.dueDateTime)).add(1, 'd').isBefore(new Date());

    return false;
  }
  
  function dueDate(task: PlannerTask): string {
    // if the task has a due date, get the due date
    if (task.dueDateTime)
      return strings.TimelineDueText + moment(new Date(task.dueDateTime)).format(strings.MomentDateFormat);

    return strings.TimelineNoDueDate;
  }

  function startDate(task: PlannerTask): string {
    // if the task has a start date, get the start date
    if (task.startDateTime)
      return strings.TimelineStartText + moment(new Date(task.startDateTime)).format(strings.MomentDateFormat);
    else 
      return strings.TimelineStartAnytime;
  }
    
  function completedDate(task: PlannerTask): string {
    if (task.completedDateTime)
      return strings.TimelineCompletedText + moment(new Date(task.completedDateTime)).format(strings.MomentDateFormat);

    return ""
  }

  const [timelineMarkerClass, gridClass] = DatesAndDetailsStyles.timelineRenderStyles(themeString, task.percentComplete ?? 0, isOverDue(task));

  return (
      <>
        <div className={TimelineItemStyles.timelineItemStyle}>
          <div className={timelineMarkerClass.join(' ')} />
          <div className={DatesAndDetailsStyles.timelineContentStyle}>
            <div className={gridClass.join(' ')} dir={aline === 'right' ? 'ltr' : 'rtl'}>
              <div className="ms-Grid-row">                
                {/* <div className={DatesAndDetailsStyles.timelineTitleBlockStyle}> */}
                  <div className="ms-Grid-col">                  
                    <span className={task.dueDateTime ? DatesAndDetailsStyles.startDate : DatesAndDetailsStyles.noDueDate}>{dueDate(task)}</span>
                    { task.completedDateTime ? 
                      <span>{completedDate(task)}</span> 
                    : 
                      <span>{startDate(task)}</span>                    
                    }
                  </div>
                {/* </div>  */}
              </div> 
              <div className="ms-Grid-row">                
                <div className={DatesAndDetailsStyles.timelineTitleBlockStyle}>
                  <div>
                    <InfoIcon
                      className={DatesAndDetailsStyles.infoIconStyle}
                      id={buttonId}
                      onClick={toggleIsCalloutVisible}/>                    
                  </div>
                  <div className={DatesAndDetailsStyles.taskItemTitleStyle}>
                    <PriorityIcon priority={task.priority ?? 0} forTimeline={true} />
                      {task.title}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {isCalloutVisible ? (
            <Callout
              ariaLabelledBy={labelId}
              ariaDescribedBy={descriptionId}
              role="dialog"
              className={calloutStyles.calloutStyles.callout}
              gapSpace={0}
              target={`#${buttonId}`}
              isBeakVisible={true}
              beakWidth={20}
              onDismiss={toggleIsCalloutVisible}
              directionalHint={DirectionalHint.bottomCenter}
              setInitialFocus>
              <CalloutPane {...task} />
            </Callout>) : null }          
        </div>
      </>
    )
}