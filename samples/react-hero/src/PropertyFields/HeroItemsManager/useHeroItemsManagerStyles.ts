import { css } from "@emotion/css";
import { tokens } from "@fluentui/react-components";

export interface IHeroItemsManagerStyles {
  addButtonWrapper: string;
  list: string;
}

export const useHeroItemsManagerStyles = (): IHeroItemsManagerStyles => ({
  addButtonWrapper: css({
    paddingBottom: tokens.spacingVerticalS,
  }),

  list: css({
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
    overflow: "hidden",
  }),
});
