const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.devServer = function (options) {
	return {
		devServer: {
			// Enable history API fallback so HTML5 History API based routing works.
			// This is a good default that will come in handy in more complicated setups.
			historyApiFallback: true,

			// Unlike the cli flag, this doesn't set HotModuleReplacementPlugin!
			hot: true,
			inline: true,

			// Display only errors to reduce the amount of output.
			stats: 'errors-only',

			// Parse host and port from env to allow customization.
			//
			// If Vagrant or Cloud9, set
			// host: options.host || '0.0.0.0';
			//
			// 0.0.0.0 is available to all network devices
			// unlike default `localhost`.
			host: options.host, // Defaults to `localhost`
			port: options.port // Defaults to 8080
		},
		plugins: [
			new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
			// Enable multi-pass compilation for enhanced performance in larger projects. Good default.
			new webpack.HotModuleReplacementPlugin({
				multiStep: true
			})
		]
	};
};

exports.minify = function () {
	return {
		plugins: [
			new webpack.optimize.UglifyJsPlugin({
				beautify: false, // Don't beautify output (enable for neater output)
				comments: false, // Eliminate comments
				compress: {
					warnings: false,
					drop_console: false // Drop `console` statements
				},
				// Mangling specific options
				mangle: {
					except: ['$'], // Don't mangle $
					screw_ie8: true, // Don't care about IE8
					keep_fnames: true // Don't mangle function names
				}
			})
		]
	};
};

// Rewrite matching free variables
exports.setFreeVariable = function (key, value) {
	const env = {};
	env[key] = JSON.stringify(value);

	return {
		plugins: [
			new webpack.DefinePlugin(env)
		]
	};
};

exports.extractBundle = function(options) {
	const entry = {};

	entry[options.name] = options.entries;

	return {
		// Define an entry point needed for splitting.
		entry: entry,
		plugins: [
			// Extract bundle and manifest files. Manifest is needed for reliable caching.
			new webpack.optimize.CommonsChunkPlugin({
				names: [options.name, 'manifest']
			})
		]
	}
};

exports.clean = function(path) {
	return {
		plugins: [
			new CleanWebpackPlugin([path], {
				// Without `root` CleanWebpackPlugin won't point to our project and will fail to work.
				root: process.cwd()
			})
		]
	};
};

exports.styles = function (paths) {
	return ({
		module: {
			loaders: [
				{
					test: /\.s?css$/,
					loaders: [
						'style',
						'css?sourceMap',
						'resolve-url', // use for resolve relative paths (fonts path for example)
						'postcss',
						'sass?sourceMap'
					],
					include: paths
				}
			]
		}
	});
};

exports.extractCSS = function(paths) {
	return {
		module: {
			loaders: [
				// Extract CSS during build
				{
					test: /\.s?css$/,
					loader: ExtractTextPlugin.extract('style', 'css!resolve-url!postcss!sass'),
					include: paths
				}
			]
		},
		plugins: [
			// Output extracted CSS to a file
			new ExtractTextPlugin('[name].[chunkhash].css')
		]
	}
};

exports.images = function(path, mode) {
	return {
		module: {
			loaders: [
				{
					test: /\.(jpg|png|svg|ico)$/,
					loader: 'file',
					query: {
						name: mode === 'build' ? '[path][name].[hash].[ext]' : '[path][name].[ext]'
					},
					include: [
						`${path}/icons`,
						`${path}/logo`,
						`${path}/pictures`,
						`${path}/skills`,
						`${path}/sites`,
						`${path}/sites-preview`,
						`${path}/sites-preview-2x`
					]
				}
			]
		}
	}
};