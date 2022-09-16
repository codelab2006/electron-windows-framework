const { merge } = require('webpack-merge');
const TsconfigPathsWebpackPlugin = require('tsconfig-paths-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const commonConfig = {
  resolve: {
    extensions: ['.ts'],
    plugins: [new TsconfigPathsWebpackPlugin()],
  },
  module: {
    rules: [{ test: /\.ts?$/, loader: 'ts-loader' }],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        files: './**/*.{tsx,ts}',
      },
    }),
  ],
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
