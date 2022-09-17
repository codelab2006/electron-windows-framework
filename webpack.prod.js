/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const configs = require('./webpack.common.js');
const { merge } = require('webpack-merge');

module.exports = configs.map((config) =>
  merge(
    {
      mode: 'production',
      devtool: 'source-map',
    },
    config,
  ),
);
