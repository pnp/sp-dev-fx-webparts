import {
  makeStyles,
  shorthands,
  tokens,
} from '@fluentui/react-components';

export const    useEventStyles = makeStyles({
    
     card: {
        marginRight: "10px",
        marginBottom: "10px",
        rowGap: "5px",
        maxWidth: "100%",
        width: "100%",
       height: "fit-content",
        backgroundColor: tokens.colorNeutralBackground1,
         ...shorthands.overflow("hidden"),
    },   
    cardHeader:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "start",
    },
    cardBody:{
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "start",
        
    },
    cardTextSubject:{             
        paddingBottom: "20px",
    } ,
    userDisplayName:{
         color: tokens.colorNeutralForeground2  
    } , 
    dateTitle:{
        color: tokens.colorNeutralForeground2,
         paddingRight: "10px"
    } ,  
});