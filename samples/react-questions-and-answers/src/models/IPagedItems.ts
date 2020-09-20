import { PagedItemCollection } from '@pnp/sp/items';

export interface IPagedItems<T> {
  items: T[];
  pagedItemCollection?: PagedItemCollection<any>;
}
