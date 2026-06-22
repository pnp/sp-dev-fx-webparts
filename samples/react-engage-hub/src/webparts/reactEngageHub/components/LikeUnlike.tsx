import * as React from "react"
import { Button, Text } from "@fluentui/react-components"
import { LikeIcon } from "../constants/icons"
import styles from "../ReactEngageHub.module.scss"

interface ILikeUnlikeProps {
  isLiked: boolean
  likesCount: number
  onClick: () => void
}

export const LikeUnlike = (props: ILikeUnlikeProps) => {
  const { isLiked, likesCount, onClick } = props

  return (
    <div className={styles.likeUnlikeContainer}>
      <Button
        appearance='transparent'
        icon={
          <LikeIcon filled={isLiked} style={isLiked ? { color: "red" } : {}} />
        }
        onClick={onClick}
      />
      <Text>{likesCount === null ? 0 : Math.ceil(likesCount)}</Text>
    </div>
  )
}
