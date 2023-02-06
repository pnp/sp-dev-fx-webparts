/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { isEmpty } from '@microsoft/sp-lodash-subset';

export const UrlUtilities = () => {
  const removeEndSlash = (url: string): string => {
    return trimEndCharacter(url, "/");
  };

  const removeBeginSlash = (url: string): string => {
    return trimBeginCharacter(url, "/");
  };

  const trimEndCharacter = (url: string, trailiingCharacter: string): string => {
    if (isEmpty(url) || isEmpty(trailiingCharacter)) {
      return url;
    }

    if (endsWith(url, trailiingCharacter)) {
      url = url.substring(0, url.length - trailiingCharacter.length);
    }

    return url;
  };

  const trimBeginCharacter = (url: string, character: string): string => {
    if (isEmpty(url) || isEmpty(character)) {
      return url;
    }

    if (beginsWith(url, character)) {
      url = url.substring(1, url.length - character.length);
    }

    return url;
  };

  const beginsWith = (value: string, search: string): boolean => {
    if (!value || !search) {
      return false;
    }
    return value.indexOf(search) === 0;
  };

  const endsWith = (value: string, search: string): boolean => {
    if (!value || !search) {
      return false;
    }
    return value.substring(value.length - search.length, value.length) === search;
  };

  const trimBeginDoubleSlash = (value: string) => {
    if (value.charAt(0) === "/" && value.charAt(1) === "/") {
      return value.substring(1, value.length);
    }
    return value;
  };

  const combine = (baseUrl: string, ...parts: string[]): string => {
    let url = baseUrl;

    if (!parts || parts.length === 0) {
      return url;
    }

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const subParts = part.split("/");
      if (subParts.length > 0) {
        for (let j = 0; j < subParts.length; j++) {
          const subPart = subParts[j];
          url = `${removeEndSlash(url)}/${removeBeginSlash(subPart)}`;
        }
      } else {
        url = `${removeEndSlash(url)}/${removeBeginSlash(part)}`;
      }
    }

    return url;
  };

  const sanitizeImageUrl = (url: string): string => {
    if (isEmpty(url)) {
      return url;
    }
    const imgElement = document.createElement("img");
    imgElement.src = url;
    return imgElement.src;
  };

  return {
    removeEndSlash,
    removeBeginSlash,
    trimEndCharacter,
    trimBeginCharacter,
    beginsWith,
    endsWith,
    trimBeginDoubleSlash,
    combine,
    sanitizeImageUrl,
  };
};
