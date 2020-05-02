import * as React from 'react';
import { useState } from 'react';
import styles from './Layouts.module.scss';
import { RenderDirection, LogHelper } from '@src/utilities';
import { IPage } from '@src/models/IPage';
import { ActionButton, Icon } from 'office-ui-fabric-react';
import { ILayoutProps } from './ILayoutProps';
import ReactResizeDetector from 'react-resize-detector';
import * as strings from 'PageHierarchyWebPartStrings';

export const BreadcrumbLayout: React.FunctionComponent<ILayoutProps> = props => {
  const [elementWidth, setElementWidth] = useState(props.domElement.getBoundingClientRect().width);

  // 455 was chosen because that's the smallest break pointin 2 column before it wraps and stacks
  let renderDirection = elementWidth > 455 ? RenderDirection.Horizontal : RenderDirection.Vertical;

  const renderPageAsBreadcrumb = (page: IPage, index: number, pages: IPage[]) => {
    if (page) {
      return (
        <li key={page.id} className={styles.breadcrumbLayoutItem}>
          <span className={styles.breadcrumbLayoutItemContainer}>
            <ActionButton
              style={{
                color: props.themeVariant.semanticColors.bodyText
              }}
              className={styles.breadcrumbLayoutItemButton}
              href={page.url}
              target="_self">
              {page.title}
            </ActionButton>
          </span>

          {index + 1 !== pages.length ?
            (
              <Icon iconName="ChevronRight" className={styles.breadcrumbLayoutHorizontalIcon} />
            ) : null
          }

        </li>
      );
    }
  };

  const renderPageAsStack = (page: IPage, index: number, pages: IPage[]) => {
    if (page) {
      return (
        <li key={page.id} className={styles.breadcrumbLayoutItem}>
          <Icon iconName="ChevronDown" className={styles.breadcrumbLayoutVerticalIcon} />

          <span className={styles.breadcrumbLayoutItemContainer}>
            <ActionButton
              style={{
                color: props.themeVariant.semanticColors.bodyText
              }}
              className={styles.breadcrumbLayoutItemButton}
              href={page.url}
              target="_self">
              {page.title}
            </ActionButton>
          </span>
        </li>
      );
    }
  };

  const renderPages = (pages: IPage[], ) => {
    if (renderDirection === RenderDirection.Horizontal) {
      return pages.map((value, index, array) => renderPageAsBreadcrumb(value, index, array));
    }
    else {
      return pages.map((value, index, array) => renderPageAsStack(value, index, array));
    }
  };

  const onResize = () => {
    setElementWidth(props.domElement.getBoundingClientRect().width);
  };

  //<div>DOM Element width: {elementWidth}</div>

  return (
    <div className={styles.layouts}>

      {props.pages.length > 0 ? (
        <ul className={renderDirection === RenderDirection.Horizontal ? styles.breadcrumbLayoutHorizontal : styles.breadcrumbLayoutVertical}>
          {renderPages(props.pages)}
        </ul>
      ) : (
        <span>{strings.Message_NoAncestorsFound}</span>
      )}

      <ReactResizeDetector handleWidth handleHeight onResize={onResize} />
    </div>
  );
};
