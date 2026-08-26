import { css } from '@emotion/css';
import { tokens } from '@fluentui/tokens';

export const styles = {
  container: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    textAlign: "center",
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusMedium,
    padding: `${tokens.spacingVerticalXL} ${tokens.spacingHorizontalXL}`,
    color: tokens.colorNeutralForeground1,
  }),
  icon: css({
    marginTop: tokens.spacingHorizontalXL,
    fontSize: "50px",
    marginBottom: tokens.spacingHorizontalXL,
    color: tokens.colorBrandBackground,
  }),
  message: css({
    marginBottom: tokens.spacingHorizontalXL,
  }),
};
