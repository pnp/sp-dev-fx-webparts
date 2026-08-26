import { atom } from 'jotai';

/**
 * Tracks whether the hero auto-rotation is paused
 * (e.g. user is hovering over the webpart)
 */
export const rotationPausedAtom = atom<boolean>(false);

/**
 * Tracks the manually-selected active item index for rotation
 */
export const activeItemIndexAtom = atom<number>(0);
