export interface IListCommandBarProps {
selectedItem :any;
onActionSelected: (action:string) => void;
onSearch: (searchCondition: string) => void;
}
