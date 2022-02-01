const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    context: __dirname,
    devtool: 'eval-source-map',
    mode: 'production',
    entry: './blocks/src/blocks.js',
    output: {
        path: __dirname + '/blocks/dist',
        filename: 'blocks.build.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            },
            {
				test: /\.scss$/,
                include: path.resolve(process.cwd(), './blocks/src'),
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: !isProduction,
							url: false,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: !isProduction,
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: !isProduction,
						},
					},
				],
			}
        ]
    },
    
	plugins: [
		// Extract CSS into a separate files.
		new MiniCssExtractPlugin({
			filename: '[name].build.css',
			chunkFilename: '[id].css',
		}),
	],
};