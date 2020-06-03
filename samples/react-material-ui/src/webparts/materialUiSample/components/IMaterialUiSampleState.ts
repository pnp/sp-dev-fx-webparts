import BookListItem from "./BookListItem";

export default interface IMaterialUiSampleState {
    books: BookListItem[];
    page: number;
    rowsPerPage: number;
    showDetailsDialog:boolean;
    book:BookListItem;
    searchValue:string;
}