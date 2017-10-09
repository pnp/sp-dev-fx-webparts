export type PageUpdateCallback = (pageNumber: number) => void;

interface IPagingProps {
    numberOfPages: number;
    onPageUpdate: PageUpdateCallback;
    currentPage: number;
}

export default IPagingProps;