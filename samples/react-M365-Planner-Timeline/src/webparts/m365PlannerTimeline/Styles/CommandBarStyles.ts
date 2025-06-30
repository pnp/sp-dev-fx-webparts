import {
  mergeStyles,
  IStackStyles,
  DefaultPalette,
} from "@fluentui/react";

export class CommandBarStyles {
  public static stackStyles: IStackStyles = {
    root: {
      paddingTop: '5px',    
      height: '40px',
      width: '100%',
      background: DefaultPalette.themeLighterAlt,
    },  
  };

  public static BucketLabelStyle = mergeStyles({
    paddingRight: '5px',     
    verticalAlign: "middle" 
  });

  public static barDivStyle = mergeStyles({
    display: 'flex',
    alignItems: 'center'
  });

  public static activeTasksToggleStyle = mergeStyles({
    paddingTop: '8px',
    paddingLeft: '3px',        
    verticalAlign: "middle" ,
    label: {
      minWidth: "38px",
      maxWidth: "38px",
      marginRight: '3px !important',
    }
  });

  public static refreshButtonStyle = mergeStyles({
    width: '30px', 
    height: '30px', 
    marginLeft: '5px',
    ':hover': {
      backgroundColor: DefaultPalette.themeLight + ' !important',
      color: DefaultPalette.black + ' !important',
    }
  });

  public static bucketDropdownStyle = mergeStyles({
    paddingLeft: '3px',
    paddingRight: '3px',
    minWidth: '200px',
    maxWidth: '200px',
    verticalAlign: "middle",
  });
}
