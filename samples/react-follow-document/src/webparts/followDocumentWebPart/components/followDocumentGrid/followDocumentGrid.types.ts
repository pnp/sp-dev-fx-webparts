import {  ISize } from 'office-ui-fabric-react/lib/Utilities';
import { IListProps } from 'office-ui-fabric-react/lib/List';

export interface IfollowDocumentGridProps {
  
  ariaLabel?: string;
  items: any[];
  listProps?: Partial<IListProps>;
  onRenderGridItem: (item: any, finalSize: ISize, isCompact: boolean) => JSX.Element;
}

export interface IfollowDocumentGridState {}
