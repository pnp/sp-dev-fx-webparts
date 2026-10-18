import { ILibraryFacts, ILibrarySummary } from '../models/ScanTypes';

/**
 * Collects the facts the rule engine needs.
 *
 * Two implementations ship: one that reads a real site, and one that returns
 * fabricated data so the sample can be run and reviewed without first getting
 * API permissions approved in a tenant.
 */
export interface IScanService {
  listLibraries(): Promise<ILibrarySummary[]>;
  scanLibrary(library: ILibrarySummary, maxItems: number): Promise<ILibraryFacts>;
}
