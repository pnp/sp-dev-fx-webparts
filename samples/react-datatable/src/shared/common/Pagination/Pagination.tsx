import * as React from "react";
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import styles from "./Pagination.module.scss";
import { isEqual } from "lodash";
import { Dropdown, DropdownMenuItemType, IDropdownOption, IDropdownProps } from 'office-ui-fabric-react/lib/Dropdown';

export interface IPaginationProps {
    /**
     * The page initial selected
     */
    currentPage: number;
    /**
     * The total items for which you want to generate pagination
     */
    totalItems: number;
    /**
     * When the page number change send the page number selected
     */
    onChange: (pageNo: number, rowsPerPage: number) => void;
    /**
     * The number of pages showing before the icon
     */
    limiter?: number;
    /**
     * Hide the quick jump to the first page
     */
    hideFirstPageJump?: boolean;
    /**
     * Hide the quick jump to the last page
     */
    hideLastPageJump?: boolean;
    /**
     * Limitir icon, by default is More icon
     */
    limiterIcon?: string;

}

export interface IPaginationState {
    totalPages: number;
    currentPage: number;
    paginationElements: number[];
    limiter: number;
    rowsPerPage?: number;
}
export class Pagination extends React.Component<IPaginationProps, IPaginationState> {
    constructor(props: Readonly<IPaginationProps>) {
        super(props);
        this.state = {
            currentPage: props.currentPage,
            paginationElements : [],
            limiter: props.limiter ? props.limiter : 3,
            totalPages: 0,
            rowsPerPage: 10
        };
    }

   public componentDidMount(){
        let totalPages = this.getTotalPages(this.props.totalItems);
        const paginationElements = this.preparePaginationElements(totalPages);
        this.setState({totalPages, paginationElements});
    }

    private getTotalPages(totalItems: number) {
        return totalItems ? Math.ceil(totalItems / this.state.rowsPerPage) : 0;
    }

    public componentDidUpdate(prevProps: IPaginationProps) {
        let { currentPage, paginationElements, totalPages } = this.state;

        if (prevProps.totalItems !== this.props.totalItems) {
            totalPages = this.getTotalPages(this.props.totalItems);
            paginationElements = this.preparePaginationElements(totalPages);
            currentPage = (currentPage > totalPages) ? totalPages : currentPage;
        }
        if (this.props.currentPage !== prevProps.currentPage) {
            currentPage = this.props.currentPage > totalPages ? totalPages : this.props.currentPage;
        }

        if (!isEqual(this.state.currentPage, currentPage) || !isEqual(this.state.paginationElements, paginationElements) || !isEqual(this.state.totalPages, totalPages)) {
            this.setState({
                paginationElements,
                currentPage,
                totalPages
            });
        }
    }
   
    public render(): React.ReactElement<IPaginationProps> {
        return (
            <div className={`${styles.pagination} pagination-container`}>
                {!this.props.hideFirstPageJump &&
                    <DefaultButton
                        disabled={this.props.currentPage === 1}
                        className={`${styles.buttonStyle} pagination-button pagination-button_first`}
                        onClick={() => this.onClick(1)}
                        iconProps={{ iconName: "DoubleChevronLeft" }}>  First
                    </DefaultButton>
                }
                <DefaultButton
                    disabled={this.props.currentPage === 1}
                    className={`${styles.buttonStyle} pagination-button pagination-button_prev`}
                    onClick={() => this.onClick(this.state.currentPage - 1)}
                    iconProps={{ iconName: "ChevronLeft" }}> Prev
                </DefaultButton>
                {this.state.paginationElements.map((pageNumber) => this.renderPageNumber(pageNumber))}
                <DefaultButton
                    disabled={this.state.totalPages === this.props.currentPage}
                    className={`${styles.buttonStyle} pagination-button pagination-button_next`}
                    onClick={() => this.onClick(this.state.currentPage + 1)}
                    iconProps={{ iconName: "ChevronRight" }}> Next
                </DefaultButton>
                {!this.props.hideLastPageJump &&
                    <DefaultButton
                        disabled={this.state.totalPages === this.props.currentPage}
                        className={`${styles.buttonStyle} pagination-button pagination-button_last`}
                        onClick={() => this.onClick(this.state.totalPages)}
                        iconProps={{ iconName: "DoubleChevronRight" }}> Last
                    </DefaultButton>
                }
            </div>
        );
    }

    private preparePaginationElements = (totalPages: number) => {
        let paginationElementsArray = [];
        for (let i = 0; i < totalPages; i++) {
            paginationElementsArray.push(i + 1);
        }
        return paginationElementsArray;
    }

    private onClick = (page: number) => {
        this.setState({ currentPage: page });
        this.props.onChange(page, this.state.rowsPerPage);
    }

    private renderPageNumber(pageNumber) {
        if (pageNumber === this.state.currentPage) {
            return (
                <PrimaryButton
                    className={styles.buttonStyle}
                    onClick={() => this.onClick(pageNumber)}
                    text={pageNumber}>
                </PrimaryButton>
            );
        } else {
            if (!(pageNumber < this.state.currentPage - this.state.limiter || pageNumber > this.state.currentPage + this.state.limiter)) {
                return (
                    <DefaultButton
                        className={styles.buttonStyle}
                        onClick={() => this.onClick(pageNumber)}
                        text={pageNumber}>
                    </DefaultButton>);
            }
            else if (!(pageNumber < this.state.currentPage - this.state.limiter - 1 || pageNumber > this.state.currentPage + this.state.limiter + 1)) {
                if (this.props.limiterIcon) {
                    return (<DefaultButton
                        className={styles.buttonStyle}
                        onClick={() => this.onClick(pageNumber)}
                        iconProps={{ iconName: this.props.limiterIcon ? this.props.limiterIcon : "More" }}>
                    </DefaultButton>);
                }
                else {
                    return (<DefaultButton
                        className={styles.buttonStyle}
                        onClick={() => this.onClick(pageNumber)}
                        iconProps={{ iconName: this.props.limiterIcon ? this.props.limiterIcon : "More" }}>
                    </DefaultButton>);
                }
            }
            else {
                return;
            }
        }
    }
}