## 0.5.2
* Updated dependencies

## 0.5.1
* Fixed sorting for composed dependencies by Josh Johnston (@joshwnj) (https://github.com/css-modules/postcss-modules/issues/38)

## 0.5.0
* Added `scopeBehaviour` option (https://github.com/css-modules/postcss-modules/issues/22)
* Added ability to pass a string to `generateScopedName` (https://github.com/css-modules/postcss-modules/issues/21)
* Updated dependencies

## 0.4.1
* Fixed processing errors capturing by Boris Serdiuk (@just-boris)

## 0.4.0
* Added support for custom loaders by Björn Brauer (@ZauberNerd)

## 0.3.0
* Fixed processing for imported CSS
* Added default callback for saving exported JSON

## 0.2.0
* Fixed JSON export with shallow imports (https://github.com/outpunk/postcss-modules/issues/12)
* Fixed lookup paths (https://github.com/outpunk/postcss-modules/issues/13)
* Fixed imports overriding (https://github.com/outpunk/postcss-modules/issues/15)
* Global refactoring under the hood

## 0.1.3
Fixed failing on comments by @dfreeman (https://github.com/outpunk/postcss-modules/pull/14)

## 0.1.2
Fixed module export for ES5 (https://github.com/outpunk/postcss-modules/issues/9)

## 0.1.1
Call getExports only for top level css

## 0.1.0
Initial version
