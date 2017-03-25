'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.behaviours = undefined;
exports.getDefaultPlugins = getDefaultPlugins;
exports.isValidBehaviour = isValidBehaviour;

var _cssModulesLoaderCore = require('css-modules-loader-core');

var _cssModulesLoaderCore2 = _interopRequireDefault(_cssModulesLoaderCore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var behaviours = exports.behaviours = {
  LOCAL: 'local',
  GLOBAL: 'global'
};

function getDefaultPlugins(behaviour, generateScopedName) {
  var _plugins;

  var scope = _cssModulesLoaderCore2.default.scope({ generateScopedName: generateScopedName });

  var plugins = (_plugins = {}, _defineProperty(_plugins, behaviours.LOCAL, [_cssModulesLoaderCore2.default.values, _cssModulesLoaderCore2.default.localByDefault, _cssModulesLoaderCore2.default.extractImports, scope]), _defineProperty(_plugins, behaviours.GLOBAL, [_cssModulesLoaderCore2.default.values, _cssModulesLoaderCore2.default.extractImports, scope]), _plugins);

  return plugins[behaviour];
}

function isValidBehaviour(behaviour) {
  return Object.keys(behaviours).map(function (key) {
    return behaviours[key];
  }).indexOf(behaviour) > -1;
}