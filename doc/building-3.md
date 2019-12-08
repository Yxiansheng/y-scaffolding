## 脚手架搭建（三）

### 配置打包自动生成 index.html 文件

#### 在前面的配置中，我们需要自己在打包后的文件夹中添加 index.html，比较麻烦，因为 webpack 提供了 html-webpack-plugin 该插件，可以帮助我们依照我们提供的模板自动生成引入打包后的 js 文件的 html 文件

`html-webpack-plugin npm包介绍 https://github.com/jantimon/html-webpack-plugin`

1. 安装: `npm i html-webpack-plugin -D`
2. 配置:

```
"webpack.config.js"

const HtmlWebpackPlugin = require('html-webpack-plugin')
plugins: [
    // 用于以各种方式自定义 webpack 构建过程
    new VueLoaderPlugin(), // vue-loader要求使用插件，使module中的其他规则应用到vue组件中的相应部分，如css-loader对应vue组件中的style
    new HtmlWebpackPlugin({
        // 打包自动生成index.html插件
        template: 'index.html', // 生成的html模板
        minify: {
          // 最小化输出模板文件配置,具体配置文档为https://github.com/kangax/html-minifier#options-quick-reference
            collapseWhitespace: true, // 折叠空白
            removeComments: true // 去掉注释
        }
    })
],
```

3. 去除已经不需要的配置
   到这里我们可以使 webpack 在打包时自动生成 index.html 了，那也代表我们在使用 webpack-dev-server 时可以不用提供其所需静态文件文件夹了，即

```
devServer: {
    contentBase: path.resolve(__dirname, 'dist'), // 现在可删除
    host: "0.0.0.0", // 使外部主机可访问该服务器
```

现在 webpack-dev-server 在运行时会自动按照我们的模板配置自动在内存中生成可访问的 index.html，极大地方便了我们的开发
