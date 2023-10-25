/* eslint-disable no-unused-expressions */
import * as React from 'react';

import { Spinner } from '@fluentui/react-components';
import {
  SearchResults,
} from '@microsoft/mgt-react/dist/es6/generated/react-preview';
import {
  MgtTemplateProps,
} from '@microsoft/mgt-react/dist/es6/MgtTemplateProps';

import { useUtils } from '../../hooks/useUtils';
import { RenderItemTemplate } from './RenderItemTemplate';
import { RenderNoDataTemplate } from './RenderNoDataTemplate';
import { useItemStyles } from './useItemStyles';

export interface INewsProps {}

export const News: React.FunctionComponent<INewsProps> = (props: React.PropsWithChildren<INewsProps>) => {
  const styles = useItemStyles();
  const {getContainerHeight } = useUtils();

  const ListItemTemplate = React.useCallback((props: MgtTemplateProps): JSX.Element => {
    return <RenderItemTemplate dataContext={props.dataContext} />;
  }, []);

  const LoadingTemplate = React.useCallback((props: MgtTemplateProps) => {
    return (
      <div className={styles.spinnerStyles}>
        <Spinner size="tiny" />
      </div>
    );
  }, []);

  return (
    <>
      <div className={styles.centerContainer} style={{height: getContainerHeight()}}>
        <SearchResults
          size={10}
          pagingMax={0}
          queryString={`PromotedSTate:2 AND contentclass:STS_ListItem_WebPageLibrary AND
                       (FirstPublishedDate > 1970-01-01 AND FirstPublishedDate < ${new Date().toISOString()})`}
          fetchThumbnail={true}
          entityTypes={["listItem"]}
          fields={[
            "id",
            "ListItemID",
            "FirstPublishedDate",
            "description",
            "siteId",
            "webId",
            "path",
            "listId",
            "parentReference",
            "CreatedBy",
            "ViewsLifeTime",
            "SiteTitle",
            "title",
            "bannerImageUrlOWSURLH",
          ]}
        >
          <LoadingTemplate template="loading" />
          <ListItemTemplate template="result-listItem" />
          <RenderNoDataTemplate template="no-data" />
        </SearchResults>
      </div>
    </>
  );
};
