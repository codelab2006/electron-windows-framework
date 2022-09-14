const path = require('path');
const { merge } = require('webpack-merge');

const commonConfig = {
  resolve: {
    extensions: ['.ts'],
    alias: {
      '@abstract': path.resolve(__dirname, 'src/abstract/'),
      '@components': path.resolve(__dirname, 'src/components/'),
    },
  },
  module: {
    rules: [{ test: /\.ts?$/, loader: 'ts-loader' }],
  },
};

const mainConfig = merge(commonConfig, {
  name: 'main',
  entry: {
    main: './src/main.ts',
  },
  target: 'electron-main',
  output: { clean: true },
});

const preloadConfig = merge(commonConfig, {
  dependencies: ['main'],
  name: 'preload',
  entry: {
    preload: './src/preload.ts',
  },
  target: 'electron-preload',
});

module.exports = [mainConfig, preloadConfig];
