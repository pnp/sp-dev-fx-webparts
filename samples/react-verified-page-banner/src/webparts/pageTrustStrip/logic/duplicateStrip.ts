import { productName } from "./productName";

const orderByPage: Map<string, string[]> = new Map();
const listeners: Set<() => void> = new Set();
let notifyScheduled: boolean = false;

export const duplicateStripMessage: string = `There's already a ${productName} on this page. One is enough.`;

export function stripRegistryKey(pageListId: string | undefined, pageItemId: number | undefined): string {
  if (pageListId && pageItemId !== undefined) {
    return `${pageListId}:${pageItemId}`;
  }
  return "page-trust:no-page";
}

export function registerStripInstance(pageKey: string, instanceId: string): boolean {
  const current = orderByPage.get(pageKey);
  const order = current ? current.slice() : [];
  if (order.indexOf(instanceId) < 0) {
    order.push(instanceId);
    orderByPage.set(pageKey, order);
    notifyStripRegistry();
  }
  return order[0] !== instanceId;
}

export function unregisterStripInstance(pageKey: string, instanceId: string): void {
  const current = orderByPage.get(pageKey);
  if (!current) {
    return;
  }
  const next: string[] = [];
  for (let index = 0; index < current.length; index++) {
    if (current[index] !== instanceId) {
      next.push(current[index]);
    }
  }
  if (next.length === current.length) {
    return;
  }
  if (next.length === 0) {
    orderByPage.delete(pageKey);
  } else {
    orderByPage.set(pageKey, next);
  }
  notifyStripRegistry();
}

export function isExtraStrip(pageKey: string, instanceId: string): boolean {
  const order = orderByPage.get(pageKey);
  if (!order || order.length === 0) {
    return false;
  }
  return order[0] !== instanceId;
}

export function duplicateNoteForInstance(isEditMode: boolean, isExtra: boolean): string | undefined {
  if (isEditMode && isExtra) {
    return duplicateStripMessage;
  }
  return undefined;
}

export function subscribeStripRegistry(listener: () => void): () => void {
  listeners.add(listener);
  return (): void => {
    listeners.delete(listener);
  };
}

export function resetStripRegistry(): void {
  orderByPage.clear();
  listeners.clear();
  notifyScheduled = false;
}

function notifyStripRegistry(): void {
  if (listeners.size === 0 || notifyScheduled) {
    return;
  }
  notifyScheduled = true;
  Promise.resolve().then(() => {
    notifyScheduled = false;
    const current: Array<() => void> = [];
    listeners.forEach((listener) => {
      current.push(listener);
    });
    for (let index = 0; index < current.length; index++) {
      current[index]();
    }
  }).catch(() => {
    notifyScheduled = false;
  });
}
