// @ts-check
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/**
 * Generate loader rules for stylesheets following such logic:
 * 1. If production = true, use mini-css-extract plugin to enable code splitting
 * 2. Otherwise, compile and load using style-loader
 * @param {boolean} production Production Flag
 */
function getStyleLoaderConfig(production) {
  return [
    {
      test: /\.scss$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
        },
        {
          loader: require.resolve('./CSSTypingLoader'),
        },
        {
          loader: 'css-loader',
          options: {
            modules: {
              namedExport: true,
              localIdentName: production
                ? '[hash:base64]'
                : '[path][name]__[local]',
            },
            importLoaders: 2,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [require('autoprefixer')],
            },
          },
        },
        {
          loader: 'sass-loader',
        },
      ],
    },
    {
      test: /\.css$/i,
      oneOf: [
        {
          test: /\.vanilla\.css$/i,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: { url: false },
            },
          ],
        },
        {
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
      ],
    },
  ];
}
module.exports = getStyleLoaderConfig;
