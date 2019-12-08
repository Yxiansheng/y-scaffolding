const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('./config/webpack')

function resolve(subPath) {
    return path.resolve(__dirname, subPath)
}

module.exports = {
    entry: resolve('src/main.js'), // 配置入口文件
    output: {
        path: resolve('dist'), // 输出文件夹
        filename: 'bundle.js' // 输出文件名
    },
    module: {
        // 配置webpack如何处理使用不同语言或预处理器编写的模块
        rules: [
            // 匹配不同类型模块的规则
            {
                test: /.vue$/, // 匹配vue结尾的文件，即vue文件
                loader: 'vue-loader' // 使用vue-loader来处理匹配到的文件
            },
            {
                test: /.css$/,
                loader: 'css-loader'
            }
        ]
    },
    plugins: [
        // 用于以各种方式自定义 webpack 构建过程
        new VueLoaderPlugin(), // vue-loader要求使用插件，使module中的其他规则应用到vue组件中的相应部分，如css-loader对应vue组件中的style
        new HtmlWebpackPlugin({
            // 打包自动生成index.html插件
            template: 'index.html', // 生成的html模板
            minify: { // 最小化输出模板文件配置,具体配置文档为https://github.com/kangax/html-minifier#options-quick-reference
                collapseWhitespace: true, // 折叠空白
                removeComments: true // 去掉注释
            }
        })
    ],
    devServer: {
        contentBase: resolve('dist'), // 配置服务器从哪个位置提供内容
        host: '0.0.0.0', // 使外部主机可访问该服务器
        clientLogLevel: 'warning', // 限制热替换、重载时警告级别以上的log才在控制台输出
        compress: true, // 请求服务都启用gzip 压缩
        overlay: true, // 报错时将错误展示在页面上
        proxy: {
            '/api': {
                target: config.PROXY_HOST,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
        watchOptions: {
            // 配置webpack如何监听文件变化选项
            // 是否在webpack的监听失效时（如监听外部引入文件）启动轮询访问监听是否发生变化
            poll: false // 不启动
        }
    }
}