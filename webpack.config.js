let HtmlWebpackPlugin = require('html-webpack-plugin');
let path = require("path");
let ExtractTextPlugin = require('extract-text-webpack-plugin');
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
    publicPath: "dist/"
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
        test: /\.(png|jpe?g)$/,
        loaders: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'img/'
            }
          },

          'img-loader'
        ]
      },
      {
        test: /\.s[ac]ss$/,
        use: ExtractTextPlugin.extract({
            use: ['css-loader', 'sass-loader'],
            fallback: 'style-loader'
          })
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader'
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin('./css/main.css'),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html'
  }),
  ]
};
module.exports = (env, options) => {
  let production = options.mode === "production;";
  conf.devtool = production ? "source-map" : "eval-sourcemap";
  return conf;
};
