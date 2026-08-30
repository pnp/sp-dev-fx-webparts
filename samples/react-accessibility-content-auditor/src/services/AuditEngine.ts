import { IAuditConfig, IAuditFinding, IAuditResult, IContentItem } from '../models/AuditModels';
import { normalizeAuditConfig } from '../models/AuditConfig';
import { parseContent } from './ContentParser';

export const RULE_MISSING_ALT = 'Missing alt text';
export const RULE_LINK_TEXT = 'Empty or non-descriptive link text';
export const RULE_HEADING_ORDER = 'Heading order';
export const RULE_REQUIRED_CONTENT = 'Empty required content';
export const RULE_MALFORMED_CONTENT = 'Malformed content';

const GENERIC_LINK_TEXT = new Set(['click here', 'here', 'read more', 'learn more', 'more', 'link', 'this']);
const evidence = (value: string): string => value.replace(/\s+/g, ' ').trim().slice(0, 220);
const fieldText = (value: unknown): string => typeof value === 'string' ? value : value === null || value === undefined ? '' : String(value);
const finding = (item: IContentItem, rule: string, severity: IAuditFinding['severity'], detail: string, index: number): IAuditFinding => ({
  id: `${item.id}:${rule}:${index}`,
  severity,
  rule,
  evidence: evidence(detail),
  item: item.title || item.id,
  remediationUrl: item.remediationUrl
});

export const isNonDescriptiveLinkText = (text: string): boolean => !text || GENERIC_LINK_TEXT.has(text.toLowerCase());

export const auditItem = (item: IContentItem, inputConfig: IAuditConfig): IAuditFinding[] => {
  const config = normalizeAuditConfig(inputConfig);
  const findings: IAuditFinding[] = [];
  let index = 0;
  for (const field of config.requiredFields) {
    if (!fieldText(item.fields[field]).replace(/<[^>]*>/g, '').trim()) findings.push(finding(item, RULE_REQUIRED_CONTENT, 'error', `${field} is empty`, index++));
  }
  let previousHeading: number | undefined;
  for (const field of config.contentFields) {
    const content = parseContent(item.fields[field]);
    for (const image of content.images) {
      if (!image.alt?.trim()) findings.push(finding(item, RULE_MISSING_ALT, 'error', `${field}: ${image.tag}`, index++));
    }
    for (const link of content.links) {
      const label = link.ariaLabel?.trim() || link.text || link.title?.trim() || '';
      if (isNonDescriptiveLinkText(label)) findings.push(finding(item, RULE_LINK_TEXT, 'warning', `${field}: ${link.tag}`, index++));
    }
    for (const heading of content.headings) {
      if (previousHeading !== undefined && heading.level > previousHeading + 1) {
        findings.push(finding(item, RULE_HEADING_ORDER, 'warning', `${field}: h${previousHeading} followed by h${heading.level}`, index++));
      }
      previousHeading = heading.level;
    }
    if (content.malformed) findings.push(finding(item, RULE_MALFORMED_CONTENT, 'info', `${field}: content could not be fully parsed`, index++));
  }
  return findings;
};

export const auditContent = (items: IContentItem[], config: IAuditConfig, sourceLabel: string, failures: string[] = []): IAuditResult => ({
  sourceLabel,
  itemsAudited: items.length,
  findings: items.reduce<IAuditFinding[]>((findings: IAuditFinding[], item: IContentItem): IAuditFinding[] => findings.concat(auditItem(item, config)), []),
  failures: failures.slice()
});
