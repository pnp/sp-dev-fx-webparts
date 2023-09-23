export function encode(rawString: string): string {
  return window.btoa(unescape(encodeURIComponent(rawString)));
}

export function decode(encodedString: string): string {
  try {
    return decodeURIComponent(escape(window.atob(encodedString)));
  }
  catch (e) {
    console.error(e, encodedString);
    return encodedString;
  }
}
