import { ActionButton, IButtonProps } from "office-ui-fabric-react/lib/Button";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { css } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";
import { IPagingProps, IPagingState } from ".";
import styles from "./Paging.module.scss";
import * as strings from "CalendarFeedSummaryWebPartStrings";

/**
 * A custom pagination control designed to look & feel like Office UI Fabric
 */
export class Paging extends React.Component<IPagingProps, IPagingState> {
    public render(): React.ReactElement<IPagingProps> {

        const { currentPage } = this.props;

        // calculate the page situation
        const numberOfPages: number = this._getNumberOfPages();

        // we disable the previous button if we're on page 1
        const prevDisabled: boolean = currentPage < 1;

        // we disable the next button if we're on the last page
        const nextDisabled: boolean = currentPage >= numberOfPages;

        return (
            <div className={css(styles.Paging, this.props.showPageNum ? null : styles.noPageNum)}>
                <ActionButton className={styles.prev}
                    data-automation-id="previousPage"
                    onRenderIcon={(props: IButtonProps) => {
                        // we use the render custom icon method to render the icon consistently with the right icon
                        return (
                            <Icon iconName="ChevronLeft" />
                        );
                    }}
                    disabled={prevDisabled}
                    onClick={this._prevPage}
                    ariaLabel={strings.PrevButtonAriaLabel}
                >
                    {strings.PrevButtonLabel}
                </ActionButton>
                {/* NOT IMPLEMENTED: Page numbers aren't shown here, but we'll need them if we want this control to be reusable */}
                <ActionButton className={styles.next}
                    data-automation-id="nextPage"
                    disabled={nextDisabled}
                    onRenderMenuIcon={(props: IButtonProps) => {
                        // we use the render custom menu icon method to render the icon to the right of the text
                        return (
                            <Icon iconName="ChevronRight" />
                        );
                    }}
                    onClick={this._nextPage}
                    ariaLabel={strings.NextButtonAriaLabel}
                >
                    {strings.NextButtonLabel}
                </ActionButton>
            </div>
        );
    }

    /**
     * Increments the page number unless we're on the last page
     */
    private _nextPage = (): void => {
        const numberOfPages: number = this._getNumberOfPages();
        if (this.props.currentPage < numberOfPages) {
            this.props.onPageUpdate(this.props.currentPage + 1);
        }
    }

    /**
     * Decrements the page number unless we're on the first page
     */
    private _prevPage = (): void => {
        if (this.props.currentPage > 1) {
            this.props.onPageUpdate(this.props.currentPage - 1);
        }
    }

    /**
     * Calculates how many pages there will be
     */
    private _getNumberOfPages(): number {
        const { totalItems, itemsCountPerPage } = this.props;
        let numPages: number = Math.round(totalItems / itemsCountPerPage);
        return numPages;
    }
}
