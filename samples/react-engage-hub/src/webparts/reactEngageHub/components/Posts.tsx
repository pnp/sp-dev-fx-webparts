import { Image, makeStyles, Spinner, Text } from "@fluentui/react-components"
import * as React from "react"
import { useEffect } from "react"
import { deletePost, updatePostLikeUnlike } from "../services/SPService"
import { LOADMOREPOSTSLABEL, LOADPOSTSLABEL } from "../constants/posts"
import { WEBPARTCONTEXT } from "../context/webPartContext"
import { IReactEngageHubProps } from "../IReactEngageHubProps"
import { usePosts } from "../hooks/usePosts"
import { useInfiniteScroll } from "../hooks/useInfiniteScroll"
import { PostList } from "./PostList"

export interface IPostsProps {}

const useStyles = makeStyles({
  newCommentBtn: {
    position: "absolute",
    right: "0",
    bottom: "0",
    marginRight: "0.5rem",
    marginBottom: "0.5rem",
  },
  newcommentTextarea: {
    width: "100%",
    position: "relative",
  },
  image: {
    width: "inherit",
    height: "inherit",
    borderRadius: "8px",
    "&:hover": {
      cursor: "pointer",
    },
  },
  postCardWrapper: {
    overflowY: "auto",
    height: "350px",
    paddingBottom: "3rem",
    paddingLeft: "0.15rem",
    paddingRight: "0.15rem",
    paddingTop: "0.15rem",
  },
  card: {
    marginBottom: "0.75rem",
  },
  noPostImage: {
    width: "350px",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "5rem",
  },
  recentPostsSubtitle: {
    marginLeft: "0.15rem",
  },
  postActions: {
    display: "flex",
    gap: "0.25rem",
    alignItems: "flex-end",
  },
})
export const Posts = ({ refreshTrigger }: any) => {
  const [isLoaderRef, setLoaderRef] = React.useState<boolean>(false)
  const [isCompactView, setIsCompactView] = React.useState(true)

  const { context, isDarkTheme } =
    React.useContext<IReactEngageHubProps>(WEBPARTCONTEXT)
  const loaderRef = React.useRef<HTMLDivElement | null>(null)

  const fluentStyles = useStyles()

  const { fetchPosts, fetchMorePosts, posts, hasMore, isLoading, nextLink } =
    usePosts(context)

  useInfiniteScroll(loaderRef, isLoaderRef, hasMore, nextLink, fetchMorePosts)

  useEffect(() => {
    fetchPosts()
  }, [refreshTrigger])

  const onClickPostLikeBtn = async (postId: number, postLike: boolean) => {
    await updatePostLikeUnlike(postId, postLike)
    await fetchPosts()
  }

  const handlePostDelete = async (postId: string, itemId: number) => {
    await deletePost(postId, itemId)
    fetchPosts()
  }

  if (isLoading) {
    return <Spinner size='medium' label={LOADPOSTSLABEL} />
  }

  if (posts.length === 0) {
    return (
      <Image
        className={fluentStyles.noPostImage}
        src={require("../assets/nopost.png")}
        alt='No posts found'
      />
    )
  }

  return (
    <>
      <Text
        size={300}
        weight='semibold'
        className={fluentStyles.recentPostsSubtitle}
      >
        Recent Posts
      </Text>
      <div className={fluentStyles.postCardWrapper}>
        <PostList
          posts={posts}
          context={context}
          isDarkTheme={isDarkTheme}
          fluentStyles={fluentStyles}
          isCompactView={isCompactView}
          setIsCompactView={setIsCompactView}
          fetchPosts={fetchPosts}
          onClickPostLikeBtn={onClickPostLikeBtn}
          handlePostDelete={handlePostDelete}
        />
        {hasMore && nextLink && (
          <div
            ref={(el) => {
              loaderRef.current = el
              setLoaderRef((el) => !el)
            }}
          >
            <Spinner size='tiny' label={LOADMOREPOSTSLABEL} />
          </div>
        )}
      </div>
    </>
  )
}
