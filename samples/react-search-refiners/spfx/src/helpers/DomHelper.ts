/**
 * Helper methods for plain JS DOM manipulations
 * https://plainjs.com/javascript/
 */
export class DomHelper {

    /**
     * Iterates over a list of DOM nodes (https://toddmotto.com/ditch-the-array-foreach-call-nodelist-hack/)
     * @param array the node list to browse
     * @param callback the callback function
     * @param scope the scope 
     */
    public static forEach(array, callback, scope?) {
        for (var i = 0; i < array.length; i++) {
            callback.call(scope, i, array[i]); 
        }
    }

    /**
     * Inserts a DOM element after an other
     * @param el the dom element to insert 
     * @param referenceNode the parent node to insert after
     */
    public static insertAfter(el, referenceNode) {
        referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
    }
}