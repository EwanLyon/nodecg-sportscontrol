import path from 'path';
import globby from 'globby';
import webpack from "webpack";
import WebpackBar from 'webpackbar';
import { merge } from 'webpack-merge';
import nodeExternals from 'webpack-node-externals';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');

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

const browser = (folderName: string) => {
	const entry: webpack.Entry = {};
	const files = globby.globbySync(`./src/${folderName}/*.tsx`);
	files.forEach((file) => {
		entry[path.basename(file, '.tsx')] = file;
	});

	return merge(base, {
		// @ts-ignore
		entry,
		output: {
			path: path.resolve(__dirname, folderName),
			filename: '[name].js',
			publicPath: '',
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					loader: 'ts-loader',
					options: {
						transpileOnly: true,
						configFile: path.resolve(__dirname, 'src/browser/tsconfig.json'),
					},
				},
				{
					test: /\.(png|woff2?|webm|gif|svg)$/,
					loader: 'file-loader',
					options: { name: '[name].[hash].[ext]' },
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
			}),
			...(isWatch ? [] : [new WebpackBar({ name: folderName })]),
		],
		optimization: {
			splitChunks: {
				chunks: 'all',
				cacheGroups: {
					common: { minChunks: files.length },
					vendors: false,
					default: false,
				},
			},
		},
	});
};

const extensions = merge(base, {
	// @ts-ignore
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
				},
			},
		],
	},
	externals: [nodeExternals()],
	plugins: [...(isWatch ? [] : [new WebpackBar({ name: 'extension' })])],
});

module.exports = [browser('graphics'), browser('dashboard'), extensions];
