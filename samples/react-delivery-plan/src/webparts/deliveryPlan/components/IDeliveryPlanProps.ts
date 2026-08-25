export interface IDeliveryPlanTask {
  id: number;
  title: string;
  resource: string;
  resourceEmail: string;
  phase: string;
  startDate: Date;
  endDate: Date;
  durationDays: number;
}

export interface IDeliveryPlanProps {
  tasks: IDeliveryPlanTask[];
  title: string;
  subtitle: string;
  listName: string;
  errorMessage?: string;
  isDarkTheme: boolean;
  hasTeamsContext: boolean;
  userDisplayName: string;
}

export interface ITabProps {
  tasks: IDeliveryPlanTask[];
  phaseColours: Map<string, string>;
  planStart: Date;
  planEnd: Date;
}

export type TabId = 'timeline' | 'workload' | 'tasklist' | 'phasesummary';
