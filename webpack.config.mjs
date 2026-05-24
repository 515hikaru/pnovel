import path from "path";
import { fileURLToPath } from "url";
import nodeExternals from 'webpack-node-externals';

const __dirname = path.dirname(fileURLToPath(import.meta.url));


const nodeConfig = {
  entry: "./src/main.ts",
  target: "node",
  mode: "production",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    module: true,
    chunkFormat: 'module',
    environment: { module: true },
    library: { type: 'module' }
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
  optimization: {
    minimize: true,
  },
};

const browserConfig = {
  entry: "./src/editor.ts",
  target: "web",
  mode: "production",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'editor.js',
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
  optimization: {
    minimize: true,
  },
};

export default [nodeConfig, browserConfig];
