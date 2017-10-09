import * as React from "react";
import IPagingProps from "./IPagingProps";
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';

export default class Paging extends React.Component<IPagingProps, null> {

    constructor(props: IPagingProps) {
        super(props);

        this._onPageUpdate = this._onPageUpdate.bind(this);
    }

    public render(): React.ReactElement<IPagingProps> {

        const pageNumbers = [];
        for (let i = 1; i <= this.props.numberOfPages; i++) {
          pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <a href="#" key={ number } className={ number === this.props.currentPage ? "active": null } onClick={ () => { this._onPageUpdate(number); } }>{ number }</a>
            );
        });

        let pagingControl: JSX.Element = null;

        if (renderPageNumbers.length > 1) {
            pagingControl =  <div>
                                <a  href="#" 
                                    onClick={() => {
                                        const prevPage = this.props.currentPage - 1; 
                                        if (prevPage > 0) {
                                            this.props.onPageUpdate(prevPage); 
                                        }
                                    }}>
                                    <i className="ms-Icon ms-Icon--ChevronLeft" aria-hidden="true"></i>
                                </a>
                                { renderPageNumbers }
                                <a  href="#" 
                                    onClick={() => { 
                                        const nextPage = this.props.currentPage + 1; 
                                        if (nextPage <= this.props.numberOfPages) {
                                            this.props.onPageUpdate(nextPage);
                                        }                     
                                    }}><i className="ms-Icon ms-Icon--ChevronRight" aria-hidden="true"></i>
                                </a>
                            </div>;
        }

        return(
            <div className="searchWp__paginationContainer">
                <div className="searchWp__paginationContainer__pagination">
                    { pagingControl }                        
                </div>
            </div>
        );
    }

    private _onPageUpdate(pageNumber: number): void {
        this.props.onPageUpdate(pageNumber);
    }
}
    