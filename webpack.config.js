const path = require('path')

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: { 
                loader: 'babel-loader'
            }
        }, {
            test: /\.s?css$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        }]
    },
    // source map browser about the file not the bundle (Useful for errors)
    devtool: 'cheap-module-source-map',
    // webpack dev-server
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        port: 8000
    }
}