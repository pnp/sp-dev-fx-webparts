import * as strings from 'PropertyPaneFilePickerStrings';

/**
   * Formats a file size in the right unit
   * TODO: Move to a common library
   */
  export function FormatBytes(bytes, decimals) {
    if (bytes == 0) {
      return strings.EmptyFileSize;
    }

    const k: number = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + strings.SizeUnit[i];
  }

    /**
   * Gets the current domain url
   */
  export function GetAbsoluteDomainUrl(url: string): string  {
    if (url !== undefined) {
      const myURL = new URL(url.toLowerCase());
      return myURL.protocol + "//" + myURL.host;
    } else {
      return undefined;
    }
  }
