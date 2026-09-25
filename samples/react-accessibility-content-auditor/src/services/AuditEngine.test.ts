import { auditContent, auditItem, RULE_HEADING_ORDER, RULE_LINK_TEXT, RULE_MISSING_ALT, RULE_REQUIRED_CONTENT } from './AuditEngine';
import { IAuditConfig, IContentItem } from '../models/AuditModels';

const config: IAuditConfig = { sourceType: 'list', pagePath: '', listTitle: 'News', itemLimit: 3, contentFields: ['Description'], requiredFields: ['Title'] };
const item: IContentItem = { id: '7', title: 'Example', sourceUrl: '/Lists/News/7', remediationUrl: 'https://contoso.sharepoint.com/Lists/News/EditForm.aspx?ID=7', fields: { Title: 'Example', Description: '' } };

describe('audit rules', () => {
  it('finds missing alt text', () => expect(auditItem({ ...item, fields: { ...item.fields, Description: '<img src="x.jpg">' } }, config).some((f) => f.rule === RULE_MISSING_ALT)).toBe(true));
  it('finds empty and generic link text', () => expect(auditItem({ ...item, fields: { ...item.fields, Description: '<a href="/x">Click here</a><a href="/y"></a>' } }, config).filter((f) => f.rule === RULE_LINK_TEXT)).toHaveLength(2));
  it('finds skipped heading levels', () => expect(auditItem({ ...item, fields: { ...item.fields, Description: '<h1>One</h1><h3>Three</h3>' } }, config).some((f) => f.rule === RULE_HEADING_ORDER)).toBe(true));
  it('finds empty required content', () => expect(auditItem({ ...item, fields: { ...item.fields, Title: '' } }, config).some((f) => f.rule === RULE_REQUIRED_CONTENT)).toBe(true));
  it('handles malformed content deterministically', () => expect(auditItem({ ...item, fields: { Title: 'x', Description: '<a href="/x">' } }, config).find((f) => f.severity === 'info')!.evidence).toContain('could not be fully parsed'));
  it('reports bounded audit results and preserves partial failures', () => expect(auditContent([item], config, 'News', ['Item 2 failed'])).toMatchObject({ itemsAudited: 1, failures: ['Item 2 failed'] }));
});
