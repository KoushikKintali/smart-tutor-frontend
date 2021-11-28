const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

const path = require('path')

module.exports = {
  output: {
    path: path.resolve('dist'),
    publicPath: "/",
    filename: 'index.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg|pdf)(\?[a-z0-9=.]+)?$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader : "style-loader"
          },
          {
            loader : "css-loader"
          },
          {
            loader : "less-loader",
            options: {
              lessOptions: {
                modifyVars: {
                  hack: `true; @import "${path.resolve(
                    __dirname,
                    "src/assets/styles",
                    "theme.less"
                  )}"`
                },
                javascriptEnabled: true,
              }
            }
          }
        ]
      },
    ]
  },
  node: {fs: 'empty'},
  devServer: {
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      Actions:path.resolve(__dirname, 'src/actions/'),
      Images:path.resolve(__dirname, 'src/assets/images/'),
      Config: path.resolve(__dirname, 'src/config/'),
      Styles:path.resolve(__dirname, 'src/assets/styles'),
      Constants : path.resolve(__dirname, 'src/config/constants/'),
      SCDComponents: path.resolve(__dirname, 'src/components/'),
      Utils: path.resolve(__dirname, 'src/utils/'),
      Pdfs: path.resolve(__dirname, 'src/assets/pdfs/')
    },
  },
  plugins: [htmlWebpackPlugin]
};
