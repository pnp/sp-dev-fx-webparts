
const LOWER: string = 'abcdefghjkmnpqrstuvwxyz';
const UPPER: string = 'ABCDEFGHJKMNPQRSTUVWXYZ';
const DIGITS: string = '23456789';
const SYMBOLS: string = '!@#$%^&*-_=+';
const ALL: string = LOWER + UPPER + DIGITS + SYMBOLS;

function randomInt(maxExclusive: number): number {
  const maxUint32: number = 0x100000000;
  const limit: number = maxUint32 - (maxUint32 % maxExclusive);
  const buffer: Uint32Array = new Uint32Array(1);
  for (;;) {
    crypto.getRandomValues(buffer);
    if (buffer[0] < limit) {
      return buffer[0] % maxExclusive;
    }
  }
}

function pick(charset: string): string {
  return charset.charAt(randomInt(charset.length));
}

export function generateTempPassword(length: number = 16): string {
  const required: string[] = [pick(LOWER), pick(UPPER), pick(DIGITS), pick(SYMBOLS)];
  const remaining: number = Math.max(length, 8) - required.length;
  const chars: string[] = [...required];
  for (let i = 0; i < remaining; i++) {
    chars.push(ALL.charAt(randomInt(ALL.length)));
  }

  for (let i = chars.length - 1; i > 0; i--) {
    const j: number = randomInt(i + 1);
    const tmp: string = chars[i];
    chars[i] = chars[j];
    chars[j] = tmp;
  }
  return chars.join('');
}