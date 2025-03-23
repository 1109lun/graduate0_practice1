// webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.js', // JS 進入點
  output: {
    filename: 'main.js', // 輸出 JS 檔名
    path: path.resolve(__dirname, 'dist'), // 輸出資料夾
    clean: true, // 每次 build 清除 dist
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'], // 讓 JS 可以 import CSS
      },
    ],
  },
  mode: 'development',
};
