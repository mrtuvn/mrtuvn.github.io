const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const validate = require('webpack-validator');
const autoprefixer = require('autoprefixer');
const config = require('./config').config;
const configWebpack = require('./config/webpack');

var settings;

const PATH = {
   app: path.join(__dirname, 'app'),
   build: path.join(__dirname, 'build'),
   config: path.join(__dirname, 'config'),
   node: path.join(__dirname, 'node_modules')
};

const commonSettings = {
   entry: {
      app: ['babel-polyfill', PATH.app]
   },
   output: {
      path: PATH.build,
      sourceMapFilename: '[file].map', // Can be [file], [id], and [hash] replacements here.
      devtoolModuleFilenameTemplate: 'webpack:///[resource-path]?[loaders]',
      filename: '[name].js'
   },
   module: {
      loaders: [
         {
            test: /\.js?.$/,
            include: [PATH.app, PATH.config],
            loaders: [
               'react-hot',
               'babel?cacheDirectory=./babel-cache'
            ]
         },
         {
            test: /\.pug/,
            loaders: ['pug']
         }
      ]
   },
   resolve: {
      extensions: ['', '.js', '.jsx']
   },
   plugins: [
      new HtmlWebpackPlugin({
         inject: true,
         template: '!!pug!' + PATH.app + '/index.pug'
      })
   ],
   postcss: function () {
      return [autoprefixer({
         browsers: ['last 2 versions']
      })];
   }
};

switch (process.env.npm_lifecycle_event) {
   case 'build':
      settings = merge(
         commonSettings,
         {
            // devtool: 'source-map',
            output: {
               path: PATH.build,
               filename: '[name].[chunkhash].js',
               // This is used for require.ensure. The setup will work without but this is useful to set.
               chunkFilename: '[chunkhash].js'
            },
            module:
            {
               loaders: [
                  {
                     test: /\.(woff?.$)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                     loader: 'url',
                     query: {
                        limit: 1, // do not inline fonts into css
                        name: 'app/fonts/[name].[hash].[ext]',
                        mimetype: 'application/font-woff'
                     }
                  },
                  {
                     test: /\.json/,
                     loader: 'file',
                     include: `${PATH.app}/data`,
                     query: {
                        name: 'app/data/[name].[hash].[ext]'
                     }
                  }
               ]
            }
         },
         configWebpack.clean(PATH.build),
         configWebpack.setFreeVariable(
            'process.env.NODE_ENV',
            'production'
         ),
         configWebpack.extractBundle({
            name: 'vendor',
            entries: [
               'babel-polyfill',
               'whatwg-fetch',
               'react',
               'react-dom',
               'local-storage-parser',
               'fontfaceobserver'
            ]
         }),
         configWebpack.minify(),
         configWebpack.extractCSS([PATH.app, PATH.node]),
         configWebpack.images(`${PATH.app}/img`, 'build')
      );
      break;
   default:
      settings = merge(
         commonSettings,
         // {devtool: 'eval-source-map'},
         {
            module: {
               loaders: [
                  {
                     test: /\.woff?.$/,
                     loader: 'url?limit=500000'
                  },
                  {
                     test: /\.json$/,
                     loader: 'file',
                     include: `${PATH.app}/data`
                  }
               ]
            }
         },
         configWebpack.styles([PATH.app, PATH.node]),
         configWebpack.images(`${PATH.app}/img`, 'default'),
         configWebpack.devServer({
            host: process.env.HOST,
            port: config.port // could be process.env.PORT if no conflicts
         })
      );
}

module.exports = validate(settings, {
   quiet: true
});
