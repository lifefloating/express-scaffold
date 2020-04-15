/**
 * created by curdBoy
 */

import webpack from 'webpack'
import path from 'path'
import serverShared from './server.shared'
import TerserWebpackPlugin from 'terser-webpack-plugin'

export default Object.assign({}, serverShared, {
  devtool: 'source-map',

  resolve: {
    extensions: ['.js', '.json']
  },

  module: {
    rules: [{
      test: /\.js$/i,
      use: ['babel-loader'],
      exclude: [path.join(process.cwd(), 'tools')]
    }]
  },

  externals: [
    (context, request, callback) => {
      const isExternal =
          // the module name start with ('@' or 'a-z') character and contains 'a-z' or '/' or '.' or '-' or '0-9'
          request.match(/^[@a-z][a-z/.\-0-9]*$/i)

      callback(null, Boolean(isExternal))
    }
  ],

  plugins: [

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),

    new webpack.BannerPlugin({
      banner: 'require(\'source-map-support\').install();process.env.NODE_ENV=\'development\';',
      raw: true,
      entryOnly: true
    }),

    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    })

  ],
  // webpack4 已经不支持原来v3UglifyJsPlugin的写法 改用如下写法 -- 已经替换调
  // uglifyjs-webpack-plugin对es6兼容不好，现在替换为terser-webpack-plugin
  optimization: {
    minimizer: [
      new TerserWebpackPlugin({
        sourceMap: true,
        terserOptions: {
          ecma: 6,
          mangle: true,
          // compress参数 详情可查阅https://www.webpackjs.com/plugins/uglifyjs-webpack-plugin/#uglifyoptions
          compress: {
            sequences: true, // join consecutive statemets with the “comma operator”
            properties: true, // optimize property access: a["foo"] → a.foo
            dead_code: true, // discard unreachable code
            drop_debugger: true, // discard “debugger” statements
            drop_console: true,
            unsafe: false, // some unsafe optimizations (see below)
            conditionals: true, // optimize if-s and conditional expressions
            comparisons: true, // optimize comparisons
            evaluate: true, // evaluate constant expressions
            booleans: true, // optimize boolean expressions
            loops: true, // optimize loops
            unused: true, // drop unused variables/functions
            hoist_funs: true, // hoist function declarations
            hoist_vars: false, // hoist variable declarations
            if_return: true, // optimize if-s followed by return/continue
            join_vars: true, // join var declarations
            side_effects: true // drop side-effect-free statements
          }
        }
      })
    ]
  },
  stats: {
    colors: true,
    warnings: true
  }
})
