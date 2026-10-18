/** Categorical palette for analytics charts (Fluent data-viz aligned). */
export const CHART_PALETTE: string[] = [
  '#0f6cbd',
  '#107c10',
  '#b146c2',
  '#d83b01',
  '#5c2e91',
  '#038387',
  '#ca5010',
  '#797775'
];

/** Pick a stable color for a category index. */
export function paletteColor(index: number): string {
  return CHART_PALETTE[index % CHART_PALETTE.length];
}

export const CHART_HEIGHT = 220;
export const DONUT_HEIGHT = 240;
