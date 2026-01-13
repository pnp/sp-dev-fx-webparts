export interface IHierarchyEntry<T extends IHierarchyEntry<T>> {
    links?: IHierarchyEntry<T>[];
}
export declare class navLinkBuilder {
    /**
     * Nests a new nav link within the nav links tree. Modifies the current tree IN PLACE.
     * @param currentLinks current nav links
     * @param newLink the new nav link to be added to the structure
     * @param order place order of the new link
     * @returns navLinks
     */
    static build<T extends IHierarchyEntry<T>>(currentLinks: T[], newLink: T, order: number): void;
}
//# sourceMappingURL=NavLinkBuilder.d.ts.map