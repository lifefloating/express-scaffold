/**
 * created by curdBoy
 */

import webpack from 'webpack'
import path from 'path'
import serverSharedConfig from './server.shared'

export default Object.assign({}, serverSharedConfig, {
  devtool: 'source-map',

  resolve: {
    extensions: ['.js', '.json'],
    unsafeCache: true
  },

  module: {
    noParse: function(content) {
      return /lodash/.test(content)
    },
    unsafeCache: true,
    rules: [{
      test: /\.(js)$/,
      use: [{
        loader: 'babel-loader',
        options: {
          cacheDirectory: './.cache/babel-loader',
          compact: false
        }
      }],
      include: [path.join(process.cwd(), 'src')]
    }]
  },

  externals: [
    (context, request, callback) => {
      const isExternal =
        request.match(/^[@a-z][a-z/.\-0-9]*$/i)

      callback(null, Boolean(isExternal))
    }
  ],

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),

    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install()',
      raw: true,
      entryOnly: false
    }),

    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    })
  ],

  // stats: 'minimal'
  stats: {
    colors: true,
    warnings: true
  }
})
