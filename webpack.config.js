// const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
// module.exports = {
//   target: "node",
//   resolve: {
//     //https://webpack.docschina.org/configuration/resolve/
//     fallback: {
//       // querystring: require.resolve("querystring-es3"),
//       zlib: require.resolve("browserify-zlib"),
//       path: require.resolve("path-browserify"),
//       stream: require.resolve("stream-browserify"),
//     },
//   },
//   plugins: [new NodePolyfillPlugin()],
// };

const { defineConfig } = require("@vue/cli-service");
const webpack = require("webpack");

module.exports = defineConfig({
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        Buffer: ["buffer", "Buffer"],
      }),
      new webpack.ProvidePlugin({
        process: "process/browser",
      }),
    ],
    resolve: {
      //https://webpack.docschina.org/configuration/resolve/
      fallback: {
        // querystring: require.resolve("querystring-es3"),
        zlib: require.resolve("browserify-zlib"),
        path: require.resolve("path-browserify"),
        stream: require.resolve("stream-browserify"),
      },
    },
  },
});
