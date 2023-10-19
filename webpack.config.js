const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
   entry: path.join(__dirname, 'src', 'index.js'),
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: '/',
   },
   mode: 'development',
   devServer: {
      port: 3010,
      historyApiFallback: true,
   },
   module: {
      rules: [
         {
            test: /\.(js|jsx)$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            options: { presets: ["@babel/env"] },
         },
         {
           test: /\.css$/, //checks for .css files
           use: ["style-loader", "css-loader"],
         },
      ]
   },
   resolve: { extensions: [".*", ".js", ".jsx"] },
   plugins:[
      new HtmlWebpackPlugin({
         template: './public/index.html'
      })
   ]
}