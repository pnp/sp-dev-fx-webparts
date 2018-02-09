export type PageUpdateCallback = (pageNumber: number) => void;

interface IPagingProps {
    totalItems: number;
    itemsCountPerPage: number;
    onPageUpdate: PageUpdateCallback;
    currentPage: number;
}

export default IPagingProps;