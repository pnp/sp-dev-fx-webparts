// Converts a hex color (#rgb or #rrggbb) to an rgba() string at the given alpha.
// Used to tint chip/card backgrounds with a light tone of the content-type
// color while the left border keeps the full (dark) color. Non-hex input is
// returned unchanged so it degrades gracefully.
export function hexToRgba(hex: string, alpha: number): string {
  if (!hex || hex.charAt(0) !== "#") return hex

  let normalized = hex.slice(1)
  if (normalized.length === 3) {
    normalized = normalized
      .split("")
      .map((c) => c + c)
      .join("")
  }
  if (normalized.length !== 6) return hex

  const r = parseInt(normalized.slice(0, 2), 16)
  const g = parseInt(normalized.slice(2, 4), 16)
  const b = parseInt(normalized.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
