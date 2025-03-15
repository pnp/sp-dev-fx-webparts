import {
  getTheme,
  mergeStyles,
  mergeStyleSets,
  FontWeights,
} from "@fluentui/react";

import { 
  ICategoryData
} from '..';

export class calloutStyles {

  static palette = getTheme().palette;

  public static calloutTitleStyles = mergeStyles({
    marginBottom: '10px',
    color: this.palette.themeDarker,
    fontWeight: FontWeights.semibold,
    fontSize: '18px'
  });

  public static calloutStyles = mergeStyleSets({
    callout: {
      width: 320,
      padding: "20px 24px",
    },
    title: {
      marginBottom: 12,
      fontWeight: FontWeights.semilight,
    },
  });

  public static labelsBlockStyle = mergeStyles({
    paddingBottom: '10px',
    marginLeft: '0px'                             
  });

  public static labelItemStyle = mergeStyles({
    display: 'inline-block', 
    paddingRight: '3px', 
    marginBottom: '5px'
  });

  public static bucketLabelStyle = mergeStyles({
    marginTop: '-8px',
    paddingBottom: '5px',  
    fontSize: '16px',
    fontWeight: FontWeights.bold  
  });

  public static sectionTitleStyle = mergeStyles({
    display: 'inline-block',
    paddingBottom: '3px',
    fontSize: '16px',
    fontWeight: FontWeights.semibold
  });

  public static sectionHeadingStyle = mergeStyles({
    color: this.palette.themeDarker,
    fontSize: '16px',
    fontWeight: FontWeights.semibold
  });

  public static priorityStatusStyle = mergeStyles({
    paddingLeft: '5px',
    display: 'inline-block',
    fontSize: '16px',
    fontWeight: FontWeights.semilight
  });

  public static calloutNotesStyle = mergeStyles({
    marginBottom: '10px',
    fontSize: '14px'
  });

  public static checklistHeadingStyle = mergeStyles({
    color: this.palette.themeDarker,
    fontSize: '16px',
    fontWeight: FontWeights.semibold
  });

  public static checklistListStyle = mergeStyles({
    marginTop: '0px',
    alignItems: 'center',
    paddingBottom: '5px'
  });

  public static checklistItemStyle = mergeStyles({
    display: 'inline-block', 
    paddingRight: '3px',   
  });

  public static completeLabelStyle = mergeStyles({
    display: 'inline-block',
    paddingRight: '3px',  
    verticalAlign: 'middle'
  });

  public static competedItemStyle = mergeStyles({
    display: 'inline-block',
    paddingRight: '3px',  
    textDecoration: 'line-through',  
    verticalAlign: 'middle'
  });

  public static urgentIconStyle = mergeStyles({
    color: this.palette.red,
    marginRight: '3px',
  });

  public static lowIconStyle = mergeStyles({
    color: this.palette.blue,
    marginRight: '3px',
  });

  public static importantIconStyle = mergeStyles({
    color: this.palette.red,
    marginRight: '3px',
  });

  public static CompletedIconStyle = mergeStyles({
    color: this.palette.green,
    marginRight: '3px',
  });

  public static CheckListLineItemStyle = mergeStyles({
    display: 'flex'
  });

 // function to style the label
 public static labelItemColorStyle(label: ICategoryData): string {
    const className = mergeStyles({
      padding: "1px 5px",
      fontSize: "10px",
      backgroundColor: label.backgroundColor,
      color: label.color,
      borderRadius: '5px'
    });

    return className;
  }
}