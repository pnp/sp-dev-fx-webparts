import { SPFI } from "@pnp/sp"
import { getSP } from "../utils/spUtility"
import { AdvancedTextAreaType } from "../components/AdvancedTextArea"

export const addNewPost = async (
  post: AdvancedTextAreaType,
  pageContext: any
) => {
  let sp: SPFI = getSP()

  let userInfo = await getCurrentUserDetails()

  let postUUID = crypto.randomUUID()

  let imageResult: any
  if (post.imageUrl) {
    imageResult = await uploadImage(
      post.imageUrl,
      pageContext,
      userInfo,
      postUUID
    )
  }

  let image = {
    serverRelativeUrl: imageResult.ServerRelativeUrl,
    fileName: imageResult.Name,
  }

  await sp.web.lists.getByTitle("Discussion Point").items.add({
    Title: post.postTitle,
    Description: post.postDescription,
    UserID: userInfo.UserId.NameId,
    PostID: postUUID,
    Image: JSON.stringify(image),
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
  image: File,
  pageContext: any,
  userInfo: any,
  postUUID: string
) => {
  let sp: SPFI = getSP()

  const fileNamePath = encodeURI(image.name)

  let path = `${pageContext._site.serverRelativeUrl}/Discussion Point Gallery/${userInfo.UserId.NameId}`

  let result: any

  if (image.size <= 10485760) {
    // small upload
    result = await sp.web
      .getFolderByServerRelativePath(path)
      .files.addUsingPath(fileNamePath, image, { Overwrite: true })

    if (result) {
      let fileInfo = await sp.web
        .getFileByServerRelativePath(result.ServerRelativeUrl)
        .getItem()

      await fileInfo.update({
        PostID: postUUID,
      })
    }
  } else {
    // large upload
    result = await sp.web
      .getFolderByServerRelativePath(path)
      .files.addChunked(fileNamePath, image, {
        progress: (data) => {
          console.log(`progress`)
        },
        Overwrite: true,
      })

    if (result) {
      let fileInfo = await sp.web
        .getFileByServerRelativePath(result.ServerRelativeUrl)
        .getItem()

      await fileInfo.update({
        PostID: postUUID,
      })
    }
  }
  return result
}