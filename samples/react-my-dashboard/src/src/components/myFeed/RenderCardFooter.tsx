/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-floating-promises */
import * as React from 'react';

import {
  Caption1Strong,
  tokens,
} from '@fluentui/react-components';
import {
  Comment20Filled,
  ThumbLike20Filled,
} from '@fluentui/react-icons';

import { usePnPjs } from '../../hooks/usePnPjs';
import { ICommentsAndLikes } from '../../models/ICommentsAndLikes';
import { useItemStyles } from './useItemStyles';

export interface IRenderCardFooterProps {
  fields: any;
}

export const RenderCardFooter: React.FunctionComponent<IRenderCardFooterProps> = (
  props: React.PropsWithChildren<IRenderCardFooterProps>
) => {
  const { fields } = props;
  const { path, listId, listItemID } = fields || {};
  const styles = useItemStyles();
  const [commentsAndLikes, setCommentsAndLikes] = React.useState<ICommentsAndLikes>(null);
  const { getCommentsAndLikesForPage } = usePnPjs();

  React.useEffect(() => {
    (async () => {
      const commentsAndLikes: ICommentsAndLikes = await getCommentsAndLikesForPage(path, listId, listItemID);
      setCommentsAndLikes(commentsAndLikes);
    })();
  }, [path, listId, listItemID]);

  /*  const LikesIcon =  React.useMemo(() => bundleIcon(ThumbLike20Filled, ThumbLike20Regular), []);
    const CommentsIcon =  React.useMemo(() =>bundleIcon(Comment20Filled, Comment20Regular), []); */

  const iconLikesPrimaryFill = React.useMemo(
    () => (commentsAndLikes?.likes ? tokens.colorBrandForeground1 : tokens.colorNeutralStroke1),
    [commentsAndLikes?.likes]
  );
  const iconCommentsPrimaryFill = React.useMemo(
    () => (commentsAndLikes?.comments ? tokens.colorBrandForeground1 : tokens.colorNeutralStroke1),
    [commentsAndLikes?.comments]
  );
  return (
    <>
      <div className={styles.footerContainer}>
        <div className={styles.footerIconContainer}>
          <ThumbLike20Filled primaryFill={iconLikesPrimaryFill} />
          <Caption1Strong>{commentsAndLikes?.likes}</Caption1Strong>
        </div>
        <div className={styles.footerIconContainer}>
          <Comment20Filled primaryFill={iconCommentsPrimaryFill} />{" "}
          <Caption1Strong>{commentsAndLikes?.comments}</Caption1Strong>
        </div>
      </div>
    </>
  );
};
