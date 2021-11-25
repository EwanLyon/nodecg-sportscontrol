const path = require('path');
const globby = require('globby');
const WebpackBar = require('webpackbar');
const { merge } = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const keysTransformer = require('ts-transformer-keys/transformer').default;
const ReactRefreshTypeScript = require('react-refresh-typescript');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack');

const isProduction = process.env['NODE_ENV'] === 'production';
const isWatch = Boolean(process.env['WEBPACK_WATCH']);

const base = {
	watch: isWatch,
	mode: isProduction ? 'production' : 'development',
	devtool: 'cheap-source-map',
	resolve: {
		extensions: ['.js', '.ts', '.tsx', '.json'],
	},
};

const browser = (folderName) => {
	const entry = {};
	const files = globby.sync(`./src/${folderName}/*.tsx`);
	files.forEach((file) => {
		entry[path.basename(file, '.tsx')] = file;
	});
	
	return merge(base, {
		entry,
		output: {
			path: path.resolve(__dirname, folderName),
			filename: '[name].js',
			publicPath: '',
			clean: true
		},
		devServer: {
			hot: true
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					loader: 'ts-loader',
					options: {
						transpileOnly: true,
						configFile: path.resolve(__dirname, `src/${folderName}/tsconfig.json`),
						getCustomTransformers: () => ({
							before: [isWatch && ReactRefreshTypeScript()].filter(Boolean)
						})
					},
				},
				{
					test: /\.(png|woff2?|webm|gif|svg)$/,
					loader: 'file-loader',
					options: { name: '[name].[hash].[ext]' }
				},
				{
					test: /\.css$/,
					loader: 'css-loader',
					options: {
						modules: {
							exportLocalsConvention: 'camelCase',
						},
						sourceMap: true,
					},
				},
			],
		},
		plugins: [
			...Object.keys(entry).map(
				(entryName) =>
					new HtmlWebpackPlugin({
						filename: `${entryName}.html`,
						chunks: [entryName],
						template: `./src/${folderName}/template.html`,
						title: entryName,
					}),
			),
			new MiniCssExtractPlugin({
				filename: '[name].css',
				chunkFilename: '[id].css',
			}),
			new BundleAnalyzerPlugin({
				openAnalyzer: false,
				analyzerMode: 'static',
				reportFilename: path.resolve(__dirname, `bundle-analyzer/${folderName}.html`),
				logLevel: 'silent'
			}),
			...(isWatch ? [new webpack.HotModuleReplacementPlugin(), new ReactRefreshPlugin()] : [new WebpackBar({ name: folderName })]),
		],
		optimization: {
			runtimeChunk: 'single'
		}
	});
};

const extensions = merge(base, {
	target: 'node',
	node: false,
	entry: path.resolve(__dirname, 'src/extension/index.ts'),
	output: {
		path: path.resolve(__dirname, 'extension'),
		filename: 'index.js',
		libraryTarget: 'commonjs2',
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				loader: 'ts-loader',
				options: {
					configFile: path.resolve(__dirname, 'src/extension/tsconfig.json'),
					getCustomTransformers: program => ({
						before: [
							keysTransformer(program)
						]
					})
				},
			},
		],
	},
	externals: [nodeExternals()],
	plugins: [...(isWatch ? [] : [new WebpackBar({ name: 'extension' })])],
});

module.exports = [browser('dashboard'), extensions];
