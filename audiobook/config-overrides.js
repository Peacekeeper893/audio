const { override, addWebpackPlugin } = require('customize-cra');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = override(
  addWebpackPlugin(
    new Webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1, // This will create a single output file
    })
  ),
  (config) => {
    // Customize JavaScript filenames
    config.output.filename = 'static/js/novelsounds.build.js';
    config.output.chunkFilename = 'static/js/novelsounds.build.chunk.js';

    // Customize CSS filenames
    const miniCssExtractPlugin = config.plugins.find(
      plugin => plugin.constructor.name === 'MiniCssExtractPlugin'
    );
    if (miniCssExtractPlugin) {
      miniCssExtractPlugin.options.filename = 'static/css/novelsounds.build.css';
      miniCssExtractPlugin.options.chunkFilename = 'static/css/novelsounds.build.chunk.css';
    }



    return config;
  }
);