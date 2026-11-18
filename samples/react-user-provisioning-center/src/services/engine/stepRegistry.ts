import type { JobType } from '../../models';
import type { IWorkflowStepDefinition } from './stepTypes';
import { CLONE_STEPS, ONBOARDING_STEPS } from './steps/onboardingSteps';
import { OFFBOARDING_STEPS } from './steps/offboardingSteps';
import { TRANSFER_STEPS } from './steps/transferSteps';

const DEFAULT_PIPELINES: Record<JobType, IWorkflowStepDefinition[]> = {
  Onboard: ONBOARDING_STEPS,
  Offboard: OFFBOARDING_STEPS,
  Transfer: TRANSFER_STEPS,
  Clone: CLONE_STEPS,
  Bulk: ONBOARDING_STEPS
};

const pipelines: Record<JobType, IWorkflowStepDefinition[]> = { ...DEFAULT_PIPELINES };

export function registerStepPipeline(jobType: JobType, steps: IWorkflowStepDefinition[]): void {
  pipelines[jobType] = steps;
}

export function resetStepPipeline(jobType: JobType): void {
  pipelines[jobType] = DEFAULT_PIPELINES[jobType];
}

export function stepsForJobType(jobType: JobType): IWorkflowStepDefinition[] {
  return pipelines[jobType] ?? DEFAULT_PIPELINES.Onboard;
}
