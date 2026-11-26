import { IReadonlyTheme } from "@microsoft/sp-component-base"
import { createV9Theme } from "@fluentui/react-migration-v8-v9"
import { Theme, webDarkTheme, webLightTheme } from "@fluentui/react-components"

// Maps a SharePoint section/site theme onto a Fluent UI v9 theme. Centralized
// here (SRP) so the web part shell and any future host just call one function.
// Uses the sanctioned `createV9Theme` migration helper — this is theme mapping,
// not a v8 component tree.
export function mapSharePointThemeToV9(
  theme: IReadonlyTheme | undefined,
): Theme {
  const base = theme?.isInverted ? webDarkTheme : webLightTheme
  if (!theme) return base
  // createV9Theme's typings are stricter than IReadonlyTheme; the shape is
  // compatible at runtime.
  return createV9Theme(theme as never, base)
}
