const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //  1. 引入套件

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', //  2. 指定你原本的 HTML 模板
      filename: 'index.html', //  3. 打包後的檔案名稱
    }),
  ],
  devServer: {
    static: './dist', // 告訴 dev server 從哪個資料夾提供內容
    open: true, // 自動打開瀏覽器
    port: 8080, // 可自訂 port（預設是 8080）
  },

  mode: 'development',
};
