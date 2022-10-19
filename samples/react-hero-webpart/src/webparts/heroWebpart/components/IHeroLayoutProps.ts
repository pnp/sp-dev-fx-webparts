import { IListProps } from 'office-ui-fabric-react/lib/List';


export interface IHeroLayoutProps {
  items:any[];
  listProps?: Partial<IListProps>;
  isCollage:boolean;
}
