import * as React from "react";
import { useContext } from "react";
import { PlannerTask } from '@microsoft/microsoft-graph-types'
import { webPartContext } from "../Context";
import * as moment from "moment";
import { MonthYearStyles } from "../../Styles";

export default function Year(task: PlannerTask): JSX.Element {
  const {renderSettings} = useContext(webPartContext);

  let renderYear: boolean = false;
  let dueDate: Date = new Date();
    
  if (task.dueDateTime) {
    dueDate = new Date(task.dueDateTime);
    if (renderSettings) {
      const dateDiff: number = moment(dueDate).diff(renderSettings.lastRenderedDate, 'seconds');

      // Set the last rendered due date
      renderSettings.lastRenderedDate = dueDate.toISOString();

      if (dateDiff < 0)
        renderYear = true;
      
      renderYear = renderSettings.renderYear

      if (!renderYear) {
        if (renderSettings.currentYear === 0) {      
          renderYear = true;
          renderSettings.currentYear = dueDate.getFullYear() || 0;
        } else {
          if (renderSettings.currentYear === dueDate.getFullYear()) {
            renderYear = false;
          } else {
            renderYear = true;
            
            if (renderSettings) {
              renderSettings.currentYear = dueDate.getFullYear() || 0;
              renderSettings.currentMonth = -1;
              renderSettings.renderMonth = true;
            }
          }    
        }
      }
    }
  }
  
  return (
    <>
      {renderYear && (
        <div className={MonthYearStyles.timelineStyle}>
          <header className={MonthYearStyles.timelineHeaderStyle}>
            <span className={MonthYearStyles.timelineYearStyle}>{dueDate?.getFullYear()}</span>
          </header>
        </div>        
      )}
    </>
  )
}
