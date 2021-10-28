import { IListProps } from 'office-ui-fabric-react/lib/List';

export interface ICompactLayoutProps {
  ariaLabel?: string;
  items: any[];

  /**
   * In case you want to override the underlying list
   */
  listProps?: Partial<IListProps>;

   /**
   * The method to render each cell item
   */
  onRenderGridItem: (item: any, index: number) => JSX.Element;
}

export interface ICompactLayoutState {
  events: any[];
  currentPage: number;
}
