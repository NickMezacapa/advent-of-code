const path = require('path');

const config = {
  entry: './main.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js'
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' },
      { test: /\.tsx?$/, loader: 'ts-loader' },
    ]
  }
};

module.exports = config;