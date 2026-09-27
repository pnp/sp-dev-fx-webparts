export interface IParsedImage { tag: string; alt?: string; }
export interface IParsedLink { tag: string; text: string; ariaLabel?: string; title?: string; }
export interface IParsedHeading { level: number; text: string; }

export interface IParsedContent {
  images: IParsedImage[];
  links: IParsedLink[];
  headings: IParsedHeading[];
  malformed: boolean;
}

export const textFromMarkup = (value: string): string => value
  .replace(/<[^>]*>/g, ' ')
  .replace(/&nbsp;/gi, ' ')
  .replace(/&amp;/gi, '&')
  .replace(/&lt;/gi, '<')
  .replace(/&gt;/gi, '>')
  .replace(/&#39;/g, "'")
  .replace(/&quot;/gi, '"')
  .replace(/\s+/g, ' ')
  .trim();

const attribute = (tag: string, name: string): string | undefined => {
  const match = new RegExp(`${name}\\s*=\\s*["']([^"']*)["']`, 'i').exec(tag);
  return match?.[1];
};

const isMalformed = (html: string): boolean => {
  if (/<[^>]*$/.test(html)) return true;
  return /<(a|h[1-6])\b[^>]*>/i.test(html) && !/<\/(a|h[1-6])\s*>/i.test(html);
};

export const parseContent = (value: unknown): IParsedContent => {
  const html = typeof value === 'string' ? value : '';
  const images: IParsedImage[] = [];
  const links: IParsedLink[] = [];
  const headings: IParsedHeading[] = [];
  let match: RegExpExecArray | null;
  const imagePattern = /<img\b[^>]*>/gi;
  while ((match = imagePattern.exec(html)) !== null) images.push({ tag: match[0], alt: attribute(match[0], 'alt') });
  const linkPattern = /<a\b[^>]*>([\s\S]*?)<\/a\s*>/gi;
  while ((match = linkPattern.exec(html)) !== null) {
    links.push({ tag: match[0], text: textFromMarkup(match[1]), ariaLabel: attribute(match[0], 'aria-label'), title: attribute(match[0], 'title') });
  }
  const headingPattern = /<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1\s*>/gi;
  while ((match = headingPattern.exec(html)) !== null) headings.push({ level: Number(match[1]), text: textFromMarkup(match[2]) });
  return { images, links, headings, malformed: isMalformed(html) };
};
