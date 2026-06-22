import { css } from "@emotion/css";
import { tokens } from "@fluentui/react-components";

export interface IHeroItemRowStyles {
  rowWrapper: string;
  row: string;
  rowExpanded: string;
  dragHandle: string;
  dragHandleExpanded: string;
  dragHandleDragging: string;
  actions: string;
}

export const useHeroItemRowStyles = (): IHeroItemRowStyles => ({
  rowWrapper: css({
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    "&:last-child": { borderBottom: "none" },
  }),

  row: css({
    minHeight: "36px",
    paddingLeft: tokens.spacingHorizontalXS,
    paddingRight: tokens.spacingHorizontalXS,
    boxSizing: "border-box",
    userSelect: "none",
  }),

  rowExpanded: css({
    borderLeft: `3px solid ${tokens.colorBrandBackground}`,
    paddingLeft: `calc(${tokens.spacingHorizontalXS} - 3px)`,
  }),

  dragHandle: css({
    flexShrink: 0,
    color: tokens.colorNeutralForeground4,
    cursor: "grab",
    ":hover": { color: tokens.colorBrandForeground1 },
  }),

  dragHandleExpanded: css({
    color: tokens.colorBrandForeground1,
  }),

  dragHandleDragging: css({
    cursor: "grabbing",
  }),

  actions: css({
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
  }),
});
