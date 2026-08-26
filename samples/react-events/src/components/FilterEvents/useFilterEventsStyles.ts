import { tokens } from "@fluentui/react-components";
import { css } from "@emotion/css";

export const useFilterEventsStyles = (): {   closeButtonContainer: string } => {
  return {
    closeButtonContainer: css({
      borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    }),
  };
};
