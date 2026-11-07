import type { IReadonlyTheme } from "@microsoft/sp-component-base";
import { webDarkTheme, webLightTheme } from "@fluentui/react-components";
import { readThemeColor, toFluentTheme } from "./theme";

describe("readThemeColor", () => {
  it("keeps a usable color string", () => {
    expect(readThemeColor("  #112233  ", "#000000")).toBe("#112233");
  });

  it("falls back when the host value is missing or not a string", () => {
    expect(readThemeColor(undefined, "#abcdef")).toBe("#abcdef");
    expect(readThemeColor(null, "#abcdef")).toBe("#abcdef");
    expect(readThemeColor(12, "#abcdef")).toBe("#abcdef");
    expect(readThemeColor("   ", "#abcdef")).toBe("#abcdef");
  });
});

describe("toFluentTheme", () => {
  it("uses the light theme when the host theme is missing", () => {
    expect(toFluentTheme(undefined).colorNeutralForeground1).toBe(webLightTheme.colorNeutralForeground1);
  });

  it("uses the dark theme when the host theme is inverted", () => {
    const theme = toFluentTheme({ isInverted: true } as IReadonlyTheme);
    expect(theme.colorNeutralForeground1).toBe(webDarkTheme.colorNeutralForeground1);
  });

  it("copies host colors and ignores values Fluent cannot serialize", () => {
    const theme = toFluentTheme({
      isInverted: false,
      semanticColors: {
        bodyText: "#112233",
        bodyBackground: 12
      },
      palette: {
        themePrimary: "#445566"
      }
    } as unknown as IReadonlyTheme);
    expect(theme.colorNeutralForeground1).toBe("#112233");
    expect(theme.colorNeutralBackground1).toBe(webLightTheme.colorNeutralBackground1);
    expect(theme.colorBrandBackground).toBe("#445566");
    expect(theme.colorCompoundBrandStroke).toBe("#445566");
  });
});
