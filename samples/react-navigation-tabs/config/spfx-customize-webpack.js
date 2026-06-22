'use strict';

module.exports = function (webpackConfiguration) {
  // Disable all automatic browser refresh — HMR and liveReload both cause
  // crashes/loops in the SharePoint hosted workbench. Manually refresh instead.
  if (webpackConfiguration.devServer) {
    webpackConfiguration.devServer.hot = false;
    webpackConfiguration.devServer.liveReload = false;
  }
};
