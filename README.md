# vue-music-player  慕课网的学习项目

> vue-music-player

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:6715
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).



## 2018-01-14

- 起骨架
- 项目依赖安装`bebel-runtime`(对ES6语法的转义)和`fast-click`(解决移动端300毫秒延迟的问题)
- 开发依赖安装`babel-polyfill`(类似补丁)
- 头部组件、tab组件
- 推荐页、歌手页、排行页、歌手页路由配置
- 依赖安装`jsonp`、在common/js文件夹下封装通用的jsonp方法
- 请求到QQ音乐的数据
- 在src文件夹下面创建base文件夹，用来放基础组件
- 封装轮播图组件
- 依赖安装`better-scroll`
- 给`slider`和`sliderGroup`添加引用，用于计算slider容器的宽度
- 在common/js文件夹下面创建通用的dom.js用于进行添加className
- `better-scroll`升级到最新版`snap`的写法有变动（踩坑）

## 2018-01-15

- 为轮播图加上dots，在slider初始化之前初始化dots
- ​