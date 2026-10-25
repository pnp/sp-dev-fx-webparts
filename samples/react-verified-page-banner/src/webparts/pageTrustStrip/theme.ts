import type { IReadonlyTheme } from "@microsoft/sp-component-base";
import { webDarkTheme, webLightTheme, type Theme } from "@fluentui/react-components";

/**
 * Host theme values are not always strings. A non-string token makes Fluent
 * throw while it writes the theme stylesheet, which leaves the web part blank.
 */
export function readThemeColor(value: unknown, fallback: string): string {
  if (typeof value === "string") {
    const trimmed: string = value.trim();
    if (trimmed.length > 0) {
      return trimmed;
    }
  }
  return fallback;
}

/**
 * Maps the SharePoint page theme onto a Fluent UI v9 theme so the strip
 * follows the host colors instead of a fixed palette.
 */
export function toFluentTheme(spTheme: IReadonlyTheme | undefined): Theme {
  const base: Theme = spTheme && spTheme.isInverted ? { ...webDarkTheme } : { ...webLightTheme };
  if (!spTheme) {
    return base;
  }
  const semantic = spTheme.semanticColors;
  const palette = spTheme.palette;
  if (!semantic && !palette) {
    return base;
  }
  const stroke = semantic && (semantic.bodyDivider || semantic.variantBorder);
  const brand = palette && palette.themePrimary;
  return {
    ...base,
    colorNeutralBackground1: readThemeColor(semantic && semantic.bodyBackground, base.colorNeutralBackground1),
    colorNeutralForeground1: readThemeColor(semantic && semantic.bodyText, base.colorNeutralForeground1),
    colorNeutralForeground2: readThemeColor(semantic && semantic.bodySubtext, base.colorNeutralForeground2),
    colorNeutralStroke1: readThemeColor(stroke, base.colorNeutralStroke1),
    colorNeutralBackground3: readThemeColor(semantic && semantic.bodyStandoutBackground, base.colorNeutralBackground3),
    colorBrandBackground: readThemeColor(brand, base.colorBrandBackground),
    colorBrandForeground1: readThemeColor(brand, base.colorBrandForeground1),
    colorCompoundBrandBackground: readThemeColor(brand, base.colorCompoundBrandBackground),
    colorCompoundBrandStroke: readThemeColor(brand, base.colorCompoundBrandStroke),
    colorBrandForegroundLink: readThemeColor(semantic && semantic.link, base.colorBrandForegroundLink)
  };
}
