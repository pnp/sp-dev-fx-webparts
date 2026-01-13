/* eslint-disable @typescript-eslint/no-explicit-any */
var navLinkBuilder = /** @class */ (function () {
    function navLinkBuilder() {
    }
    /**
     * Nests a new nav link within the nav links tree. Modifies the current tree IN PLACE.
     * @param currentLinks current nav links
     * @param newLink the new nav link to be added to the structure
     * @param order place order of the new link
     * @returns navLinks
     */
    navLinkBuilder.build = function (currentLinks, newLink, order) {
        var lastIndex = currentLinks.length - 1;
        var startorder = currentLinks.__startorder || 0;
        if (lastIndex < 0 || order <= startorder) {
            currentLinks.__startorder = order;
            currentLinks.push(newLink);
            return;
        }
        var lastTopLevelLink = currentLinks[lastIndex];
        lastTopLevelLink.links = lastTopLevelLink.links || [];
        order--;
        this.build(lastTopLevelLink.links, newLink, order);
    };
    return navLinkBuilder;
}());
export { navLinkBuilder };
//# sourceMappingURL=NavLinkBuilder.js.map