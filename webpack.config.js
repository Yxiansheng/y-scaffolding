const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry: path.resolve(__dirname, 'src/main.js'), // 配置入口文件
    output: { 
        path: path.resolve(__dirname, 'dist'), // 输出文件夹
        filename: 'bundle.js' // 输出文件名
    },
    module: { // 配置webpack如何处理使用不同语言或预处理器编写的模块
        rules: [ // 匹配不同类型模块的规则
            {
                test: /.vue$/,// 匹配vue结尾的文件，即vue文件
                loader: 'vue-loader' // 使用vue-loader来处理匹配到的文件
            },
            {
                test: /.css$/,
                loader: 'css-loader'
            },
        ]
    },
    plugins: [ // 用于以各种方式自定义 webpack 构建过程
        new VueLoaderPlugin() // vue-loader要求使用插件，使module中的其他规则应用到vue组件中的相应部分，如css-loader对应vue组件中的style
    ]
}