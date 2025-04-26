import {
  Avatar,
  Button,
  Card,
  Divider,
  Image,
  makeStyles,
  Spinner,
  Text,
  Textarea,
} from "@fluentui/react-components"
import * as React from "react"
import { useEffect } from "react"
import {
  addNewComment,
  deletePost,
  getPosts,
  updatePostLikeUnlike,
} from "../services/SPService"
import styles from "../ReactEngageHub.module.scss"
import { Send16Color } from "@fluentui/react-icons"
import { LOADMOREPOSTSLABEL, LOADPOSTSLABEL } from "../../constants/constants"
import { ImagePreview } from "./ImagePreview"
import { WEBPARTCONTEXT } from "../../context/webPartContext"
import { IReactEngageHubProps } from "../IReactEngageHubProps"
import { MoreOptions } from "./MoreOptions"
import { Comments } from "./Comments"
import { LikeUnlike } from "./LikeUnlike"

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
    paddingTop: "0.25rem",
    height: "350px",
    paddingBottom: "3rem",
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
})
export const Posts = ({ refreshTrigger }: any) => {
  const [posts, setPosts] = React.useState<any>([])
  const [newComments, setNewComments] = React.useState<{
    [key: number]: string
  }>({})
  const [nextLink, setNextLink] = React.useState<string | undefined>()
  const [hasMore, setHasMore] = React.useState<boolean>(true)
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [isLoaderRef, setLoaderRef] = React.useState<boolean>(false)
  const { context, isDarkTheme } =
    React.useContext<IReactEngageHubProps>(WEBPARTCONTEXT)

  const fluentStyles = useStyles()

  const loaderRef = React.useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    fetchPosts()
  }, [refreshTrigger])

  useEffect(() => {
    const current = loaderRef.current

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0]
        if (first.isIntersecting && hasMore && nextLink) {
          fetchMorePosts()
        }
      },
      { threshold: 1.0 }
    )

    if (current) {
      observer.observe(current)
    }

    return () => {
      if (current) observer.unobserve(current)
    }
  }, [isLoaderRef, hasMore, nextLink])

  const onClickPostLikeBtn = async (postId: number, postLike: boolean) => {
    await updatePostLikeUnlike(postId, postLike)
    await fetchPosts()
  }

  const onClickNewCommentBtn = async (postId: number) => {
    await addNewComment(postId, newComments[postId])
    setNewComments({ ...newComments, [postId]: "" })
    await fetchPosts()
  }

  const handleNewCommentChange = (postId: number, value: string) => {
    setNewComments({ ...newComments, [postId]: value })
  }

  const fetchPosts = async () => {
    setIsLoading(true)
    const data = await getPosts(context)
    setPosts(data.items)
    setHasMore(data.hasMore)
    setNextLink(data.nextLink)
    setIsLoading(false)
  }

  const fetchMorePosts = async () => {
    if (!nextLink || !hasMore) return

    try {
      const response = await getPosts(context, nextLink)

      // Only add new items if we get them
      if (response.items && response.items.length > 0) {
        setPosts((prev: any) => [...prev, ...response.items])
        setHasMore(response.hasMore)
        setNextLink(response.nextLink)
      } else {
        // No more items to load
        setHasMore(false)
        setNextLink(undefined)
      }
    } catch (error) {
      setHasMore(false)
      setNextLink(undefined)
    }
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
      <Text size={300} weight='semibold'>
        Recent Posts
      </Text>
      <div className={fluentStyles.postCardWrapper}>
        {posts &&
          posts.map((post: any) => (
            <Card className={fluentStyles.card}>
              <article key={post.ID} className={styles.article}>
                <div className={styles.avatar}>
                  <Avatar name={post.AuthorName} size={36} />
                  <div className={styles.author}>
                    <Text>{post.AuthorName}</Text>
                    <Text size={100}>
                      {new Date(post.Created).toLocaleString("en-IN")}
                    </Text>
                  </div>
                  <LikeUnlike
                    isLiked={post.isLiked}
                    likesCount={post.LikesCount}
                    onClick={() => onClickPostLikeBtn(post.ID, post.isLiked)}
                  />
                  {post.UserID ===
                    context.pageContext.legacyPageContext?.userPuid && (
                    <MoreOptions
                      id={post.PostID}
                      dialogTitle='Delete post'
                      dialogDescription='Are you sure you want to delete this post?'
                      onClickDelete={() =>
                        handlePostDelete(post.PostID, post.ID)
                      }
                    />
                  )}
                </div>
                {post.Images.length > 0 && (
                  <div className={styles.imageContainer}>
                    {post.Images.map((image: string) => (
                      <div className={styles.previewImageWrapper}>
                        <ImagePreview preview={image} />
                      </div>
                    ))}
                  </div>
                )}
                <div
                  dangerouslySetInnerHTML={{
                    __html: post.Description,
                  }}
                ></div>
                <Divider style={{ paddingTop: "1rem" }} />
                {post.comments.map((comment: any) => (
                  <Comments
                    key={comment.id}
                    postId={post.ID}
                    comment={comment}
                    fetchPosts={fetchPosts}
                    isDarkTheme={isDarkTheme}
                  />
                ))}
                <div className={styles.newCommentContainer}>
                  <Textarea
                    className={fluentStyles.newcommentTextarea}
                    onChange={(e) =>
                      handleNewCommentChange(post.ID, e.target.value)
                    }
                    value={newComments[post.ID] || ""}
                    size='small'
                    placeholder='Add a comment'
                  />
                  <Button
                    appearance='transparent'
                    icon={<Send16Color />}
                    onClick={() => onClickNewCommentBtn(post.ID)}
                    className={fluentStyles.newCommentBtn}
                  />
                </div>
              </article>
            </Card>
          ))}
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
