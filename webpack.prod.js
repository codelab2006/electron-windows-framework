/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const configs = require('./webpack.common.js');
const { merge } = require('webpack-merge');

module.exports = configs.map((config) =>
  merge(
    {
      mode: 'production',
      devtool: 'source-map',
      output: { path: path.resolve(__dirname, 'dist'), filename: '[name].js' },
    },
    config,
  ),
);
