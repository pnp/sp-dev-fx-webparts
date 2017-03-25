# Global Bind

This extension allows you to specify keyboard events that will work anywhere including inside textarea/input fields.

Usage looks like:

```javascript
var Combokeys = require('combokeys');
var combokeys = new Combokeys(document);
require('combokeys/plugins/global-bind')(combokeys);

combokeys.bindGlobal('ctrl+s', function() {
    _save();
});
```

This means that a keyboard event bound using ``Combokeys.bind`` will only work outside of form input fields, but using ``Moustrap.bindGlobal`` will work in both places.

If you wanted to create keyboard shortcuts that only work when you are inside a specific textarea you can do that too by creating your own extension.
