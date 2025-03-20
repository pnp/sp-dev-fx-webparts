import * as React from 'react';
import { 
  ArrowDown16Filled as LowIcon,
  Important16Filled as ImportantIcon,
  AlertUrgent16Filled as UrgentIcon,
  // Circle16Filled as MediumIcon,
} from "@fluentui/react-icons";
import { TooltipHost, DirectionalHint } from '@fluentui/react';
import { useId, useConst } from '@fluentui/react-hooks';
import {
  calloutStyles,
  DatesAndDetailsStyles,
} from '../../Styles';
import * as strings from 'M365PlannerTimelineWebPartStrings';

export default function PriorityIcon(props: { priority: number, forTimeline: boolean }): JSX.Element {
  const UrgentTooltipId = useId('UrgentTooltip');
  const ImportantTooltipId = useId('ImportantTooltip');
  const LowTooltipId = useId('lowTooltip');

  const statusUrgentIconProps = useConst({
    gapSpace: 0,
    beakWidth: 10,      
    // If the tooltip should point to an absolutely-positioned element,
    // you must manually specify the callout target.
    target: `#${UrgentTooltipId}`,
  });

  const statusImportantIconProps = useConst({
    gapSpace: 0,
    beakWidth: 10,      
    // If the tooltip should point to an absolutely-positioned element,
    // you must manually specify the callout target.
    target: `#${ImportantTooltipId}`,
  });

  const statusLowIconProps = useConst({
    gapSpace: 0,
    beakWidth: 10,      
    // If the tooltip should point to an absolutely-positioned element,
    // you must manually specify the callout target.
    target: `#${LowTooltipId}`,
  });

  return (    
    <>
      {props.priority === 1 && (
        <div>
          { props.forTimeline ?
            <div className={DatesAndDetailsStyles.priorityTimelineStatusStyle}>
              <TooltipHost content={strings.PriorityUrgent} id={UrgentTooltipId} directionalHint={DirectionalHint.rightCenter} calloutProps={statusUrgentIconProps}>
                <UrgentIcon className={calloutStyles.urgentIconStyle} id={UrgentTooltipId}/>
              </TooltipHost>
            </div>
          :
            <>
              <div className={calloutStyles.sectionTitleStyle}>Priority: </div>
              <div className={calloutStyles.priorityStatusStyle}>              
                <UrgentIcon className={calloutStyles.urgentIconStyle}/>
                {strings.PriorityIconUrgent}
              </div>
            </>
          }
        </div>)}
      {props.priority === 3 && (
        <div>
          { props.forTimeline ?
            <div className={DatesAndDetailsStyles.priorityTimelineStatusStyle}>
              <TooltipHost content={strings.PriorityImportant} id={ImportantTooltipId} directionalHint={DirectionalHint.rightCenter} calloutProps={statusImportantIconProps}>
                <ImportantIcon className={calloutStyles.importantIconStyle} id={ImportantTooltipId}/>
              </TooltipHost>
            </div>
          :
            <>
              <div className={calloutStyles.sectionTitleStyle}>Priority: </div>
              <div className={calloutStyles.priorityStatusStyle}>              
                <ImportantIcon className={calloutStyles.importantIconStyle}/>
                {strings.PriorityIconImportant}
              </div>
            </>
          }
        </div>)}
      {props.priority === 9 && (
        <div>
        { props.forTimeline ?
          <div className={DatesAndDetailsStyles.priorityTimelineStatusStyle}>
            <TooltipHost content={strings.PriorityLow} id={LowTooltipId} directionalHint={DirectionalHint.rightCenter} calloutProps={statusLowIconProps}>
              <LowIcon className={calloutStyles.lowIconStyle} id={LowTooltipId}/>
            </TooltipHost>
          </div>
        :
          <>
            <div className={calloutStyles.sectionTitleStyle}>Priority: </div>
            <div className={calloutStyles.priorityStatusStyle}>              
              <LowIcon className={calloutStyles.lowIconStyle}/>
              {strings.PriorityIconLow}
            </div>
          </>
        }
      </div>)}        
    </>
  )
}
