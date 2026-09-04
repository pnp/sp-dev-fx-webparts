/**
 * Facts the scanner collects. Deliberately plain data with no SharePoint types,
 * so the rule engine is pure and can be unit tested without a tenant.
 */

export interface IDocumentFacts {
  id: string;
  name: string;
  webUrl: string;
  /** Lowercase extension without the dot. Empty string when the file has none. */
  extension: string;
  sizeBytes: number;
  /** ISO 8601. */
  lastModified: string;
  /**
   * Display name of the sensitivity label, when the library exposes one.
   * Undefined means "not known", never "no label". See ILibraryFacts.sensitivityLabelsAvailable.
   */
  sensitivityLabel?: string;
}

export interface ILibraryFacts {
  id: string;
  title: string;
  webUrl: string;
  /** Item count reported by the list, which can exceed the number of documents actually scanned. */
  totalItemCount: number;
  /** True for a Site Pages library (list template 119). */
  isPagesLibrary: boolean;
  /**
   * False when the sensitivity label column could not be read. Rules that depend
   * on it are then reported as not evaluated rather than as passing.
   */
  sensitivityLabelsAvailable: boolean;
  /** True when the scan hit its item cap and did not read the whole library. */
  truncated: boolean;
  documents: IDocumentFacts[];
}

export interface ILibrarySummary {
  id: string;
  title: string;
  webUrl: string;
  itemCount: number;
  isPagesLibrary: boolean;
}
