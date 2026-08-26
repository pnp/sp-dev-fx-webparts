/**
 * Webpack Patch: DevServer Configuration
 *
 * Configures development server with:
 * - CORS headers for Private Network Access (Chrome security)
 * - Disabled error overlay (SharePoint workbench compatibility)
 * - Manifest redirect middleware
 * - Logging configuration
 *
 * Migrated from fast-serve/webpack.extend.js for SPFx 1.22 Heft toolchain.
 *
 * @param {object} webpackConfig - The webpack configuration object
 * @returns {object} Modified webpack configuration
 */

module.exports = function(webpackConfig) {
  // Only apply to development builds with devServer
  if (!webpackConfig.devServer) {
    return webpackConfig;
  }

  // Add CORS headers for Private Network Access (Chrome 104+ security feature)
  // This allows the SharePoint workbench to load scripts from localhost
  webpackConfig.devServer.headers = {
    ...webpackConfig.devServer.headers,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    'Access-Control-Allow-Private-Network': 'true'
  };

  // Disable error overlay
  // SharePoint workbench has internal bugs that trigger unhandled Promise rejections
  // which are not PiCanvas issues and cause annoying full-screen error popups
  // Check console for actual compilation errors instead
  webpackConfig.devServer.client = {
    ...webpackConfig.devServer.client,
    overlay: false,  // Disable overlay entirely
    logging: 'warn', // Only show warnings and above
    reconnect: true
  };

  // Infrastructure logging level
  if (!webpackConfig.infrastructureLogging) {
    webpackConfig.infrastructureLogging = {};
  }
  webpackConfig.infrastructureLogging.level = 'warn';

  // Add middleware for manifest redirect
  // SharePoint workbench sometimes requests /temp/manifests.js
  // instead of /temp/build/manifests.js
  const existingSetupMiddlewares = webpackConfig.devServer.setupMiddlewares;
  webpackConfig.devServer.setupMiddlewares = (middlewares, devServer) => {
    // Redirect old manifest path to new path
    devServer.app.get('/temp/manifests.js', (req, res) => {
      res.redirect(301, '/temp/build/manifests.js');
    });

    // Health check endpoint
    devServer.app.get('/health', (req, res) => {
      res.json({ status: 'ok', version: '2.3.0', toolchain: 'heft' });
    });

    // Call existing middlewares if any
    if (typeof existingSetupMiddlewares === 'function') {
      return existingSetupMiddlewares(middlewares, devServer);
    }
    return middlewares;
  };

  console.log('[webpack-patch] DevServer configured: CORS, overlay disabled, manifest redirect');
  return webpackConfig;
};
