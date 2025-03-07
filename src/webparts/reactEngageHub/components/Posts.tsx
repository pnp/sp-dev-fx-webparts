import {
  Avatar,
  Button,
  Divider,
  Image,
  Text,
} from "@fluentui/react-components"
import * as React from "react"
import { useEffect } from "react"
import { getPosts, updateLikeDislike } from "../services/SPService"
import styles from "./ReactEngageHub.module.scss"
import { bundleIcon, Heart20Color, Heart20Regular } from "@fluentui/react-icons"

export interface IPostsProps {}

const ThumbLike = bundleIcon(Heart20Color, Heart20Regular)

export const Posts: React.FunctionComponent<IPostsProps> = (
  props: React.PropsWithChildren<IPostsProps>
) => {
  const [posts, setPosts] = React.useState<any[]>([])
  const [like, setLike] = React.useState<boolean>(false)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    let results = await getPosts()
    console.log(results)
    setPosts(results)
  }

  const onClickLikeBtn = async (postId: number, commentId: string) => {
    setLike(!like)
    await updateLikeDislike(postId, commentId, like)
  }

  console.log("posts", posts)
  return (
    <>
      <Text>Recent Posts</Text>
      {posts.map((post) => (
        <article key={post.ID} className={styles.article}>
          <div className={styles.imageWrapper}>
            <Text weight='semibold'>{post.Title}</Text>
            <Image
              src={`https://spl7c.sharepoint.com${
                JSON.parse(post.Image).serverRelativeUrl
              }`}
              fit='contain'
            />
          </div>
          <Text>{post.Description}</Text>
          <Divider />
          {post.comments.map((comment: any) => (
            <section>
              <div className={styles.commentArea}>
                <div className={styles.avatar}>
                  <Avatar name={comment.author.name} size={36} />
                  <div className={styles.author}>
                    <Text>{comment.author.name}</Text>
                    <Text size={100}>{comment.author.email}</Text>
                  </div>
                </div>
                <Text>{comment.text}</Text>
                <div className={styles.reactions}>
                  <Button
                    appearance='transparent'
                    icon={<ThumbLike />}
                    onClick={() => onClickLikeBtn(post.ID, comment.id)}
                  />
                </div>
              </div>
            </section>
          ))}
        </article>
      ))}
    </>
  )
}
