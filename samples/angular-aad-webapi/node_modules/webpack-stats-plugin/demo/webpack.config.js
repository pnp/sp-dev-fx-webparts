/**
 * Webpack configuration
 */
var path = require("path");
var StatsWriterPlugin = require("../index").StatsWriterPlugin;

module.exports = {
  cache: true,
  context: __dirname,
  entry: "./main.js",
  output: {
    path: path.join(__dirname, "build"),
    filename: "[hash].main.js"
  },
  plugins: [
    // Try various defaults and options.
    new StatsWriterPlugin(),
    new StatsWriterPlugin({}),
    new StatsWriterPlugin({
      filename: "stats-transform.json",
      fields: null,
      transform: function (data) {
        return JSON.stringify(data.assetsByChunkName, null, 2);
      }
    }),
    new StatsWriterPlugin({
      filename: "stats-transform.md",
      fields: null,
      transform: function (data) {
        var assetsByChunkName = data.assetsByChunkName;
        return Object.keys(assetsByChunkName).reduce(function (acc, key) {
          return acc += key + " | " + assetsByChunkName[key] + "\n";
        }, "Name | Asset\n:--- | :----\n");
      }
    }),
    new StatsWriterPlugin({
      filename: "stats-transform-custom-obj.json",
      transform: function (data) {
        return JSON.stringify({
          main: data.assetsByChunkName.main
        }, null, 2);
      }
    }),
    new StatsWriterPlugin({
      filename: "stats-custom.json"
    }),
    // Relative paths work, but absolute paths do not currently.
    new StatsWriterPlugin({
      filename: "../build2/stats-custom2.json"
    })
  ]
};
