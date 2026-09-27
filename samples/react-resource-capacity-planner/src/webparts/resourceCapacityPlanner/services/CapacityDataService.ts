import { IGetOnlyClient } from './SharePointGetOnlyClient';
import { dateRange, loadStatus, normalizeReservation, normalizeResource, validateConfig } from '../domain/capacity';
import { fetchPaged } from './pagination';

export interface ISourceState { id: string; label: string; status: string; resourceCount: number; reservationCount: number; error?: string; partial?: boolean; }
export interface IPlannerData { currentUser?: any; currentUserState: ISourceState; resources: any[]; reservations: any[]; sourceStates: ISourceState[]; malformedCount: number; }

export async function loadPlannerData(client: IGetOnlyClient, config: any, pageUrlValue: string, startDate: string, horizonDays: number): Promise<IPlannerData> {
  const valid = validateConfig(config, pageUrlValue);
  dateRange(startDate, horizonDays, valid);
  const pageHost = new URL(pageUrlValue).host;
  let currentUser: any;
  let currentUserState: ISourceState = { id: 'current-user', label: 'Current user', status: 'success', resourceCount: 0, reservationCount: 0 };
  try {
    const response = await client.get(valid.currentUserEndpoint);
    if (!response.ok) { const error: any = new Error(`Current user request returned ${response.status}.`); error.status = response.status; throw error; }
    currentUser = await response.json();
  } catch (error: any) {
    currentUserState = { ...currentUserState, status: loadStatus(error), error: error.message };
  }
  const sourceResults = await Promise.all(valid.sources.map(async (source: any): Promise<{ state: ISourceState; resources: any[]; reservations: any[]; malformed: number }> => {
    const state: ISourceState = { id: source.id, label: source.label, status: 'success', resourceCount: 0, reservationCount: 0 };
    const [resourceResult, reservationResult] = await Promise.allSettled([
      fetchPaged(client, source.resourcesEndpoint, valid.maxPageSize, valid.maxItems, pageHost),
      fetchPaged(client, source.reservationsEndpoint, valid.maxPageSize, valid.maxItems, pageHost)
    ]);
    const failures: string[] = [];
    const resourcePage = resourceResult.status === 'fulfilled' ? resourceResult.value : undefined;
    const reservationPage = reservationResult.status === 'fulfilled' ? reservationResult.value : undefined;
    const resourceError: any = resourceResult.status === 'rejected' ? resourceResult.reason : undefined;
    const reservationError: any = reservationResult.status === 'rejected' ? reservationResult.reason : undefined;
    if (resourceError) failures.push(`Resources: ${resourceError.message || 'load error'}`);
    if (reservationError) failures.push(`Reservations: ${reservationError.message || 'load error'}`);
    let malformed = 0;
    const resources = resourcePage ? resourcePage.items.flatMap((record) => { try { return [normalizeResource(record, source)]; } catch (_) { malformed += 1; return []; } }) : [];
    const reservations = reservationPage ? reservationPage.items.flatMap((record) => { try { return [normalizeReservation(record, source)]; } catch (_) { malformed += 1; return []; } }) : [];
    state.resourceCount = resources.length; state.reservationCount = reservations.length;
    state.partial = Boolean(failures.length || resourcePage?.partial || reservationPage?.partial || malformed);
    state.error = failures.length ? failures.join(' ') : undefined;
    if (failures.length === 2) state.status = loadStatus(resourceError || reservationError);
    else state.status = state.partial ? 'partial' : (resources.length || reservations.length ? 'success' : 'no-data');
    return { state, resources, reservations, malformed };
  }));
  return {
    currentUser,
    currentUserState,
    resources: sourceResults.flatMap((result) => result.resources),
    reservations: sourceResults.flatMap((result) => result.reservations),
    sourceStates: sourceResults.map((result) => result.state),
    malformedCount: sourceResults.reduce((total, result) => total + result.malformed, 0)
  };
}
