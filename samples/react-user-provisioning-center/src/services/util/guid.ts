export function newGuid(): string {
  const cryptoObj: Crypto = crypto;
  if (typeof cryptoObj.randomUUID === 'function') {
    return cryptoObj.randomUUID();
  }
  const bytes: Uint8Array = new Uint8Array(16);
  cryptoObj.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex: string[] = [];
  for (let i = 0; i < 16; i++) {
    const byteHex: string = bytes[i].toString(16);
    hex.push(byteHex.length === 1 ? `0${byteHex}` : byteHex);
  }
  return (
    hex.slice(0, 4).join('') +
    '-' +
    hex.slice(4, 6).join('') +
    '-' +
    hex.slice(6, 8).join('') +
    '-' +
    hex.slice(8, 10).join('') +
    '-' +
    hex.slice(10, 16).join('')
  );
}
