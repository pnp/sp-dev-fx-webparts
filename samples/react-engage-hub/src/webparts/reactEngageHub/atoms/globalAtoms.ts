import { atom } from "jotai"

export type Author = {
  name: string
  email: string
}

export type Comment = {
  id: string
  isLikedByUser: boolean
  likeCount: number
  text: string
  createdDate: string
  author: Author
}

type Posts = {
  AuthorMailID: string
  AuthorName: string
  Created: string
  Description: string
  ID: number
  LikesCount: number
  PostID: string
  UserID: string
  isLiked: boolean
  comments: Comment[]
  Images: string[]
}

export const postsAtom = atom<Posts[]>([])

export const isCompactViewAtom = atom(true)
