import * as React from 'react';
import { PlannerTask } from '@microsoft/microsoft-graph-types'
import { 
  TimelineYear,
  TimelineMonth,
  TimelineDetails
} from '.';
import { 
  TimelineItemStyles,
  DatesAndDetailsStyles
} from '../../Styles';

export default function TimelineItem(task: PlannerTask): JSX.Element {  
  return (
      <>
        <TimelineYear {...task} />
        <div>
          <div className={TimelineItemStyles.timelineItemStyle}>
            <div className={DatesAndDetailsStyles.timelineContentStyle} />
          </div>
          <TimelineMonth {...task} />
        </div>
        <TimelineDetails {...task} />        
      </>
    )
}
