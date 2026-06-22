/**
 * Returns visual status (color and background) for a given value,
 * based on how it compares to the defined sustainable threshold.
 */
export const getEmissionStatus = (
    value: number,
    threshold: number
  ): { color: string; background: string } => {
    if (value <= threshold) {
      return { color: '#107c10', background: '#e6f4ea' };      // Green
    }
    if (value <= threshold * 1.5) {
      return { color: '#d29200', background: '#fff4ce' };      // Yellow
    }
    return { color: '#a4262c', background: '#fde7e9' };         // Red
  };
  