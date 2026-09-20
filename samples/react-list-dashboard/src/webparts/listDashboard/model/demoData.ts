import { IListRow } from './dashboardTypes';

// Demo rows so the web part renders immediately when dropped on a page,
// before a list is bound. Modelled as a simple "Projects" list. The Created
// dates span several months so the line / area views have a trend to draw.
export const DEMO_ROWS: IListRow[] = [
  { Title: 'Website redesign', Status: 'In progress', Region: 'North', Priority: 'High', Budget: 42000, Created: '2026-01-14' },
  { Title: 'Payroll migration', Status: 'Completed', Region: 'North', Priority: 'High', Budget: 65000, Created: '2026-01-27' },
  { Title: 'Onboarding portal', Status: 'In progress', Region: 'South', Priority: 'Medium', Budget: 28000, Created: '2026-02-09' },
  { Title: 'Data warehouse', Status: 'Planned', Region: 'East', Priority: 'High', Budget: 90000, Created: '2026-02-23' },
  { Title: 'Mobile app', Status: 'In progress', Region: 'West', Priority: 'Medium', Budget: 51000, Created: '2026-03-11' },
  { Title: 'Security review', Status: 'Completed', Region: 'East', Priority: 'High', Budget: 18000, Created: '2026-03-30' },
  { Title: 'Intranet refresh', Status: 'Planned', Region: 'South', Priority: 'Low', Budget: 22000, Created: '2026-04-08' },
  { Title: 'CRM rollout', Status: 'In progress', Region: 'North', Priority: 'High', Budget: 74000, Created: '2026-04-22' },
  { Title: 'Analytics dashboard', Status: 'Completed', Region: 'West', Priority: 'Medium', Budget: 33000, Created: '2026-05-15' },
  { Title: 'Support automation', Status: 'Planned', Region: 'East', Priority: 'Low', Budget: 15000, Created: '2026-05-29' },
  { Title: 'Cloud backup', Status: 'Completed', Region: 'South', Priority: 'Medium', Budget: 27000, Created: '2026-06-12' },
  { Title: 'Access governance', Status: 'In progress', Region: 'West', Priority: 'High', Budget: 46000, Created: '2026-06-26' }
];

// Field names used as sensible defaults when in demo mode (no list bound).
export const DEMO_CATEGORY_FIELD = 'Status';
export const DEMO_DATE_FIELD = 'Created';
