import { createUseStyles } from "react-tss/lib";
import { ETemplateSectionFeedback } from "../../utils/Types";

export const FeedbackFormStyles = createUseStyles({
  classes: {
    feedbackSection: {
      width: "90%",
      [`&.${ETemplateSectionFeedback.main}`]: {},
      [`&.${ETemplateSectionFeedback.section}`]: {
        padding: "16px 10px",
      },
    },
    feedbackSectionRow: {
      position: "relative",
      "&.feedbackButton": {
        display: "flex",
        justifyContent: "center",
        marginTop: "32px",
      },
      "&.feedbackSent": {
        display: "flex",
        justifyContent: "center",
      },
      "&.feedbackLoader": {
        width: "100%",
        paddingTop: "50%",
      },
    },
    feedbackSectionTitle: {
      lineHeight: "30px",
      [`.${ETemplateSectionFeedback.main} &`]: {},
      [`.${ETemplateSectionFeedback.section} &`]: {},
    },
    feedbackSectionTextarea: {
      minHeight: "96px",
      width: "100%",
      border: "1px solid #454D56",
      borderRadius: "4px",
      marginTop: "8px",
      paddingTop: "16px",
      paddingLeft: "16px",
      resize: "none",
      [`.${ETemplateSectionFeedback.main} &`]: {},
      [`.${ETemplateSectionFeedback.section} &`]: {},
    },
    feedbackSectionRate: {
      marginTop: "16px",
    },
    feedbackSectionButton: {
      borderRadius: "4px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      width: "185px",
      height: "48px",
    },
    feedbackTitle: {
      lineHeight: "27px",
    },
  },
});
