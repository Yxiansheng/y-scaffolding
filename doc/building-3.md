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


### 添加常见文件类型文件解析loader

#### 现在我们来尝试测试使用这个脚手架做一次小开发，在app.vue中添加一张图片

1. 先在文件夹src下添加一个用于存放项目公共文件的文件夹assets及公共图片文件夹assets/images
2. 在上述文件夹中添加图片
3. 在app.vue中添加标签```<img src="./assets/images/img1.jpg" alt="图标"/>```，此时我们运行项目，可以看到一个报错```Module not found: Error: Can't resolve './assets/iamges/img1.jpg'```
4. 究其原因，主要在于webpack在默认情况下只能处理js文件，若我们需要处理其他类型的文件，就需要加载相应文件类型的loader
5. 而webpack就为我们提供file-loader来处理一些常见类型文件
6. 安装：``` npm i file-loader --save ```
7. 配置：
```
webpack.config.js

{
    test: /\.(png|jpe?g|gif|webp)(\?.*)?$/, // 正则匹配各种类型图片
    use: [
        {
            loader: 'file-loader',
            options: {
                name: 'img/[name].[hash:8].[ext]', // [hash:8]文件内容hash取前8位,[ext]为资源扩展名
                // 由于file-loader默认是使用es6的模块语法生成文件，而我们在vue文件中引入该文件，是无法解析浏览器环境才能用的es6模块语法的
                // 于是在此我们将esModule设为false，使用commonjs语法生成文件，以便我们在node环境中可以解析
                esModule: false 
            }
        }
    ]
}
```
8. 到此再次我们就可以看到图片了
9. 而在vue官方脚手架中，我们可以看到其处理图片还使用到了url-loader，用于在文件字节数小于某个限制值时，将其内容转为BASE64编码的DataURL，并返回，这也是个实用的功能，在此我们也加上
10. 安装：```npm i url-loader --save```
11. 配置：
```
{
    test: /\.(png|jpe?g|gif|webp)(\?.*)?$/, // 正则匹配各种类型图片
    use: [
        {
            loader: 'url-loader',
            options: {
                limit: 4096,
                fallback: {
                    loader: 'file-loader',
                    options: {
                    name: 'img/[name].[hash:8].[ext]', // [hash:8]文件内容hash取前8位,[ext]为资源扩展名
                    }
                },
                // 由于file-loader默认是使用es6的模块语法生成文件，而我们在vue文件中引入该文件，是无法解析浏览器环境才能用的es6模块语法的
                // 于是在此我们将esModule设为false，使用commonjs语法生成文件，以便我们在node环境中可以解析
                esModule: false 
            }
        }
    ]
}
```
