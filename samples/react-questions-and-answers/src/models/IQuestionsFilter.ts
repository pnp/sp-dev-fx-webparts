export interface IQuestionsFilter {
    // paging information
    pageSize: number;

    // sorting information
    orderByColumnName: string;
    orderByAscending: boolean;

    // filtering information
    searchText?: string;

    selectedShowQuestionsOption: string;

    // optional category filter
    category: string | null;

    // question or conversation
    discussionType: string;
}
