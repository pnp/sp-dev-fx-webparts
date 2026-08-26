import { css } from "@emotion/css";
import { tokens } from "@fluentui/react-components";

export interface IHeroItemDetailStyles {
  root: string;
  sectionTitle: string;

  toggleRow: string;
  rangeRow: string;
  rangeValue: string;
  imagePreview: string;
  imagePreviewImg: string;
  videoPreviewIframe: string;
  videoOptionsGroup: string;
  requiredAsterisk: string;
  errorMessage: string;
}

export const useHeroItemDetailStyles = (): IHeroItemDetailStyles => ({
  root: css({
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
  }),

  sectionTitle: css({
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    paddingTop: tokens.spacingVerticalL,
    paddingBottom: tokens.spacingVerticalL,
  }),

  toggleRow: css({
    minHeight: "50px",
  }),

  rangeRow: css({
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  }),

  rangeValue: css({
    fontSize: tokens.fontSizeBase100,

    minWidth: "30px",
    textAlign: "right",
    flexShrink: 0,
  }),

  imagePreview: css({
    borderRadius: tokens.borderRadiusMedium,
    overflow: "hidden",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    background: tokens.colorNeutralBackground3,
  }),

  imagePreviewImg: css({
    width: "100%",
    height: "150px",
    objectFit: "cover",
    display: "block",
  }),

  videoPreviewIframe: css({
    border: "none",
    width: "100%",
    aspectRatio: "16 / 9",
    display: "block",
  }),

  videoOptionsGroup: css({
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
    padding: `${tokens.spacingVerticalS} 0`,
  }),

  requiredAsterisk: css({
    color: tokens.colorPaletteRedForeground1,
    marginLeft: tokens.spacingHorizontalXXS,
  }),

  errorMessage: css({
    color: tokens.colorPaletteRedForeground1,
    fontSize: tokens.fontSizeBase100,
    marginTop: tokens.spacingVerticalXXS,
  }),
});
