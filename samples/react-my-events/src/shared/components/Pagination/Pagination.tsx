import { ActionButton, IButtonProps } from "office-ui-fabric-react/lib/Button";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { css } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";
import { IPaginationProps } from ".";
import styles from "./Pagination.module.scss";
import * as strings from "ReactMyEventsWebPartStrings";
import { useCallback } from 'react';

/**
 * A custom pagination control designed to look & feel like Office UI Fabric
 */
export const Pagination = (props: IPaginationProps) => {
  const { currentPage, totalItems, itemsCountPerPage } = props;

  // calculate the page situation
  const numberOfPages: number = Math.round(totalItems / itemsCountPerPage);

  // we disable the previous button if we're on page 1
  const prevDisabled: boolean = currentPage <= 1;

  // we disable the next button if we're on the last page
  const nextDisabled: boolean = currentPage >= numberOfPages;


  /**
       * Increments the page number unless we're on the last page
       */
  const _nextPage = useCallback((): void => {
    if (props.currentPage < numberOfPages) {
      props.onPageUpdate(props.currentPage + 1);
    }
  }, [props, numberOfPages]);

  /**
   * Decrements the page number unless we're on the first page
   */
  const _prevPage = useCallback((): void => {
    if (props.currentPage > 1) {
      props.onPageUpdate(props.currentPage - 1);
    }
  }, [props]);

  return (
    <div className={css(styles.Pagination, props.showPageNum ? null : styles.noPageNum)}>
      <ActionButton className={css(styles.prev, prevDisabled && styles.nogo)}
        onRenderIcon={(_props: IButtonProps) => {
          // we use the render custom icon method to render the icon consistently with the right icon
          return (
            <Icon iconName="ChevronLeft" />
          );
        }}
        disabled={prevDisabled}
        onClick={_prevPage}
        ariaLabel="Prev"
      >
        Prev      </ActionButton>
      {/* NOT IMPLEMENTED: Page numbers aren't shown here, but we'll need them if we want this control to be reusable */}
      <ActionButton className={css(styles.next, nextDisabled && styles.nogo)}
        data-automation-id="nextPage"
        disabled={nextDisabled}
        onRenderMenuIcon={(_props: IButtonProps) => {
          // we use the render custom menu icon method to render the icon to the right of the text
          return (
            <Icon iconName="ChevronRight" />
          );
        }}
        onClick={_nextPage}
        ariaLabel="Next"
      >
       Next
      </ActionButton>
    </div>
  );
};
