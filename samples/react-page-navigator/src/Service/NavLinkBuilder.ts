/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IHierarchyEntry<T extends IHierarchyEntry<T>> {
  links?: IHierarchyEntry<T>[];
}

export class navLinkBuilder {
/**
 * Nests a new nav link within the nav links tree. Modifies the current tree IN PLACE.
 * @param currentLinks current nav links
 * @param newLink the new nav link to be added to the structure
 * @param order place order of the new link
 * @returns navLinks
 */
 public static build<T extends IHierarchyEntry<T>>(currentLinks: T[], newLink: T, order: number): void {
  const lastIndex = currentLinks.length - 1;
  const startorder:number = (currentLinks as any).__startorder || 0;

  if (lastIndex < 0 || order <= startorder) {
    (currentLinks as any).__startorder = order;
    currentLinks.push(newLink);
    return;
  }

  const lastTopLevelLink = currentLinks[lastIndex];
  lastTopLevelLink.links = lastTopLevelLink.links || [];

  order--;
  this.build(lastTopLevelLink.links, newLink, order);
}
}