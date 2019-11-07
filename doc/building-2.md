## 脚手架搭建（二）
### 引入webpack-dev-server

#### webpack-dev-server: 一个简单的web服务器，可提供热替换、自动重载打包后文件等功能
1. 本地安装：```npm i webpack-dev-server -D```
2. 在webpack配置文件中添加配置
```
devServer: {
    contentBase: './dist'
}
```
3. 在package.json中添加npm脚本：
```
 "start": "webpack-dev-server"
```
由于webpack-dev-server默认开启热替换功能，以上步骤即可满足基本webpack开发，而以下配置则是为了更加贴合日常开发的实际需求
```
devServer: {
    contentBase: path.resolve(__dirname, subPath), // 配置服务器从哪个位置提供内容
    host: "0.0.0.0", // 使外部主机可访问该服务器
    clientLogLevel: "warning", // 限制热替换、重载时警告级别以上的log才在控制台输出
    compress: true, // 请求服务都启用gzip 压缩
    overlay: true, // 报错时将错误展示在页面上
    proxy: {
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