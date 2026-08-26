import { CompatibilityLevel } from './NormalizedPage';

export interface CompatibilityOverride {
  readonly id: string;
  readonly title: string;
  readonly compatibility: CompatibilityLevel;
  readonly notes: string;
}
