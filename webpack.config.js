const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');

// Load .env file and parse the variables
const env = dotenv.config().parsed;

// Convert .env variables to a format compatible with DefinePlugin
const envKeys = Object.keys(env).reduce((prev, next) => {
	prev[`process.env.${next}`] = JSON.stringify(env[next]);
	return prev;
}, {});

module.exports = {
	entry: ['regenerator-runtime/runtime.js', './src/app.js'],
	output: {
		path: path.join(__dirname, 'public'),
		filename: 'bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.s?css$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
		],
	},
	// source map browser about the file not the bundle (Useful for errors)
	devtool: 'cheap-module-source-map',
	// webpack dev-server
	devServer: {
		contentBase: path.join(__dirname, 'public'),
		compress: true,
		port: 8000,
	},
	plugins: [
		// Add the DefinePlugin to include environment variables
		new webpack.DefinePlugin(envKeys),
	],
};
