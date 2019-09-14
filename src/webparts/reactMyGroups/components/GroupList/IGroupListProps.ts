export interface IGroupListProps {
  groups?: any[];
  onRenderItem: (item: any, index: number) => JSX.Element;
}
