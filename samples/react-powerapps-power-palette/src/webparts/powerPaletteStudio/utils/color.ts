import { IColor } from "../models/IColors"

export interface ColorConfig {
  color: string
  value: string
  "aria-label": string
}

// Helper to convert HSL to HEX
const hslToHex = (h: number, s: number, l: number): string => {
  l /= 100
  const a = (s * Math.min(l, 1 - l)) / 100
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0")
  }
  return `${f(0)}${f(8)}${f(4)}`
}

// Generate harmonious colors based on a base hue
export const generateColors = (): IColor[] => {
  // Generate a random base hue (0-360)
  const baseHue = Math.floor(Math.random() * 360)

  // Vary saturation and lightness for each generation
  const baseSaturation = 60 + Math.floor(Math.random() * 20) // 60-80%
  const baseLightness = 45 + Math.floor(Math.random() * 15) // 45-60%

  // Pre-calculate semantic colors to ensure consistency
  const successHex = hslToHex(
    140 + Math.random() * 20 - 10,
    65 + Math.random() * 15,
    40 + Math.random() * 10
  )

  const warningHex = hslToHex(
    35 + Math.random() * 20 - 10,
    85 + Math.random() * 10,
    50 + Math.random() * 10
  )

  const errorHex = hslToHex(
    5 + Math.random() * 15 - 7,
    70 + Math.random() * 15,
    50 + Math.random() * 10
  )

  const infoHex = hslToHex(
    210 + Math.random() * 20 - 10,
    75 + Math.random() * 15,
    45 + Math.random() * 10
  )

  return [
    {
      color: `#${hslToHex(baseHue, baseSaturation, baseLightness)}`,
      value: hslToHex(baseHue, baseSaturation, baseLightness),
      "aria-label": "Primary",
    },
    {
      color: `#${hslToHex(baseHue, baseSaturation - 10, baseLightness + 5)}`,
      value: hslToHex(baseHue, baseSaturation - 10, baseLightness + 5),
      "aria-label": "Secondary",
    },
    {
      color: `#${hslToHex(
        (baseHue + 180) % 360,
        baseSaturation,
        baseLightness
      )}`,
      value: hslToHex((baseHue + 180) % 360, baseSaturation, baseLightness),
      "aria-label": "Accent",
    },
    {
      color: `#${successHex}`,
      value: successHex,
      "aria-label": "Success",
    },
    {
      color: `#${warningHex}`,
      value: warningHex,
      "aria-label": "Warning",
    },
    {
      color: `#${errorHex}`,
      value: errorHex,
      "aria-label": "Error",
    },
    {
      color: `#${infoHex}`,
      value: infoHex,
      "aria-label": "Info",
    },
  ]
}

export const generatePowerAppsFormula = (colors: IColor[]): string => {
  return `AppTheme = {
    // Core Brand Colors
    BrandPrimary: ColorValue("#${colors[0].value}"),
    BrandSecondary: ColorValue("#${colors[1].value}"),
    BrandAccent: ColorValue("#${colors[2].value}"),

    // Semantic Colors
    Success: ColorValue("#${colors[3].value}"),
    Warning: ColorValue("#${colors[4].value}"),
    Error: ColorValue("#${colors[5].value}"),
    Info: ColorValue("#${colors[6].value}"),

    // Base Surface Colors
    Background: ColorValue("#ffffff"),
    Foreground: ColorValue("#000000"),

    // Text Colors
    TextPrimary: ColorValue("#1f2937"),
    TextSecondary: ColorValue("#6b7280"),
    TextDisabled: ColorValue("#9ca3af"),

    // Control State Colors
    Border: ColorValue("#e5e7eb"),
    BorderDisabled: ColorValue("#f3f4f6"),
    ControlBackground: ColorValue("#f9fafb")
};`
}
