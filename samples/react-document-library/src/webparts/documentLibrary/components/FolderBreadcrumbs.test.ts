import { createBreadcrumbItems } from './FolderBreadcrumbs';

describe('folder breadcrumbs', () => {
  test('shows the root only at the root', () => {
    expect(createBreadcrumbItems('/sites/demo/Documents', '/sites/demo/Documents', 'Documents')).toEqual([
      { key: '/sites/demo/Documents', label: 'Documents', path: '/sites/demo/Documents' }
    ]);
  });

  test('adds child segments while keeping the configured root', () => {
    expect(createBreadcrumbItems('/sites/demo/Documents', '/sites/demo/Documents/Finance/2026', 'Documents')).toEqual([
      { key: '/sites/demo/Documents', label: 'Documents', path: '/sites/demo/Documents' },
      { key: '/sites/demo/Documents/Finance', label: 'Finance', path: '/sites/demo/Documents/Finance' },
      { key: '/sites/demo/Documents/Finance/2026', label: '2026', path: '/sites/demo/Documents/Finance/2026' }
    ]);
  });
});
