module.exports = {
  entry: './src/main.js',
  target: 'node',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.js' ]
  }
};
