# Pause/unpause

This extension allows Combokeys to be paused and unpaused without having to reset keyboard shortcuts and rebind them.

Usage looks like:

```javascript
var Combokeys = require('combokeys')
var combokeys = new Combokeys(document);
require('combokeys/plugins/pause')(combokeys);

// stop Combokeys events from firing
combokeys.pause();

// allow Combokeys events to fire again
combokeys.unpause();
```
