const path = require( 'path' )
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' )
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' )
const HtmlWebpackPlugin = require( 'html-webpack-plugin' )
const TerserPlugin = require( 'terser-webpack-plugin' )
const CopyWebpackPlugin = require( 'copy-webpack-plugin' )
const Fiber = require( 'fibers' )
const VueLoaderPlugin = require( 'vue-loader/lib/plugin' )
const BundleAnalyzerPlugin = require( 'webpack-bundle-analyzer' ).BundleAnalyzerPlugin

const stats = {
	all:         true,
	colors:      true,
	children:    false,
	maxModules:  0,
	chunks:      false,
	chunkGroups: false,
	entrypoints: false,
	modules:     false,
}

module.exports = ( env = {} ) => {
	const isProd = !!env.production
	const isAnalyze = !!env.analyze
	const config = {
		stats:  isProd ? 'normal' : stats,
		entry:  './src/js/main.js',
		output: {
			filename:   isProd ? 'js/app.[contenthash].js' : 'js/app.js',
			path:       path.resolve( __dirname, 'public/assets' ),
			publicPath: '/assets/',
		},
		resolve: {
			extensions: [ '.js', '.vue' ],
			alias:      {
				'@':        path.resolve( __dirname, 'src/js' ),
				Components: path.resolve( __dirname, 'src/js/components' ),
				Helpers:    path.resolve( __dirname, 'src/js/helpers' ),
				Mixins:     path.resolve( __dirname, 'src/js/mixins' ),
				Models:     path.resolve( __dirname, 'src/js/models' ),
				Plugins:    path.resolve( __dirname, 'src/js/plugins' ),
				Views:      path.resolve( __dirname, 'src/js/views' ),
//				vue$:       'vue/dist/vue.esm.js',
			},
		},
		devtool: 'inline-source-map',
		plugins: [
			new CleanWebpackPlugin( { verbose: true } ),
			new MiniCssExtractPlugin( { filename: 'css/[name].css' } ),
			new HtmlWebpackPlugin( {
				template: 'src/html/index.html',
				filename: '../index.html',
			} ),
			new CopyWebpackPlugin( [] ),
			new VueLoaderPlugin(),
		],
		module: {
			rules: [
				{
					test: /\.(le|c)ss$/,
					use:  [
						{ loader: isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader' },
						{
							loader:  'css-loader',
							options: { importLoaders: 1 },
						},
						{ loader: 'postcss-loader' },
						{ loader: 'less-loader' },
					],
				},
				{
					test: /\.(sc|sa)ss$/,
					use:  [
						{ loader: isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader' },
						{
							loader:  'css-loader',
							options: { importLoaders: 1 },
						},
						{ loader: 'postcss-loader' },
						{ loader: 'resolve-url-loader' },
						{
							loader:  'sass-loader',
							options: {
								implementation:    require( 'sass' ),
								fibre:             Fiber,
								sourceMap:         true,
								sourceMapContents: false,
							},
						},
					],
				},
				{
					test:    /\.js$/,
					exclude: /node_modules/,
					use:     {
						loader: 'babel-loader',
					},
				},
				{
					test:   /\.vue$/,
					loader: 'vue-loader',
				},
				{
					test: /\.(png|jpg|gif)$/,
					use:  [
						{
							loader:  'url-loader',
							options: {
								fallback:   'file-loader',
								limit:      8192,
								name:       '[name].[ext]',
								outputPath: 'images',
							},
						},
					],
				},
				{
					test:    /\.svg$/,
					exclude: /fonts/,
					use:     [
						{
							loader:  'file-loader',
							options: {
								name:       '[name].[ext]',
								outputPath: 'images',
							},
						},
					],
				},
				{
					test: /fonts\/.*\.(woff|woff2|eot|ttf|otf|svg)$/,
					use:  [
						{
							loader:  'file-loader',
							options: {
								name:       '[name].[ext]',
								outputPath: 'fonts',
							},
						},
					],
				},
			],
		},

		optimization: {
			minimize:  isProd,
			minimizer: [
				new TerserPlugin( {
					parallel: 2,
					cache:    true,
				} ),
			],
		},
		devServer: {
			contentBase: path.join( __dirname, '/public' ),
		},
	}

	if ( isAnalyze ) {
		config.plugins.push( new BundleAnalyzerPlugin() )
	}

	if ( isProd ) {
		config.plugins.push( new CleanWebpackPlugin( { verbose: true } ) )
	}

	return config
}
