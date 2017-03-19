# Dev notes

### Testing

* Apart from the npm tests, try opening `example/index.html` in the browser.

* Also, run `mocha example/ -r index`

### Releasing new versions

```sh
# also update the reference in readme.md
  bump *.json Readme.md

# yeah
  npm test && npm publish && git release v1.0.0
```
