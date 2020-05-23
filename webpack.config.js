module.exports = {
  entry: './src/main.ts',
  target: 'node',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
          }
        }
      }
    ]
  },
  resolve: {
    extensions: [ '.js', '.ts' ]
  }
};
