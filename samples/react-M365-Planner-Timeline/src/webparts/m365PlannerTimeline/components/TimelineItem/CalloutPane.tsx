import * as React from 'react';
import { 
  PlannerTask,
  PlannerChecklistItem,
  PlannerTaskDetails,
  NullableOption,
  PlannerChecklistItems,
} from '@microsoft/microsoft-graph-types'
import { 
  CheckmarkCircleFilled as CompletedIcon,
 } from "@fluentui/react-icons";
import { useId } from '@fluentui/react-hooks';
import * as moment  from "moment";
import { 
  useContext,
  useState,
  useEffect
} from "react";
import { webPartContext } from "../Context";
import { calloutStyles } from '../../Styles';
import { PriorityIcon } from '.';
import { ICategoryData } from '../..';
import * as strings from 'M365PlannerTimelineWebPartStrings';

export default function CalloutPane( task: PlannerTask ): JSX.Element {
  const labelId = useId('callout-label');
  const [taskDetails, setTaskDetails] = useState<PlannerTaskDetails | undefined>(undefined);

  const { renderSettings, categorySettings, services} = useContext(webPartContext);
  let completedDate: string = "";
  let bucketName: string = "N/A";
  const checklist: PlannerChecklistItem[] = [];
  
  useEffect(() => {
    const fetchData = async (): Promise<void> => {      
      if (services && !taskDetails) {
        const taskId = task.id;
        // Get Task Details
        if (taskDetails === undefined && taskId) {
          // eslint-disable-next-line no-void
      
            if (services && services.timeLineService) {
              const details = await services.timeLineService.getTaskDetails(taskId);
              if (details) {
                setTaskDetails(details);
              }
            }
          
        }
      }
    };
    
    fetchData().catch(error => {
      console.error(strings.fetchErrorText, error);
    });
  }, [taskDetails, services, task.id]);

  // if the task is completed, get the completed date
  if (task.percentComplete === 100)
    if (task.completedDateTime)
      completedDate = moment(new Date(task.completedDateTime)).format(strings.MomentDateFormat);
  
  const checklistItems: NullableOption<PlannerChecklistItems> = taskDetails?.checklist || {};
  
  if (checklistItems) {
    Object.keys(checklistItems).forEach((key: keyof typeof checklistItems) => {
      const checklistItem: PlannerChecklistItem = checklistItems[key];
      checklist.push(checklistItem);
    });
  }

  if (task.bucketId) {
    bucketName = task.bucketId.split(':')[1];
  }

  let aUsers: string = "";
  // get the users assigned to the task
  if (task.assignments) {
    aUsers = "- ";
    // loop through the assignments (users)
    Object.keys(task.assignments).forEach((assignmentId: string) => {
      // find the user by the assignmentId
      if (renderSettings?.users) {
        // loop through the users in the group
        renderSettings.users.forEach((user) => {
          if (user.id === assignmentId) {
            // add the user's display name to the list of users
            aUsers += user.displayName + ' - ';
          }
        });
      }
    });
  }

  // get the labels
  const labels: ICategoryData[] = [];
  if (task.appliedCategories) {
    for (let i = 1; i < 26; i++) {
      const categoryKey = `category${i}` as keyof typeof task.appliedCategories;
      if (task.appliedCategories[categoryKey] === true) {
        if (categorySettings) {
          const categoryData: ICategoryData = categorySettings[categoryKey];
          labels.push(categoryData);
        }
      }
    }
  }

  function startDate(task: PlannerTask): string {
      // if the task has a start date, get the start date
      if (task.startDateTime)
        return moment(new Date(task.startDateTime)).format(strings.MomentDateFormat);
      else 
        return strings.NoStartDate;
    }

  return (
      <>
        <div dir="ltr" id={labelId} className={calloutStyles.calloutTitleStyles}>
          <strong>{task.title}</strong>
        </div>
        { labels.length > 0 &&
          <div dir="ltr">
            <div className={calloutStyles.labelsBlockStyle}>
              {labels.map((label, index) => (
                <div key={index} className={calloutStyles.labelItemStyle}>
                  <div className={calloutStyles.labelItemColorStyle(label)}>
                    {label.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        }        
        <div className={calloutStyles.bucketLabelStyle}>
          {strings.PaneBucketText}{bucketName}
        </div>          
        { task.completedBy?.user?.displayName &&
          <div>
            <div className={calloutStyles.sectionTitleStyle}>
              {strings.PaneCratedByText}
            </div>
            <div className={calloutStyles.priorityStatusStyle}>
              {task.completedBy?.user.displayName}
            </div>            
          </div>
        }
        <PriorityIcon priority={task.priority ?? 0} forTimeline={false} />
        <div>
          <div className={calloutStyles.sectionTitleStyle}>
          {strings.PaneProgressText}
          </div>
          <div className={calloutStyles.priorityStatusStyle}>
            {task.percentComplete === 100 ? strings.PanePercentComplete100 : task.percentComplete === 50 ? strings.PanePercentComplete50 : strings.PanePercentComplete0}
          </div>          
        </div>
        { task.percentComplete === 100 &&
          <div>
            <div className={calloutStyles.sectionTitleStyle}>
              {strings.PaneStartDateText}
            </div>
            <div>
              {startDate(task)}
            </div>
        </div>  
        }
        { task.dueDateTime && (
          <div>
            <div className={calloutStyles.sectionTitleStyle}>
              {strings.PaneDueDateText}
            </div>
            <div>
              {moment(new Date(task.dueDateTime)).format(strings.MomentDateFormat)}
            </div>
          </div>  
        )}
        { aUsers.replace('- ', '') !== "" && (
          <div>
            <div className={calloutStyles.sectionHeadingStyle}>
              {strings.PaneAssignedToText}
            </div>
            <div>
              { aUsers === "- " ? "" : aUsers }
            </div>
          </div>
        )}
        { taskDetails?.description &&
          <>
            <div className={calloutStyles.sectionHeadingStyle}>
            {strings.PaneNotesText}
            </div>
            <div className={calloutStyles.calloutNotesStyle}>
                {taskDetails?.description}
            </div>                
          </>
        }                
        { task.percentComplete === 100 &&
          <>
            <div className={calloutStyles.sectionHeadingStyle}>
              {strings.PaneCompletedText}
            </div>
            <div>
            {strings.PaneByText}{task.completedBy?.user?.displayName}{strings.PaneOnText}{completedDate}
            </div>
          </>
        }
        { checklist && checklist.length > 0 &&
          <>
            <div className={calloutStyles.checklistHeadingStyle}>
            {strings.PaneChecklistText}
            </div>
            <ul className={calloutStyles.checklistListStyle}>
              {checklist.map((item: PlannerChecklistItem) => (
                <li key={item.orderHint}>
                  <div className={calloutStyles.CheckListLineItemStyle} >
                    {item.isChecked && 
                      <div className={calloutStyles.completeLabelStyle} >
                        <CompletedIcon className={calloutStyles.CompletedIconStyle}/>
                      </div>
                    }
                    <div className={item.isChecked ? calloutStyles.competedItemStyle : calloutStyles.checklistItemStyle}>
                      {item.title}
                    </div>
                  </div>
                </li>
              ))}
            </ul>  
          </>
        }             
      </>
    )
}