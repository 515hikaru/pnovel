const path = require('path');

module.exports = {
  entry: "./src/main.ts",
  target: "node",
  mode: "production",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
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
    extensions: [".js", ".ts"],
  },
  externals: {
    fs: 'commonjs fs',
    path: 'commonjs path'
  }
};
