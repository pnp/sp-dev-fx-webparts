import { IReadonlyTheme } from '@microsoft/sp-component-base';

export interface IPaginationProps {
    currentPage: number;
    totalItems: number;
    itemsCountPerPage: number;
    showPageNum: boolean;
    onPageUpdate: (pageNumber: number) => void;
}
