import { SPComponentLoader } from "@microsoft/sp-loader";

// get all the web's regional settings

const DEFAULT_PERSONA_IMG_HASH = "7ad602295f8386b7615b582d87bcc294";
const DEFAULT_IMAGE_PLACEHOLDER_HASH = "4a48f26592f4e1498d7a478a4c48609c";
const MD5_MODULE_ID = "8494e7d7-6b99-47b2-a741-59873e42f16f";
const PROFILE_IMAGE_URL = "/_layouts/15/userphoto.aspx?size=M&accountname=";

/**
 * Gets user photo
 * @param userId
 * @returns user photo
 */
export const getUserPhoto = async (userId: string): Promise<string> => {


  const personaImgUrl = PROFILE_IMAGE_URL + userId;

  // tslint:disable-next-line: no-use-before-declare
  const url: string = await getImageBase64(personaImgUrl);

  const newHash = await getMd5HashForUrl(url);

  if (
    newHash !== DEFAULT_PERSONA_IMG_HASH &&
    newHash !== DEFAULT_IMAGE_PLACEHOLDER_HASH
  ) {
    return "data:image/png;base64," + url;
  } else {
    return "undefined";
  }
};

/**
 * Get MD5Hash for the image url to verify whether user has default image or custom image
 * @param url
 */
export const getMd5HashForUrl = async (url: string): Promise<string> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const library : any = await loadSPComponentById(MD5_MODULE_ID) ;
  try {
    const md5Hash = library.Md5Hash;
    if (md5Hash) {
      const convertedHash = md5Hash(url);
      return convertedHash;
    }
  } catch (error) {
    return url;
  }
};

/**
 * Load SPFx component by id, SPComponentLoader is used to load the SPFx components
 * @param componentId - componentId, guid of the component library
 */
export const loadSPComponentById = async (
  componentId: string
): Promise<unknown> => {
  const  component: unknown =   SPComponentLoader.loadComponentById(componentId)
  return component;
};
/**
 * Gets image base64
 * @param pictureUrl
 * @returns image base64
 */
export const getImageBase64 = async (pictureUrl: string): Promise<string> => {
  console.log(pictureUrl);
  return new Promise((resolve) => {
    const image = new Image();
    image.addEventListener("load", () => {
      const tempCanvas = document.createElement("canvas");
      (tempCanvas.width = image.width),
        (tempCanvas.height = image.height),
        tempCanvas.getContext("2d").drawImage(image, 0, 0);
      let base64Str;
      try {
        base64Str = tempCanvas.toDataURL("image/png");
      } catch (e) {
        return "";
      }
      base64Str = base64Str.replace(/^data:image\/png;base64,/, "");
      resolve(base64Str);
    });
    image.src = pictureUrl;
  });
};
