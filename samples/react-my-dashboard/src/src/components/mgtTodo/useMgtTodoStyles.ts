import {
  makeStyles,
  shorthands,
  tokens,
} from '@fluentui/react-components';

export const useMgtTodoStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: tokens.colorNeutralBackground1,
        ...shorthands.overflow("hidden"),
        ...shorthands.gap("10px"),
        paddingLeft: "10px",
        paddingRight: "10px",
        paddingBottom: "20px",
        position: "relative",
        width: "100%",
        overflowY: "auto",
      /*   height: "calc(100vh - 160px)", */
        justifyContent: "start",
        textAlign: "center",
        "::-webkit-scrollbar-thumb": {
          ...shorthands.borderRadius("10px"),
          backgroundColor: tokens.colorNeutralBackground4,
        },
        "::-webkit-scrollbar": {
          height: "10PX",
          width: "7PX",
        },
    
        "scrollbar-width": "thin",
      
      },
      todo: {
        "--neutral-stroke-input-rest": tokens.colorNeutralForeground2,
        "--neutral-fill-input-rest": tokens.colorNeutralBackground4,
        "--task-complete-background":  tokens.colorNeutralBackground4,
        "--neutral-foreground-rest": tokens.colorNeutralForeground1,
        "--task-background-color": "transparent",
        "--task-complete-background-color": tokens.colorNeutralForeground2,        
        "--task-background-color-hover":  tokens.colorNeutralBackground4,
        "--task-box-shadow": "none" ,
        "--task-radio-background-color": tokens.colorBrandForeground1
    }
});