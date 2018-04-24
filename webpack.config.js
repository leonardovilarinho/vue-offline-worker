const path = require('path')

module.exports = {
  entry: ['babel-polyfill', path.resolve(__dirname, './src/index.js')],
  output: {
    filename: path.resolve(__dirname, './lib/index.js')
  }
}