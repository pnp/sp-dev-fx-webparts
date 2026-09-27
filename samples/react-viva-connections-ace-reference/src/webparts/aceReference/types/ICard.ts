export interface ICardInput { id?: unknown; title?: unknown; summary?: unknown; category?: unknown; link?: unknown; }
export interface ICard { id: string; title: string; summary: string; category: string; link?: string; }
export interface ICardViewModel extends ICard { ariaLabel: string; }
