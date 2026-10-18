import { IScanService } from './IScanService';
import { ILibraryFacts, ILibrarySummary } from '../models/ScanTypes';

/**
 * Fabricated data, so the web part can be run on the local workbench and
 * reviewed before any tenant API permission has been approved.
 *
 * Every document here exists to make one rule fire, which also makes this the
 * quickest way to see what the rules actually do. Nothing in this file talks
 * to SharePoint.
 */

const daysAgo = (days: number): string => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString();
};

const hoursAgo = (hours: number): string => {
  const d = new Date();
  d.setHours(d.getHours() - hours);
  return d.toISOString();
};

const MB: number = 1024 * 1024;

const LIBRARIES: ILibrarySummary[] = [
  {
    id: 'demo-policies',
    title: 'Policies (demo data)',
    webUrl: 'https://contoso.sharepoint.com/sites/hr/Policies',
    itemCount: 612,
    isPagesLibrary: false
  },
  {
    id: 'demo-pages',
    title: 'Site Pages (demo data)',
    webUrl: 'https://contoso.sharepoint.com/sites/hr/SitePages',
    itemCount: 24,
    isPagesLibrary: true
  }
];

export class DemoScanService implements IScanService {
  public async listLibraries(): Promise<ILibrarySummary[]> {
    return LIBRARIES;
  }

  public async scanLibrary(library: ILibrarySummary, maxItems: number): Promise<ILibraryFacts> {
    const documents =
      library.id === 'demo-pages'
        ? [
            {
              id: '1',
              name: 'Welcome.aspx',
              webUrl: `${library.webUrl}/Welcome.aspx`,
              extension: 'aspx',
              sizeBytes: 24 * 1024,
              lastModified: daysAgo(10),
              sensitivityLabel: undefined
            }
          ]
        : [
            {
              id: '1',
              name: 'Employee handbook.pdf',
              webUrl: `${library.webUrl}/Employee handbook.pdf`,
              extension: 'pdf',
              // Over 200 MB but under 512 MB. Passes, because PDF gets the higher tier.
              sizeBytes: 340 * MB,
              lastModified: daysAgo(30),
              sensitivityLabel: 'General'
            },
            {
              id: '2',
              name: 'Site backup archive.zip',
              webUrl: `${library.webUrl}/Site backup archive.zip`,
              extension: 'zip',
              // Over 200 MB and not a tiered extension. Blocking.
              sizeBytes: 260 * MB,
              lastModified: daysAgo(120),
              sensitivityLabel: 'General'
            },
            {
              id: '3',
              name: 'Salary bands 2026.xlsx',
              webUrl: `${library.webUrl}/Salary bands 2026.xlsx`,
              extension: 'xlsx',
              sizeBytes: 2 * MB,
              lastModified: daysAgo(45),
              sensitivityLabel: 'Highly Confidential'
            },
            {
              id: '4',
              name: 'Expenses policy.docx',
              webUrl: `${library.webUrl}/Expenses policy.docx`,
              extension: 'docx',
              sizeBytes: 1 * MB,
              // Older than the default 24 month staleness threshold.
              lastModified: daysAgo(1100),
              sensitivityLabel: 'General'
            },
            {
              id: '5',
              name: 'Travel policy.docx',
              webUrl: `${library.webUrl}/Travel policy.docx`,
              extension: 'docx',
              sizeBytes: 800 * 1024,
              // Just changed, so it may not have synchronized yet.
              lastModified: hoursAgo(1),
              sensitivityLabel: 'General'
            },
            {
              id: '6',
              name: 'Code of conduct.pdf',
              webUrl: `${library.webUrl}/Code of conduct.pdf`,
              extension: 'pdf',
              sizeBytes: 4 * MB,
              lastModified: daysAgo(60),
              sensitivityLabel: 'General'
            }
          ];

    return {
      id: library.id,
      title: library.title,
      webUrl: library.webUrl,
      totalItemCount: library.itemCount,
      isPagesLibrary: library.isPagesLibrary,
      sensitivityLabelsAvailable: true,
      truncated: documents.length > maxItems,
      documents: documents.slice(0, maxItems)
    };
  }
}
