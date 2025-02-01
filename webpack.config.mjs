import path from "path";
import { fileURLToPath } from "url";
import nodeExternals from 'webpack-node-externals';

const __dirname = path.dirname(fileURLToPath(import.meta.url));


export default {
  entry: "./src/main.ts",
  target: "node",
  mode: "production",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    module: true, // ESM出力を有効化
    chunkFormat: 'module',
    environment: { module: true }
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
          },
        }
      }
    ]
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
  experiments: { outputModule: true },
  externals: [
      nodeExternals({
        importType: 'module',
        allowlist: ['commander']
      }),
      {
        'fs': 'node:fs',
        'path': 'node:path'
      },
  ],
};
