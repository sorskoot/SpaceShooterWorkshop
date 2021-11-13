const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'Shooter.js',
    path: path.resolve(__dirname, 'deploy'),
  },
  plugins: [
      new CopyWebpackPlugin({
          patterns: [
              { from: 'src/static', to:'' }
          ]
      })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'deploy'),
    },
    watchFiles: ['src/**/*'],
    compress: true,
    port: 8080,
  },
};