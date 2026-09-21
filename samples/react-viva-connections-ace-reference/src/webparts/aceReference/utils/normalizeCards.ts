import { ICard, ICardInput, ICardViewModel } from '../types/ICard';

export const MAX_CARDS = 8;
const text = (value: unknown): string => typeof value === 'string' ? value.trim() : '';

export function safeUrl(value: unknown): string | undefined {
  const raw = text(value);
  if (!raw) return undefined;
  try {
    const url = new URL(raw);
    return (url.protocol === 'https:' || url.protocol === 'http:') && !url.username && !url.password ? url.toString() : undefined;
  } catch (_) { return undefined; }
}

export function normalizeCards(input: unknown): ICard[] {
  if (!Array.isArray(input)) return [];
  const cards: ICard[] = [];
  input.some((candidate: unknown, index: number) => {
    if (cards.length >= MAX_CARDS) return true;
    if (!candidate || typeof candidate !== 'object') return false;
    const item = candidate as ICardInput;
    const title = text(item.title);
    const summary = text(item.summary);
    if (!title || !summary) return false;
    cards.push({ id: text(item.id) || `card-${index + 1}`, title, summary, category: text(item.category) || 'Reference', link: safeUrl(item.link) });
    return false;
  });
  return cards;
}

export function parseCards(value: string): ICard[] {
  try { return normalizeCards(JSON.parse(value)); } catch (_) { return []; }
}

export function toCardViewModel(card: ICard): ICardViewModel {
  return { ...card, ariaLabel: `${card.title}. ${card.category}. ${card.summary}` };
}
