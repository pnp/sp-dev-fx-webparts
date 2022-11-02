export interface IHierarchyEntry<T extends IHierarchyEntry<T>> {
    links?: IHierarchyEntry<T>[];
}

export class navLinkBuilder {
  /**
   * Nests a new nav link within the nav links tree
   * @param currentLinks current nav links
   * @param newLink the new nav link to be added to the structure
   * @param order place order of the new link
   * @param depth sequence depth
   * @returns navLinks
   */
   public static build<T extends IHierarchyEntry<T>>(currentLinks: T[], newLink: T, order: number, depth: number): T[] {
    const lastIndex = currentLinks.length - 1;

    if (lastIndex === -1) {
      return [newLink];
    }

    const lastTopLevelLink = currentLinks[lastIndex];
    lastTopLevelLink.links = lastTopLevelLink.links || [];

    if (lastTopLevelLink.links.length === 0 || order === depth) {
      if (order !== depth || depth !== 0) {
        lastTopLevelLink.links.push(newLink);
      } else {
        currentLinks.push(newLink);
      }
    } else {
      depth++;
      currentLinks[lastIndex].links.concat(this.build(currentLinks[lastIndex].links, newLink, order, depth));
    }

    return currentLinks;
  }
}