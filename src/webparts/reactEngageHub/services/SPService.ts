import { SPFI } from "@pnp/sp"
import { getSP } from "../utils/spUtility"
import { AdvancedTextAreaType } from "../components/AdvancedTextArea"

export const addNewPost = async (
  post: AdvancedTextAreaType,
  pageContext: any
) => {
  let sp: SPFI = getSP()
  // add an item to the list
  createFolder(pageContext)

  let userInfo = await getCurrentUserDetails()

  await sp.web.lists.getByTitle("Discussion Point").items.add({
    Title: post.postTitle,
    Description: post.postDescription,
    UserID: userInfo.UserId.NameId,
    PostID: crypto.randomUUID(),
  })
}

export const getCurrentUserDetails = async () => {
  let sp: SPFI = getSP()
  return await sp.web.currentUser()
}

export const createFolder = async (pageContext: any) => {
  let sp: SPFI = getSP()

  let userInfo = await getCurrentUserDetails()

  const url = `${pageContext._site.serverRelativeUrl}/Discussion Point Gallery/${userInfo.UserId.NameId}`

  // creates a new folder for web with specified server relative url
  await sp.web.folders.addUsingPath(url)
}

export const generateRandomGUID = () => {
  return crypto.randomUUID()
}

export const ensureFolder = async (uploadPath: string) => {
  let sp: SPFI = getSP()
  const folder = await sp.web
    .getFolderByServerRelativePath(uploadPath)
    .select("Exists")()
  if (!folder.Exists) {
    await sp.web.folders.addUsingPath(uploadPath)
  }
}
