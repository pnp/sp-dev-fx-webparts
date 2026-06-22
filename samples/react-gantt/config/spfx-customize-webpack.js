/* eslint-disable @typescript-eslint/no-unused-vars */
const path = require("path");

/**
 * Customize webpack configuration for SPFx build.
 * Fixes:
 * 1. Missing 'swiper' module required by adaptivecards/carousel
 * 2. date-fns-tz v1.x incompatibility with date-fns v3.x exports field
 */
module.exports = function (webpackConfig, _taskSession, _heftConfiguration, webpack) {
  webpackConfig.resolve = webpackConfig.resolve || {};
  webpackConfig.resolve.alias = webpackConfig.resolve.alias || {};

  // 1. Stub out 'swiper' — optional dependency of adaptivecards/carousel
  webpackConfig.resolve.alias["swiper"] = false;

  // 2. Redirect date-fns internal paths used by date-fns-tz v1.x
  //    to the date-fns v2 copy nested under @spteck/react-controls-v2
  const dateFnsV2 = path.resolve(
    __dirname,
    "..",
    "node_modules",
    "@spteck",
    "react-controls-v2",
    "node_modules",
    "date-fns"
  );

  webpackConfig.resolve = webpackConfig.resolve || {};
  webpackConfig.resolve.alias = webpackConfig.resolve.alias || {};

  // Map the specific internal date-fns paths that date-fns-tz v1.x imports
  webpackConfig.resolve.alias["date-fns/format/index.js"] = path.join(dateFnsV2, "format", "index.js");
  webpackConfig.resolve.alias["date-fns/_lib/cloneObject/index.js"] = path.join(dateFnsV2, "_lib", "cloneObject", "index.js");
  webpackConfig.resolve.alias["date-fns/_lib/toInteger/index.js"] = path.join(dateFnsV2, "_lib", "toInteger", "index.js");
  webpackConfig.resolve.alias["date-fns/_lib/getTimezoneOffsetInMilliseconds/index.js"] = path.join(dateFnsV2, "_lib", "getTimezoneOffsetInMilliseconds", "index.js");
};
