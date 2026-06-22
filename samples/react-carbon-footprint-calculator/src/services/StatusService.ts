import { EmissionCategory } from '../models/EmissionCategory';
import { ThresholdLimits } from '../models/ThresholdLimits';

/**
 * Returns the message bar type (Fluent UI) based on how the actual value compares to the threshold.
 */
export function getMessageBarStatus(value: number, category: EmissionCategory): 'success' | 'warning' | 'severeWarning' {
  const limit = ThresholdLimits[category];

  if (value <= limit) return 'success';
  if (value <= limit * 1.5) return 'warning';
  return 'severeWarning';
}

/**
 * Returns color and background to represent the emission level in UI.
 * Green: good, Yellow: moderate, Red: poor.
 */
export function getVisualStatus(value: number): { color: string; background: string } {
  if (value <= 600) {
    return { color: '#107c10', background: '#e6f4ea' }; // Green
  }
  if (value <= 1000) {
    return { color: '#d29200', background: '#fff4ce' }; // Yellow
  }
  return { color: '#a4262c', background: '#fde7e9' };     // Red
}
