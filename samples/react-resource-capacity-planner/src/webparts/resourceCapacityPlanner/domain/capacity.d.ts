export interface PlannerConfig { [key: string]: any; }
export interface PlannerResource { id: string; name: string; capacity: number; timezone: string; sourceId: string; sourceLabel: string; }
export interface PlannerReservation { id: string; resourceId: string; title: string; start: string; end: string; units: number; sourceId: string; sourceLabel: string; }
export interface DailyUtilization { resourceId: string; date: string; usedHours: number; availableHours: number; utilization: number; }
export interface WeeklyUtilization { resourceId: string; weekStart: string; usedHours: number; availableHours: number; utilization: number; }
export interface AvailableSlot { resourceId: string; date: string; start: string; end: string; remainingCapacity: number; }
export function validateConfig(config: PlannerConfig, pageUrl: string): PlannerConfig;
export function dateRange(startDate: string, horizonDays: number, config: PlannerConfig): { start: string; end: string; dates: string[] };
export function normalizeResource(record: any, source: any): PlannerResource;
export function normalizeReservation(record: any, source: any): PlannerReservation;
export function overlap(a: PlannerReservation, b: PlannerReservation): boolean;
export function overlapEdges(reservations: PlannerReservation[]): any[];
export function computeDailyUtilization(resources: PlannerResource[], reservations: PlannerReservation[], range: any, workingHours: any): DailyUtilization[];
export function computeWeeklyUtilization(daily: DailyUtilization[]): WeeklyUtilization[];
export function computeAvailableSlots(resources: PlannerResource[], reservations: PlannerReservation[], range: any, workingHours: any): AvailableSlot[];
export function loadStatus(error: any): string;
