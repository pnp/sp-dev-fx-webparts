import * as React from "react";
import IPagingProps from "./IPagingProps";
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import Pagination from "react-js-pagination";

export default class Paging extends React.Component<IPagingProps, null> {

    constructor(props: IPagingProps) {
        super(props);

        this._onPageUpdate = this._onPageUpdate.bind(this);
    }

    public render(): React.ReactElement<IPagingProps> {

        return(
            <div className="searchWp__paginationContainer">
                <div className="searchWp__paginationContainer__pagination">
                <Pagination
                    activePage={this.props.currentPage}
                    firstPageText={<i className="ms-Icon ms-Icon--DoubleChevronLeft" aria-hidden="true"></i>}
                    lastPageText={<i className="ms-Icon ms-Icon--DoubleChevronRight" aria-hidden="true"></i>}
                    prevPageText={<i className="ms-Icon ms-Icon--ChevronLeft" aria-hidden="true"></i>}
                    nextPageText={<i className="ms-Icon ms-Icon--ChevronRight" aria-hidden="true"></i>}
                    activeLinkClass={ "active" }
                    itemsCountPerPage={ this.props.itemsCountPerPage }
                    totalItemsCount={ this.props.totalItems }
                    pageRangeDisplayed={5}
                    onChange={this.props.onPageUpdate}
                />                      
                </div>
            </div>
        );
    }

    private _onPageUpdate(pageNumber: number): void {
        this.props.onPageUpdate(pageNumber);
    }
}
    