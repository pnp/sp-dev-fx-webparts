import { SPComponentLoader } from "@microsoft/sp-loader";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/regional-settings/web";
import { IRegionalSettingsInfo } from "@pnp/sp/regional-settings";

// get all the web's regional settings

const DEFAULT_PERSONA_IMG_HASH: string = "7ad602295f8386b7615b582d87bcc294";
const DEFAULT_IMAGE_PLACEHOLDER_HASH: string = "4a48f26592f4e1498d7a478a4c48609c";
const MD5_MODULE_ID: string = "8494e7d7-6b99-47b2-a741-59873e42f16f";
const PROFILE_IMAGE_URL: string = "/_layouts/15/userphoto.aspx?size=M&accountname=";

/**
 * Gets user photo
 * @param userId
 * @returns user photo
 */
export const getUserPhoto = async (userId): Promise<string> => {
  const personaImgUrl = PROFILE_IMAGE_URL + userId;
  console.log(personaImgUrl);
  // tslint:disable-next-line: no-use-before-declare
  const url: string = await getImageBase64(personaImgUrl);
  // tslint:disable-next-line: no-use-before-declare
  const newHash = await getMd5HashForUrl(url);

  if (newHash !== DEFAULT_PERSONA_IMG_HASH && newHash !== DEFAULT_IMAGE_PLACEHOLDER_HASH) {
    return "data:image/png;base64," + url;
  } else {
    return "undefined";
  }
};

/**
 * Get MD5Hash for the image url to verify whether user has default image or custom image
 * @param url
 */
export const getMd5HashForUrl = async (url: string) => {
  return new Promise(async (resolve, reject) => {
    // tslint:disable-next-line: no-use-before-declare
    const library: any = await loadSPComponentById(MD5_MODULE_ID);
    try {
      const md5Hash = library.Md5Hash;
      if (md5Hash) {
        const convertedHash = md5Hash(url);
        resolve(convertedHash);
      }
    } catch (error) {
      resolve(url);
    }
  });
};

/**
 * Load SPFx component by id, SPComponentLoader is used to load the SPFx components
 * @param componentId - componentId, guid of the component library
 */
export const loadSPComponentById = async (componentId: string) => {
  return new Promise((resolve, reject) => {
    SPComponentLoader.loadComponentById(componentId)
      .then((component: any) => {
        resolve(component);
      })
      .catch((error) => {});
  });
};
/**
 * Gets image base64
 * @param pictureUrl
 * @returns image base64
 */
export const getImageBase64 = async (pictureUrl: string): Promise<string> => {
  console.log(pictureUrl);
  return new Promise((resolve, reject) => {
    let image = new Image();
    image.addEventListener("load", () => {
      let tempCanvas = document.createElement("canvas");
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

export const zeroPad = (num, places) => {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
};

export const getSiteRegionalSettings = async (): Promise<IRegionalSettingsInfo> => {
  try {
    const s = await sp.web.regionalSettings();
    return s;
  } catch (error) {
    console.error(error);
    Promise.reject(error);
  }
};

export const convertTimeTo12H = (
  _hour: number
): Promise<{ hourInTimeFormat: string; current12HTimeFormat: string }> => {
  console.log("prm", _hour);
  return new Promise((resolve, rejected) => {
    let hourInTimeFormat: string = "";
    let current12HTimeFormat: string = "AM";
    if (_hour >= 0 && _hour <= 11) {
      if (_hour === 0) {
        hourInTimeFormat = "12";
      } else {
        hourInTimeFormat = _hour.toString();
      }
      current12HTimeFormat = "AM";
    } else {
      const _hour12h = _hour - 12;
      hourInTimeFormat = _hour12h === 0 ? "12" : _hour12h.toString();
      current12HTimeFormat = "PM";
    }
    resolve({ hourInTimeFormat, current12HTimeFormat });
  });
};

export const convertTimeTo24h = (hour: number, current12HTimeFormat: string): Promise<string> => {
  return new Promise((resolve, rejected) => {
    let hourInTimeFormat: string = "";
    if (current12HTimeFormat === "PM") {
      if (hour >= 1 && hour <= 11) {
        if (hour === 12) {
          hourInTimeFormat = "12";
        }
        const _hour24h = hour + 12;
        hourInTimeFormat = _hour24h.toString();
      }
    } else {
      if (hour === 12) {
        hourInTimeFormat = "00";
      } else {
        hourInTimeFormat = hour.toString();
      }
    }
    resolve(hourInTimeFormat);
  });
};

/* Check if string is valid date */
export const checkIfValidDate = (str:string):boolean => {
  // Regular expression to check if string is valid date
  const regexExp = /(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})/gi;

  return regexExp.test(str);
};
