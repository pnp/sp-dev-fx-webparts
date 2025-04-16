import { SPFI } from "@pnp/sp"
import { getSP } from "../utils/spUtility"
import { AdvancedTextAreaType } from "../components/AdvancedTextArea"
import { Comment, Comments } from "@pnp/sp/comments"
import { SPHttpClient } from "@microsoft/sp-http"
import { COMMENTSPERPAGE, POSTSPERPAGE } from "../../constants/constants"

export const addNewPost = async (
  post: AdvancedTextAreaType,
  pageContext: any
) => {
  let sp: SPFI = getSP()

  let userInfo = await getCurrentUserDetails()

  let postUUID = crypto.randomUUID()
  let imageResult: any
  if (post.imageUrls.length > 0) {
    imageResult = await uploadImage(
      post.imageUrls,
      pageContext,
      userInfo,
      postUUID
    )
  }

  await sp.web.lists.getByTitle("Discussion Point").items.add({
    Description: post.postDescription,
    UserID: userInfo.UserId.NameId,
    PostID: postUUID,
    AuthorName: userInfo.Title,
    AuthorMailID: userInfo.UserPrincipalName,
    Images: imageResult
      ? imageResult.map((image: any) => image.serverRelativeUrl).join(",")
      : "",
  })
}

export const getCurrentUserDetails = async () => {
  let sp: SPFI = getSP()
  return await sp.web.currentUser()
}

export const createFolder = async (folderPath: any) => {
  let sp: SPFI = getSP()

  // creates a new folder for web with specified server relative url
  await sp.web.folders.addUsingPath(folderPath)
}

export const ensureFolder = async (uploadPath: string) => {
  let sp: SPFI = getSP()
  const folder = await sp.web
    .getFolderByServerRelativePath(uploadPath)
    .select("Exists")()
  if (!folder.Exists) {
    await createFolder(uploadPath)
  }
}

export const uploadImage = async (
  images: File[],
  pageContext: any,
  userInfo: any,
  postUUID: string
) => {
  let sp: SPFI = getSP()
  let results: any[] = []

  // Create base path for uploads
  let basePath = `${pageContext._site.serverRelativeUrl}/Discussion Point Gallery/${userInfo.UserId.NameId}`

  // Ensure folder exists
  await ensureFolder(basePath)

  // Process each image
  for (const image of images) {
    try {
      const fileNamePath = encodeURI(image.name)
      let result: any

      if (image.size <= 5242880) {
        // Small upload (less than 10MB)
        result = await sp.web
          .getFolderByServerRelativePath(basePath)
          .files.addUsingPath(fileNamePath, image, { Overwrite: true })
      } else {
        // Large upload (greater than 10MB)
        result = await sp.web
          .getFolderByServerRelativePath(basePath)
          .files.addChunked(fileNamePath, image, {
            progress: (data) => {
              console.log(`Upload progress: ${data}%`)
            },
            Overwrite: true,
          })
      }

      if (result) {
        // Update file metadata
        let fileInfo = await sp.web
          .getFileByServerRelativePath(result.ServerRelativeUrl)
          .getItem()

        await fileInfo.update({
          PostID: postUUID,
        })

        results.push({
          serverRelativeUrl: result.ServerRelativeUrl,
          fileName: result.Name,
        })
      }
    } catch (error) {
      console.error(`Error uploading file ${image.name}:`, error)
    }
  }

  return results
}

export const getPosts = async (context: any, nextLink?: string) => {
  const userInfo = await getCurrentUserDetails()

  const endpoint = nextLink
    ? nextLink
    : `${context.pageContext.web.absoluteUrl}/_api/web/lists/getByTitle('Discussion Point')/items?$top=${POSTSPERPAGE}&$select=*,LikedBy/Id,LikedBy/Title,LikedBy/EMail&$expand=LikedBy&$orderby=Created desc`

  const postsResponse = await context.spHttpClient.get(
    endpoint,
    SPHttpClient.configurations.v1
  )

  const postsData = await postsResponse.json()
  let results = postsData.value

  results = results.map((item: any) => ({
    ...item,
    isLiked: item.LikedBy
      ? item.LikedBy.some((user: any) => userInfo.Email === user.EMail)
      : false,
  }))

  const hasMore = postsData["@odata.nextLink"] ? true : false
  const nextLinkValue = postsData["@odata.nextLink"] || undefined

  const itemsWithComments = await Promise.all(
    results.map(async (item: any) => {
      const commentsEndpoint = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getByTitle('Discussion Point')/items(${item.ID})/GetComments()?$top=${COMMENTSPERPAGE}`

      const commentsResponse = await context.spHttpClient.get(
        commentsEndpoint,
        SPHttpClient.configurations.v1
      )

      const commentsData = await commentsResponse.json()
      const imageUrls = item.Images ? item.Images.split(",") : []

      return {
        ...item,
        comments: commentsData.value,
        Images: imageUrls,
        hasMoreComments: commentsData["@odata.nextLink"] ? true : false,
        nextLinkComments: commentsData["@odata.nextLink"] || undefined,
      }
    })
  )

  return {
    items: itemsWithComments,
    hasMore,
    nextLink: nextLinkValue,
  }
}



export const updatePostLikeDislike = async (postID: number, like: boolean) => {
  let sp: SPFI = getSP()

  const item: any = sp.web.lists
    .getByTitle("Discussion Point")
    .items.getById(postID)

  if (!like) {
    await item.like()
  } else {
    await item.unlike()
  }
}

export const updateCommentLikeDislike = async (
  postID: number,
  commentID: string,
  like: boolean
) => {
  let sp: SPFI = getSP()

  const commentInst = Comment(
    sp.web.lists
      .getByTitle("Discussion Point")
      .items.getById(postID)
      .comments.getById(commentID)
  )

  // Like or unlike the comment using the factory instance
  if (!like) {
    await commentInst.like()
  } else {
    await commentInst.unlike()
  }
}

export const addNewComment = async (postID: number, newComment: string) => {
  let sp: SPFI = getSP()

  await Comments(
    sp.web.lists.getByTitle("Discussion Point").items.getById(postID)
  ).add(newComment)
}

export const deleteComment = async (postID: number, commentID: string) => {
  let sp: SPFI = getSP()

  const commentInst = Comment(
    sp.web.lists
      .getByTitle("Discussion Point")
      .items.getById(postID)
      .comments.getById(commentID)
  )
  await commentInst.delete()
}
