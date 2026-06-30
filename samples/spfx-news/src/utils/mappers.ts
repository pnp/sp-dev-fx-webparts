import { INewsFeedItem } from '@spteck/react-controls-v2';
import { INewsPost } from '@spteck/m365-hooks';

/**
 * Maps a raw news post from the Graph Search hook to the INewsFeedItem
 * shape expected by the NewsFeed control.
 */
export function mapNewsPostToFeedItem(
  post: INewsPost,
  likes?: number,
  comments?: number
): INewsFeedItem {
  return {
    id: post.id,
    headline: post.title,
    bodyText: post.description,
    imageUrl: post.bannerImageUrlOWSURLH,
    author: post.createdByuser?.user?.displayName,
    date: post.firstPublishedDate,
    views: post.viewsLifeTime,
    likes,
    comments,
    linkUrl: post.path,
    category: post.siteTitle,
  };
}
