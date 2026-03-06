import { css } from "@emotion/css";
import { tokens } from "@fluentui/react-components";

export const useGanttListPickerStyles = (): {
  styles: {
    container: string;
    section: string;
    sectionTitle: string;
    fieldRow: string;
    fieldLabel: string;
    columnsGrid: string;
    spinner: string;
    validationList: string;
  };
} => {
  const styles = {
    container: css({
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    }),
    section: css({
      display: "flex",
      flexDirection: "column",
      gap: "6px",
      paddingTop: "8px",
    }),
    sectionTitle: css({
      fontWeight: 600,
      fontSize: "13px",
      color: tokens.colorNeutralForeground1,
      borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
      paddingBottom: "4px",
    }),
    fieldRow: css({
      display: "flex",
      alignItems: "center",
      gap: "8px",
      paddingTop: "4px",
    }),
    fieldLabel: css({
      minWidth: "90px",
      fontSize: "12px",
      fontWeight: 500,
      color: tokens.colorNeutralForeground2,
    }),
    columnsGrid: css({
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "4px 12px",
    }),
    spinner: css({
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "12px",
    }),
    validationList: css({
      display: "flex",
      flexDirection: "column",
      gap: "2px",
      marginTop: "4px",
      padding:10
    }),
  };
  return { styles };
};
