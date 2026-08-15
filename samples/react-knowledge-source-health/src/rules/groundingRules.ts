/**
 * Grounding rules for Copilot Studio SharePoint knowledge sources.
 *
 * Every rule must cite a Microsoft Learn page in `docsUrl`.
 * `verified` stays false until the threshold has been re-read against current
 * docs or observed in a tenant. Unverified rules are excluded from release builds.
 *
 * `checkable` records whether an SPFx web part can actually evaluate the rule
 * from the library's own list metadata. Agent-level settings live in Copilot
 * Studio, not in SharePoint, so the web part can only prompt the maker to
 * confirm them. Keeping that distinction in the data is what stops the UI
 * implying it checked something it never saw.
 *
 * Last verified against Learn: 2026-08-14.
 */

export type Severity = 'blocking' | 'degraded' | 'informational';

export type RuleScope = 'agent' | 'library' | 'document';

/** How the web part can establish the finding. */
export type Checkable =
  /** Derivable from the list and item metadata the web part can read. */
  | 'metadata'
  /** Needs the maker to confirm a Copilot Studio setting the web part cannot read. */
  | 'maker-confirms';

export interface GroundingRule {
  id: string;
  scope: RuleScope;
  severity: Severity;
  checkable: Checkable;
  title: string;
  /** What the user sees when the rule fires. */
  finding: string;
  /** What to do about it. */
  remediation: string;
  docsUrl: string;
  verified: boolean;
}

const KNOWLEDGE_SUMMARY =
  'https://learn.microsoft.com/microsoft-copilot-studio/knowledge-copilot-studio';
const UNSTRUCTURED =
  'https://learn.microsoft.com/microsoft-copilot-studio/knowledge-unstructured-data';

export const groundingRules: GroundingRule[] = [
  {
    id: 'auth-microsoft-required',
    scope: 'agent',
    severity: 'blocking',
    checkable: 'maker-confirms',
    title: 'Tenant graph grounding requires Microsoft authentication',
    finding:
      'Tenant graph grounding with semantic search requires the agent user authentication to be set to Authenticate with Microsoft. With any other method the setting cannot be changed at all.',
    remediation:
      'In Copilot Studio, set Security > Authentication to Authenticate with Microsoft, then enable tenant graph grounding with semantic search on the Generative AI settings page.',
    docsUrl: `${KNOWLEDGE_SUMMARY}#tenant-graph-grounding-with-semantic-search`,
    verified: true
  },
  {
    id: 'file-size-limit',
    scope: 'document',
    severity: 'blocking',
    checkable: 'metadata',
    title: 'File exceeds the supported size for grounding',
    finding:
      'With tenant graph grounding on and the maker holding a Microsoft 365 licence in the same tenant, SharePoint and Copilot connectors support files up to 200 MB. PDF, PPTX and DOCX files are supported up to 512 MB. Files above the applicable limit are not retrievable, and no error is shown to the maker.',
    remediation:
      'Split the document, or move the retrievable content into a smaller companion file. Converting a large file to PDF, PPTX or DOCX raises the ceiling to 512 MB.',
    docsUrl: `${KNOWLEDGE_SUMMARY}#tenant-graph-grounding-with-semantic-search`,
    // Two-tier rule. An implementation that applies a flat 200 MB to every
    // extension will report false positives on large PDF, PPTX and DOCX files.
    verified: true
  },
  {
    id: 'excel-semantic-search',
    scope: 'document',
    severity: 'degraded',
    checkable: 'metadata',
    title: 'Spreadsheet content is not reliably indexed by semantic search',
    finding:
      'Semantic search has limitations for cell indexing. Learn directs makers to use code interpreter rather than semantic search to search over Excel file content.',
    remediation:
      'Do not rely on this file for grounded answers. Enable code interpreter for structured data questions, or publish the key figures as a document.',
    docsUrl: `${KNOWLEDGE_SUMMARY}#tenant-graph-grounding-with-semantic-search`,
    verified: true
  },
  {
    id: 'sensitivity-label-blocks-grounding',
    scope: 'document',
    severity: 'blocking',
    checkable: 'metadata',
    title: 'Sensitivity label or password protection blocks the file',
    finding:
      'A file with a sensitivity setting of Confidential or Highly Confidential, or with password protection, is listed as part of the knowledge source but never produces answers.',
    remediation:
      'Relabel the document if the classification is wrong, remove the password, or accept that this content is out of scope and exclude the folder.',
    docsUrl: `${UNSTRUCTURED}#one-of-the-files-i-added-appears-as-part-of-the-knowledge-source-but-i-cant-get-answers-from-it-why`,
    verified: true
  },
  {
    id: 'unsupported-filename-character',
    scope: 'document',
    severity: 'blocking',
    checkable: 'metadata',
    title: 'File name contains an unsupported character',
    finding:
      'Learn lists an unsupported character in the file name as a documented cause of a SharePoint file appearing in the knowledge source but never answering.',
    remediation: 'Rename the file.',
    docsUrl: `${UNSTRUCTURED}#one-of-the-files-i-added-appears-as-part-of-the-knowledge-source-but-i-cant-get-answers-from-it-why`,
    // The failure mode is documented, the exact character set is not, so this
    // rule stays out of the release build until the set can be cited.
    verified: false
  },
  {
    id: 'knowledge-object-cap',
    scope: 'library',
    severity: 'blocking',
    checkable: 'metadata',
    title: 'Library exceeds the 500 knowledge object cap',
    finding:
      'An agent can hold a maximum of 500 knowledge objects across files, folders, knowledge articles and websites. When a folder exceeds the maximum, Copilot Studio indexes up to the limit, does not process the remainder, and does not indicate which items were skipped.',
    remediation:
      'Scope the knowledge source to a subfolder or a filtered view, or move to the SharePoint connector option, which queries SharePoint search rather than ingesting into Dataverse.',
    docsUrl: `${UNSTRUCTURED}#limits-and-limitations`,
    verified: true
  },
  {
    id: 'source-count-cap',
    scope: 'agent',
    severity: 'degraded',
    checkable: 'maker-confirms',
    title: 'Agent is near the knowledge source limits',
    finding:
      'An agent can use only five different source types at a time. Under generative orchestration, an internal model filters knowledge sources once there are more than 25, so sources compete for selection. Under classic orchestration the hard caps are four SharePoint URLs and four website URLs.',
    remediation:
      'Consolidate sources, or accept that source selection becomes model-driven and write precise source descriptions so the right one is chosen.',
    docsUrl: `${KNOWLEDGE_SUMMARY}#knowledge-search-in-classic-and-generative-modes`,
    verified: true
  },
  {
    id: 'sync-lag',
    scope: 'library',
    severity: 'informational',
    checkable: 'metadata',
    title: 'Recently changed content may not be retrievable yet',
    finding:
      'With the file upload option, content is synchronized every four to six hours after ingestion completes, and a refresh cannot be triggered manually. With the SharePoint connector option, retrieval goes through SharePoint search indexing, so new or updated items are not available until indexing completes.',
    remediation:
      'If freshness matters more than vector search quality, use the SharePoint connector option, which reflects the latest available content.',
    docsUrl: `${UNSTRUCTURED}#synchronization-and-file-refresh-frequency`,
    verified: true
  },
  {
    id: 'sharepoint-pages-unsupported',
    scope: 'library',
    severity: 'blocking',
    checkable: 'metadata',
    title: 'SharePoint Pages are not supported by the file upload connector',
    finding:
      'The SharePoint file upload connector does not currently support Pages. A site whose knowledge lives in news posts and site pages contributes nothing through this path.',
    remediation:
      'Use the full SharePoint connector knowledge source, which queries SharePoint search directly, or republish the content as documents.',
    docsUrl: `${UNSTRUCTURED}#sharepoint`,
    verified: true
  },
  {
    id: 'unsupported-file-type',
    scope: 'document',
    severity: 'blocking',
    checkable: 'metadata',
    title: 'File type is not supported as grounding content',
    finding:
      'An unsupported file type is a documented cause of a file appearing in the knowledge source without ever contributing to an answer.',
    remediation: 'Convert to a supported format or exclude the folder from the knowledge source.',
    docsUrl: `${UNSTRUCTURED}#one-of-the-files-i-added-appears-as-part-of-the-knowledge-source-but-i-cant-get-answers-from-it-why`,
    // The supported extension list is not enumerated here, so the rule stays
    // out of the release build rather than guessing it. Source to enumerate from:
    // https://learn.microsoft.com/microsoftsearch/semantic-index-for-copilot#supported-content-types
    verified: false
  },
  {
    id: 'missing-source-description',
    scope: 'library',
    severity: 'degraded',
    checkable: 'maker-confirms',
    title: 'Knowledge source has no description',
    finding:
      'Under generative orchestration the model uses knowledge source descriptions to decide which source to search. An empty description degrades source selection, and the effect compounds past 25 sources where filtering kicks in.',
    remediation: 'Write a one line description of what the library contains.',
    docsUrl:
      'https://learn.microsoft.com/microsoft-copilot-studio/advanced-generative-actions#authoring-descriptions',
    // The mechanism is confirmed on the knowledge summary page, but the
    // authoring guidance page is not yet cited, so this stays unverified.
    verified: false
  },
  {
    id: 'stale-content',
    scope: 'document',
    severity: 'informational',
    checkable: 'metadata',
    title: 'Document has not been modified in a long time',
    finding:
      'Not a platform limit. Stale policy documents are a common source of confidently wrong grounded answers, and nothing in the platform flags them.',
    remediation: 'Review or archive. Archived content should leave the knowledge source path.',
    docsUrl: KNOWLEDGE_SUMMARY,
    verified: true
  }
];

/** Rules safe to ship. Anything unverified is excluded from release builds. */
export const releaseRules = (): GroundingRule[] => groundingRules.filter(r => r.verified);

/** Rules the web part can evaluate on its own, without asking the maker. */
export const automaticRules = (): GroundingRule[] =>
  releaseRules().filter(r => r.checkable === 'metadata');
