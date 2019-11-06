## 脚手架搭建（一）
### 项目初始化（vue及webpack初始化配置）

1. 首先初始化在文件夹内初始化npm： 
```npm init```
2. 安装vue.js: ```npm install vue --save```
3. 安装webpack及webpack-cli
```
    npm install webpack webpack-cli -D
```
4. 安装vue-loader、css-loader、vue-template-compiler: ```npm i css-loader vue-loader vue-template-compiler -D```
   vue-template-compiler作为vue模板编译器，vue-loader必须
5. 创建webpack配置文件: webpack.config.js
```
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
```
6. 在package.json中配置npm脚本
```
"scripts": { // 在scripts中添加
  "dev": "webpack config webpack.config.js" // 配置npm脚本，使打包更简单
}
```
7. 创建首页html: index.html
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <!-- width=device-width 使页面视口宽度等于设备屏幕宽度
         inital-scale 同上，加入主要是为了兼容IE
         user-scalable=no 限制用户不可以手动缩放网页内容，主要针对移动端双击会放大网页问题 -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <!-- 针对IE浏览器的兼容模式，使IE浏览器c处于兼容时默认使用最高级内核解析该文档 -->
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <div id="app"></div>
    <script src="./bundle.js"></script>
</body>
</html>
```

8. 创建项目的根容器Vue组件实例 /src/app.vue
```
<template>
  <div>
    Hello! This is my test scaffolding.
  </div>
</template>

<script>
export default {
   name: 'app',
}
</script>
```

9. 实例项目根Vue实例，并挂载Dom节点 main.js
```
import Vue from 'vue'
import App from './App.vue'

new Vue({
    el: '#app',
    render: h => h(App)
})
```


### 应注意的点
1. webpack配置文件中的entry配置不能直接设置文件名，否则会报错
```
error: entry: 'main.js',
right: entry: './main.js' or path.resolve(__dirname, 'main.js')
```