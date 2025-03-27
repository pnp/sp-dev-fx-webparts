import { SPFI } from "@pnp/sp"
import { getSP } from "../utils/spUtility"
import { AdvancedTextAreaType } from "../components/AdvancedTextArea"
import { IComments, Comment, Comments } from "@pnp/sp/comments"

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

      if (image.size <= 10485760) {
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

export const getPosts = async () => {
  let sp: SPFI = getSP()

  let results = await sp.web.lists
    .getByTitle("Discussion Point")
    .items.orderBy("Created", false)()

  const itemsWithComments = await Promise.all(
    results.map(async (item: any) => {
      const comments: IComments = await sp.web.lists
        .getByTitle("Discussion Point")
        .items.getById(item.ID)
        .comments()

      // Convert comma-separated image URLs to array
      const imageUrls = item.Images ? item.Images.split(",") : []

      return {
        ...item,
        comments,
        Images: imageUrls,
      }
    })
  )

  return itemsWithComments
}

export const updateLikeDislike = async (
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
  if (like) {
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
