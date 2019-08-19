export interface IPagingProps {
    currentPage: number;
    totalItems: number;
    itemsCountPerPage: number;
    showPageNum: boolean;
    onPageUpdate: (pageNumber: number) => void;
}

export interface IPagingState { }