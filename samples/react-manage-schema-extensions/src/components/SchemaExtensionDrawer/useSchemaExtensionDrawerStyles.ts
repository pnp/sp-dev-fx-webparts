/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { css } from "@emotion/css";
import { tokens } from "@fluentui/react-components";

export interface ISchemaExtensionDrawerStyles {
  drawerContent: string;
  scrollableContent: string;
  propertiesContainer: string;
  targetTypesSection: string;
  targetTypeCheckbox: string;
  addPropertyButton: string;
  removePropertyButton: string;
  inputDisabledColor: string;
  restrictionInfoMessage: string;
}

export const useSchemaExtensionDrawerStyles =
  (): ISchemaExtensionDrawerStyles => {
    return {
      inputDisabledColor: css({
        backgroundColor: tokens.colorNeutralBackground3,
        color: tokens.colorNeutralForeground1Selected,
      }),
      drawerContent: css({
        padding: tokens.spacingVerticalL,
        display: "flex",
        flexDirection: "column",
        gap: tokens.spacingVerticalM,
        height: "100%",
      }),

      scrollableContent: css({
        flex: 1,
        overflowY: "auto",
        paddingRight: tokens.spacingHorizontalXS,
      }),

      propertiesContainer: css({
        display: "grid",
        gridTemplateColumns: "1fr 1fr auto",
        gap: tokens.spacingHorizontalS,
        width: "100%",
      }),

      targetTypesSection: css({
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        gap: tokens.spacingHorizontalS,
        width: "100%",
      }),

      targetTypeCheckbox: css({
        marginBottom: tokens.spacingVerticalXS,
      }),

      addPropertyButton: css({
        minWidth: "auto",
      }),

      removePropertyButton: css({
        minWidth: "auto",
        color: tokens.colorNeutralForeground3,
        "&:hover": {
          color: tokens.colorNeutralForeground1,
        },
      }),

      restrictionInfoMessage: css({
        padding: tokens.spacingVerticalXS,
        backgroundColor: tokens.colorNeutralBackground2,
        borderRadius: tokens.borderRadiusSmall,
        marginBottom: tokens.spacingVerticalS,
      }),
    };
  };
