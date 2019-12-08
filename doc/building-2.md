## 脚手架搭建（二）

### 引入 webpack-dev-server

#### webpack-dev-server: 一个简单的 web 服务器，可提供热替换、自动重载打包后文件等功能

1. 本地安装：`npm i webpack-dev-server -D`
2. 在 webpack 配置文件中添加配置

```
devServer: {
    contentBase: './dist'
}
```

3. 在 package.json 中添加 npm 脚本：

```
 "start": "webpack-dev-server"
```

由于 webpack-dev-server 默认开启热替换功能，以上步骤即可满足基本 webpack 开发，而以下配置则是为了更加贴合日常开发的实际需求

```
devServer: {
    // 配置服务器从哪个位置提供内容，webpack-dev-server默认会在计算机内存生成临时的打包后的文件，根路径/访问index.html文件
    // 但此时我们还未使用html-webpack-plugin来为我们生成自动引入打包后js文件的index.html，导致我们访问devserver根目录时获取不到内容
    // 为了更好得看到效果，我们可引入contentBase配置，使devServer服务器从dist目录提供内容以代替从内存中提供，同时在dist目录事先新增一个引入bundle.js的index.html文件，使我们访问devServer根目录时（http://localhost:8080/），看到我们打包的内容
    contentBase: path.resolve(__dirname, 'dist'),
    host: "0.0.0.0", // 使外部主机可访问该服务器
    clientLogLevel: "warning", // 限制热替换、重载时警告级别以上的log才在控制台输出
    compress: true, // 请求服务都启用gzip 压缩
    overlay: true, // 报错时将错误展示在页面上
    proxy: { // 配置代理
        "/api": {
            target: config.PROXY_HOST,
            pathRewrite: {"^/api" : ""}
        }
    },
    watchOptions: { // 配置webpack如何监听文件变化选项
        // 是否在webpack的监听失效时（如监听外部引入文件）启动轮询访问监听是否发生变化
        poll: false,  // 不启动
    }
}
```
