/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const TsconfigPathsWebpackPlugin = require('tsconfig-paths-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
  output: {
    clean: true,
  },
};

const mainName = 'main';
const preloadName = 'preload';
const rendererName = 'renderer';

const mainConfig = (outputPath) =>
  merge(commonConfig, {
    name: mainName,
    entry: {
      main: `./src/${mainName}.ts`,
    },
    target: 'electron-main',
    output: { path: path.resolve(__dirname, outputPath), filename: '[name].js' },
    plugins: [
      new ForkTsCheckerWebpackPlugin({
        eslint: {
          files: './**/*.{ts,tsx}',
        },
      }),
    ],
  });

const preloadConfig = (outputPath) =>
  merge(commonConfig, {
    dependencies: [mainName],
    name: preloadName,
    entry: {
      preload: `./src/${preloadName}.ts`,
    },
    target: 'electron-preload',
    output: { path: path.resolve(__dirname, outputPath, preloadName), filename: '[name].js' },
  });

const rendererConfig = (outputPath) =>
  merge(commonConfig, {
    dependencies: [mainName, preloadName],
    name: rendererName,
    entry: {
      renderer: `./src/${rendererName}.ts`,
    },
    target: ['web', 'electron-renderer'],
    output: { path: path.resolve(__dirname, outputPath, rendererName), filename: '[name].js' },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/html/renderer.html',
        filename: 'renderer.html',
      }),
    ],
  });

module.exports = [mainConfig, preloadConfig, rendererConfig];
