export interface IPaginationProps {
    currentPage: number;
    totalItems: number;
    itemsCountPerPage: number;
    showPageNum: boolean;
    onPageUpdate: (pageNumber: number) => void;
}
