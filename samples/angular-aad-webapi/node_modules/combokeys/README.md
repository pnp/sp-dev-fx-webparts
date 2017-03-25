# Combokeys [![Build Status](https://travis-ci.org/PolicyStat/combokeys.svg?branch=master)](https://travis-ci.org/PolicyStat/combokeys) [![js-standard-style](https://raw.githubusercontent.com/feross/standard/master/badge.png)](https://github.com/feross/standard)

Combokeys is a JavaScript library for handling keyboard shortcuts in the browser.

It is licensed under the Apache 2.0 license.

It is around **1.9kb** minified and gzipped and **3.5kb** minified, has no external dependencies, and has been tested in the following browsers:

- Internet Explorer 6+ (test suite works in IE9+)
- Safari
- Firefox
- Chrome

It has support for ``keypress``, ``keydown``, and ``keyup`` events on specific keys, keyboard combinations, or key sequences.

## Fork notice

This project was forked from [ccampbell/mousetrap](https://github.com/ccampbell/mousetrap).

It was forked because pull–requests were not being reviewed.

This fork's author intends to review pull–requests.

Main changes are

1. Refactored as CommonJS
2. Doesn't automatically listen on the `document`. Instead, it is now a constructor and the element on which to listen must be provided on instantiation. Multiple instances possible.

## Getting started

Get it on your page:

```js
var Combokeys;
Combokeys = require("combokeys");
```

Instantiate it for the entire page:

```js
var combokeys = new Combokeys(document.documentElement);
```

Or, instantiate it for one or more specific elements:

```js
var firstCombokeys = new Combokeys(document.getElementById("first"));
var secondCombokeys = new Combokeys(document.getElementById("second"));
```

Add some combos!

```js
// single keys
combokeys.bind('4', function() { console.log('4'); });
firstCombokeys.bind("?", function() { console.log('show shortcuts!'); });
secondCombokeys.bind('esc', function() { console.log('escape'); }, 'keyup');

// combinations
combokeys.bind('command+shift+k', function() { console.log('command shift k'); });

// map multiple combinations to the same callback
combokeys.bind(['command+k', 'ctrl+k'], function() {
    console.log('command k or control k');
    // return false to prevent default browser behavior
    // and stop event from bubbling
    return false;
});

// gmail style sequences
combokeys.bind('g i', function() { console.log('go to inbox'); });
combokeys.bind('* a', function() { console.log('select all'); });

// any character (actual character inserted—triggered by the `keypress` event)
combokeys.bind('any-character', function () { console.log('some visual feedback') });

// konami code!
combokeys.bind('up up down down left right left right b a enter', function() {
    console.log('konami code');
});
```

When you’re done with it, detach:

```js
combokeys.detach()
// and it will not listen on the element any more
```

You can also bind the plus and minus keys conveniently:

```js
combokeys.bind(['mod+plus', 'mod+minus'], function(e) {
    e.preventDefault();
    console.log("Override browser zoom!");
});
```

## Why Combokeys?

There are a number of other similar libraries out there so what makes this one different?

- CommonJS, [NPM](https://www.npmjs.org/package/combokeys).
- You can listen on multiple, specified elements simultaneously.
- You are not limited to ``keydown`` events (You can specify ``keypress``, ``keydown``, or ``keyup`` or let Combokeys choose for you).
- You can bind key events directly to special keys such as ``?`` or ``*`` without having to specify ``shift+/`` or ``shift+8`` which are not consistent across all keyboards
- It works with international keyboard layouts
- You can bind Gmail like key sequences in addition to regular keys and key combinations
- You can programatically trigger key events with the ``trigger()`` method
- It works with the numeric keypad on your keyboard
- The code is well documented/commented

### AMD usage

You can also build an AMD-compatible version by running `npm run build`. This creates a universally compatible ```dist/combokeys.js``` which, you can use via RequireJS, or include directly in a ```<script>``` tag with the global variable ```Combokeys```.

## Documentation

The most complete documentation is currently at [Mousetrap, the original project's website](http://craig.is/killing/mice). At the time of this writing, the only differences are in how you get it in your page (It is now a CommonJS module which does not define a global for itself) and that you must instantiate it before binding keys.

The public API consists of `.bind`, `.unbind`, `.trigger`, `.stopCallback`, `.detach` and `.reset`.

## Plugins

There are [some plugins](https://github.com/PolicyStat/combokeys/tree/master/plugins). See their individual readme files.

### Bind dictionary

Allows you to make multiple bindings in a single ``Combokeys.bind`` call.

### Global bind

Allows you to set global bindings that work even inside of input fields.

### Pause/unpause

Allows you to temporarily prevent Combokeys events from firing.

### Record

Allows you to capture a keyboard shortcut or sequence defined by a user.
