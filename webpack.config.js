const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    // devtool: 'source-map',
    entry: {
        main: path.resolve(__dirname,'src/script/main.js'),
        aa: path.resolve(__dirname,'src/script/aa.js'),
        test: path.resolve(__dirname,'src/script/test.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1
                            }
                        },
                        'postcss-loader',
                        'less-loader'
                    ]
                }),
                exclude: [/aa.less$/]
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1
                            }
                        },
                        'postcss-loader',
                        'less-loader'
                    ]
                }),
                include: [/aa.less$/]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {

                        }
                    },
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new ExtractTextPlugin('css/[name].css'),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,'src/index.html'),
            filename: 'index.html',
            chunks:['main']
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,'src/aa.html'),
            filename: 'aa.html',
            chunks: ['aa'],
            inlineSource: '.css$'
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,'src/test.html'),
            filename: 'test.html',
            chunks: ['test'],
            inlineSource: '.(js|css)$'
        }),
        new HtmlWebpackInlineSourcePlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: './dist',//本地服务器所加载的页面所在的目录，不要写绝对路径，不然无法热更新
        historyApiFallback: true,
        hot: true,
        inline: true
    }
}