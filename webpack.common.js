/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require('webpack-merge');
const TsconfigPathsWebpackPlugin = require('tsconfig-paths-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const commonConfig = {
  resolve: {
    extensions: ['.ts', '.tsx'],
    plugins: [new TsconfigPathsWebpackPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
    ],
  },
};

const rendererConfig = merge(commonConfig, {
  name: 'renderer',
  entry: {
    renderer: './src/renderer.ts',
  },
  target: 'web',
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        files: './**/*.{ts, tsx}',
      },
    }),
  ],
  output: {
    clean: true,
  },
});

const mainConfig = merge(commonConfig, {
  dependencies: ['renderer'],
  name: 'main',
  entry: {
    main: './src/main.ts',
  },
  target: 'electron-main',
});

const preloadConfig = merge(commonConfig, {
  dependencies: ['renderer'],
  name: 'preload',
  entry: {
    preload: './src/preload.ts',
  },
  target: 'electron-preload',
});

module.exports = [rendererConfig, mainConfig, preloadConfig];
