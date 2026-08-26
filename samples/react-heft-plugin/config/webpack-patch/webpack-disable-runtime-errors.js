/* eslint-disable no-undef */
module.exports = function(webpackConfig) {   
  
  console.log('Webpack config before modification:', webpackConfig?.devServer?.client);
  if (webpackConfig?.devServer?.client !== undefined) {
    webpackConfig.devServer.client.overlay = false; 
    // OR:
    webpackConfig.devServer.client.overlay = { runtimeErrors: false };
    console.log('Webpack config after modification:', webpackConfig.devServer.client);
  }
  return webpackConfig;
};