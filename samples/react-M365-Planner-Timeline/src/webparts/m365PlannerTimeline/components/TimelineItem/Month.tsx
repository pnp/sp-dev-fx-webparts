import * as React from "react";
import { useContext } from "react";
import { PlannerTask } from '@microsoft/microsoft-graph-types'
import { webPartContext } from "../Context";
import { MonthYearStyles } from "../../Styles";
import * as strings from 'M365PlannerTimelineWebPartStrings';

export default function Year(task: PlannerTask): JSX.Element {
  const {renderSettings} = useContext(webPartContext);

  let dueDate: Date = new Date();
  let dueMonth: string = "";  
  let renderMonth: boolean = false;
    
  if (task.dueDateTime) {
    dueDate = new Date(task.dueDateTime);      

    if (renderSettings)
      if (renderSettings.currentMonth !== dueDate.getMonth()) {
          renderSettings.currentMonth = dueDate.getMonth();
          
          renderMonth = true;
      }

    dueMonth = strings.MonthStrings[dueDate.getMonth()];    
  }

  return (
    <>
      {renderMonth && (
        <div className={MonthYearStyles.timelineStyle}>
          <header className={MonthYearStyles.timelineHeaderStyle}>
            <span className={MonthYearStyles.timelineMonthStyle}>{dueMonth}</span>            
          </header>
        </div>        
      )}
    </>
  )
}