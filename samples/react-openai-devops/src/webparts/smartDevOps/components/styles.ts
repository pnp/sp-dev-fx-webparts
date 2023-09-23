import { mergeStyleSets } from "@fluentui/merge-styles";
import { getTheme } from "@fluentui/react/lib/Styling";
import { IButtonStyles } from "@fluentui/react/lib/Button";
import { ITextFieldStyles } from "@fluentui/react/lib/TextField";
import { ISpinnerStyles } from "@fluentui/react/lib/Spinner";

export interface IDevopsOpenAIChatWindowStyles {
  organizationLabel: string;
  chatButtonIcon: string;
  chatWindowContainer: string;
  chatWindow: string;
  chatMessage: string;
  chatWindowHeader: string;
  chatWindowHeaderText: string;
  chatWindowMessageList: string;
  chatWindowFooter: string;
  chatWindowFooterButtons: string;
  sendChatButton: string;
  show: string;
  hide: string;
}

const theme: any = getTheme();
const ThemeState = (<any>window).__themeState__;
function getThemeColor(slot: string) {
  if (ThemeState && ThemeState.theme && ThemeState.theme[slot]) {
    return ThemeState.theme[slot];
  }
  return theme[slot];
}

// const fadeIn = keyframes({
//   from: {
//     opacity: 0,
//   },
//   to: {
//     opacity: 1,
//   },
// });

// const fadeOut = keyframes({
//   from: {
//     opacity: 1,
//   },
//   to: {
//     opacity: 0,
//   },
// });

export const chatButtonStyles: Partial<IButtonStyles> = {
  root: {
    color: getThemeColor("neutralPrimary"),
    marginLeft: "auto",
    marginTop: "4px",
    marginRight: "2px",
    marginBottom: "2px",
    backgroundColor: getThemeColor("neutralLighter"),
    boxShadow: "0 0 10px rgba(0,0,0,0.2)",
    selectors: {
      ":hover": {
        backgroundColor: getThemeColor("neutralLight"),
        color: getThemeColor("neutralDark"),
      },
    },
  },
  rootHovered: {
    color: getThemeColor("neutralDark"),
  },
};

export const sendChatTextFiledStyles: Partial<ITextFieldStyles> = {
  root: {
    backgroundColor: "#fff",
    selectors: {
      ":hover": {
        backgroundColor: "#fff",
        color: "#000",
      },
    },
    width: "89%",
    marginRight: "5px",
  },
  field: {
    backgroundColor: "#fff",
    selectors: {
      ":focus": {
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        backgroundColor: "#fff",
        color: "#000",
      },
    },
  },
};

export const chatMinimiseButtonStyles: Partial<IButtonStyles> = {
  root: {
    color: "#fff",
  },
  rootHovered: {
    color: "#fff",
  },
  rootPressed: {
    color: "#fff",
  },
};

export const loadingSpinnerStyles: Partial<ISpinnerStyles> = {
  root: {
    paddingTop: "10px",
    paddingLeft: "7px",
  },
  circle: {
    borderColor: "#113b92 #589bfe #589bfe",
  },
};

export const getStyles = (): IDevopsOpenAIChatWindowStyles => {
  return mergeStyleSets({
    organizationLabel: {
      color: getThemeColor("themePrimary"),
      fontSize: "14px",
      fontWeight: "500",
      marginBottom: "10px",
    },

    chatButtonIcon: {
      color: "#113b92 !important",
    },
    chatWindowContainer: {
      position: "relative",
      zIndex: 1000,
      backgroundColor: "rgb(249 245 232)",
    },
    chatWindow: {
      // backgroundColor: getThemeColor("neutralLighter"),
      color: getThemeColor("neutralPrimary"),
      padding: "10px",
      width: "100%",
      boxSizing: "border-box",
      overflow: "auto",
    },
    chatMessage: {
      // animationName: fadeIn,
      // animationDuration: "0.25s",
      // animationIterationCount: "1",
      // animationTimingFunction: "ease-in-out",
      // '.rce-mbox': {
      //   backgroundColor: 'cornsilk',
      // },
    },
    chatWindowHeader: {
      backgroundColor: getThemeColor("themePrimary"),
      color: "#fff",
      display: "flex",
      boxSizing: "border-box",
      borderBottom: "1px solid " + getThemeColor("neutralLight"),
      cursor: "pointer",
      borderRadius: "5px 5px 0 0",
      /* selectors: {
                ':hover': {
                    backgroundColor: getThemeColor("neutralLight"),
                    color: getThemeColor("neutralDark")
                }
            } */
    },
    chatWindowHeaderText: {
      marginLeft: "10px",
      flex: 2,
      paddingTop: "5px",
    },
    chatWindowMessageList: {
      minHeight: "150px",
      maxHeight: "400px",
      padding: "10px 2px",
      borderRadius: "5px",
      //   backgroundColor: '#589bfe',
    },
    chatWindowFooter: {
      // backgroundColor: getThemeColor("neutralLighter"),
      color: getThemeColor("neutralPrimary"),
      display: "flex",
      boxSizing: "border-box",
      borderTop: `1px solid #000`,
      padding: "10px",
      borderRadius: "0 0 5px 5px",
    },
    chatWindowFooterButtons: {
      paddingTop: "15px",
    },
    sendChatButton: {
      color: "#113b92",
    },
    show: {
      display: "block",
      // animationName: fadeIn,
      // animationDuration: "0.25s",
      // animationIterationCount: "1",
      // animationTimingFunction: "ease-in-out",
    },
    hide: {
      display: "none",
      // animationName: fadeOut,
      // animationDuration: "0.25s",
      // animationIterationCount: "1",
      // animationTimingFunction: "ease-in-out",
    },
  });
};
