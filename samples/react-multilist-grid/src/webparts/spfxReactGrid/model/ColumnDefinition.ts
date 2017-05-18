export enum SortDirection {
    None,
    Ascending,
    Descending
}
export default class ColumnDefinition {

    public constructor(
        public guid: string,
        public name: string,
        public width: number,
        public editable: boolean = true,
        public type: string = "Text",
        public sortDirection:SortDirection = SortDirection.None,
        public sortSequence:Number=0
    )
    { }

}
