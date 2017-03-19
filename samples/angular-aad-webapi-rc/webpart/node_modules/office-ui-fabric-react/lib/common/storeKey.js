"use strict";
var Utilities_1 = require('../Utilities');
/**
 * Store keys are a very simple abstraction that maps a string name to an interface type.
 * The enables a type-safe contract for store dependencies when you connect dumb components
 * to stores.
 *
 * @example
 * let selectionKey = storeKey<ISelection>('selection');
 *
 * let stores = new StoreSet()
 *   .add(selectionKey, new Selection());
 *
 * <StoreHost stores={ stores }>
 *   ...
 * </StoreHost>
 *
 * connect(DumbComponent, [ selectionKey ], (props, selection) => ({
 *   isSelected: selection.getSelected(props.item.key)
 * });
 *
 * Note that the "selection" reference in the connect callback would be of type ISelection due
 * to the selectionKey reference, and you will get TypeScript errors by referring to selection
 * member that aren't in that interface.
 */
exports.storeKey = function (name) { return ({ name: name, id: Utilities_1.getId(name) }); };

//# sourceMappingURL=storeKey.js.map
