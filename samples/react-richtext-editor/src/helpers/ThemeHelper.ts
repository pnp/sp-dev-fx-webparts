// src/helpers/ThemeHelper.ts

import { createDarkTheme, createLightTheme, BrandVariants, Theme } from "@fluentui/react-components";

// Define your brand variant
const ejazhussain: BrandVariants = {
  10: "#070200",
  20: "#281004",
  30: "#441509",
  40: "#5C180B",
  50: "#741A0C",
  60: "#8D1B0C",
  70: "#A7190B",
  80: "#C21609",
  90: "#D32E18",
  100: "#DC4B2F",
  110: "#E46346",
  120: "#EB795C",
  130: "#F18E74",
  140: "#F7A38B",
  150: "#FBB7A4",
  160: "#FECBBD",
};

// Create light theme
export const FluentUILightTheme: Theme = {
  ...createLightTheme(ejazhussain),
};

// Create dark theme
export const FluentUIDarkTheme: Theme = {
  ...createDarkTheme(ejazhussain),
};

// Customize dark theme
FluentUIDarkTheme.colorBrandForeground1 = ejazhussain[110]; // use brand[110] instead of brand[100]
FluentUIDarkTheme.colorBrandForeground2 = ejazhussain[120]; // use brand[120] instead of brand[110]
