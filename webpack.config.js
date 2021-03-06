let HtmlWebpackPlugin = require('html-webpack-plugin');
let path = require("path");
let ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


let conf = {
  entry: {
    app: [
      "./src/js/index.js",
      './src/scss/blocks/main.scss',
    ]
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "main.js",
    publicPath: ""
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: "/node_models/"
      },
      {
        test: /\.(jpg|png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\main.s[ac]ss$/,
        use: ExtractTextPlugin.extract({
            use: ['css-loader', 'sass-loader'],
            fallback: 'style-loader'
          })
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
        exclude: "/node_modules/"
      }
    ]
  },
  plugins: [
      new ExtractTextPlugin('./css/main.css'),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/index.html'
      }),
      new CopyWebpackPlugin([
        { from: 'src/images', to: 'images' },
        { from: 'src/fonts', to: 'fonts'}
      ]),
      // new BundleAnalyzerPlugin()
  ],
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    port: 8080,
    historyApiFallback: true
  }
};
module.exports = (env, options) => {
  let production = options.mode === "production;";
  conf.devtool = production ? "source-map" : "eval-sourcemap";
  return conf;
};
