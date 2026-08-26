import type { IPrincipalListItem } from '../../../../common/interfaces';

export const principalToLoginName = (p: IPrincipalListItem): string =>
  p.loginName ?? p.email ?? String(p.id);

export const togglePermLevel = (ids: number[], id: number): number[] =>
  ids.includes(id) ? ids.filter((i) => i !== id) : [...ids, id];
