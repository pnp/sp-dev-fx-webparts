export interface IPagedItems<T> {
  items: T[];
  nextHref?: string;
  //pagedItemCollection?: PagedItemCollection<any>;
}
