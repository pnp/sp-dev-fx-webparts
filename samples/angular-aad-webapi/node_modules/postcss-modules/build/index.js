'use strict';

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _parser = require('css-modules-loader-core/lib/parser');

var _parser2 = _interopRequireDefault(_parser);

var _fileSystemLoader = require('css-modules-loader-core/lib/file-system-loader');

var _fileSystemLoader2 = _interopRequireDefault(_fileSystemLoader);

var _genericNames = require('generic-names');

var _genericNames2 = _interopRequireDefault(_genericNames);

var _generateScopedName = require('./generateScopedName');

var _generateScopedName2 = _interopRequireDefault(_generateScopedName);

var _saveJSON = require('./saveJSON');

var _saveJSON2 = _interopRequireDefault(_saveJSON);

var _behaviours = require('./behaviours');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var PLUGIN_NAME = 'postcss-modules';

function getDefaultScopeBehaviour(opts) {
  if (opts.scopeBehaviour && (0, _behaviours.isValidBehaviour)(opts.scopeBehaviour)) {
    return opts.scopeBehaviour;
  }

  return _behaviours.behaviours.LOCAL;
}

function getScopedNameGenerator(opts) {
  var scopedNameGenerator = opts.generateScopedName || _generateScopedName2.default;

  if (typeof scopedNameGenerator === 'function') return scopedNameGenerator;
  return (0, _genericNames2.default)(scopedNameGenerator, { context: process.cwd() });
}

function getLoader(opts, plugins) {
  var root = opts.root || '/';
  return typeof opts.Loader === 'function' ? new opts.Loader(root, plugins) : new _fileSystemLoader2.default(root, plugins);
}

function isGlobalModule(globalModules, inputFile) {
  return globalModules.some(function (regex) {
    return inputFile.match(regex);
  });
}

function getDefaultPluginsList(opts, inputFile) {
  var globalModulesList = opts.globalModulePaths || null;
  var defaultBehaviour = getDefaultScopeBehaviour(opts);
  var generateName = getScopedNameGenerator(opts);

  if (globalModulesList && isGlobalModule(globalModulesList, inputFile)) {
    return (0, _behaviours.getDefaultPlugins)(_behaviours.behaviours.GLOBAL, generateName);
  }

  return (0, _behaviours.getDefaultPlugins)(defaultBehaviour, generateName);
}

function isResultPlugin(plugin) {
  return plugin.postcssPlugin !== PLUGIN_NAME;
}

module.exports = _postcss2.default.plugin(PLUGIN_NAME, function () {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var getJSON = opts.getJSON || _saveJSON2.default;

  return function (css, result) {
    var inputFile = css.source.input.file;
    var resultPlugins = result.processor.plugins.filter(isResultPlugin);
    var pluginList = getDefaultPluginsList(opts, inputFile);
    var plugins = [].concat(_toConsumableArray(pluginList), _toConsumableArray(resultPlugins));
    var loader = getLoader(opts, plugins);
    var parser = new _parser2.default(loader.fetch.bind(loader));

    return new Promise(function (resolve, reject) {
      (0, _postcss2.default)([].concat(_toConsumableArray(plugins), [parser.plugin])).process(css, { from: inputFile }).then(function () {
        var out = loader.finalSource;
        if (out) css.prepend(out);

        getJSON(css.source.input.file, parser.exportTokens);

        resolve();
      }, reject);
    });
  };
});