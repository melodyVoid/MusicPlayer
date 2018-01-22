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
- 轮播图组件完成

## 2018-01-16

- 为 router-view 添加 keepAlive ,缓存 DOM ,优化体验
- 填坑：请求推荐歌单数据返回json和jsonp的问题
- 获取推荐歌单数据并渲染到页面
- 封装 scroll 组件
- 监听 img 的 onload 事件，保证 scroll 组件的高度计算没有问题

## 2018-01-18

- 图片懒加载，`yarn add vue-lazyload` ,在 main.js 中引用模块，然后 `use` 它
- 使用：在组件中将之前的 `:src="item.imageUrl"` 替换为 `v-lazy="item.imageUrl"`
- 封装 loading 组件，放在 base 里面。然后在 recommend 中使用 loading 组件
- 歌手页面，获取歌手数据，并将数据处理成我们想要的数据格式
- 开发 listview 组件


## 2018-01-19

- 用计算属性计算出 `shortcutList` 用于歌手页最右边的快速索引
- 在 common/js/dom.js 中加入 `getData` 方法，用于获取元素的自定义属性 `data-` 开头的
- 通过 `onShortcutTouchStart` 传入的事件对象，再结合 `getData` 方法可以获取到 `anchorIndex`
- 丰富 scroll 组件，添加 scrollTo 和 scrollToElement 两个方法
- 给 list-shortcut 添加 `touchmove` 事件，并阻止默认行为和冒泡 `@touchmove.stop.prevent`
- `onShortcutTouchMove` 需要一个差值（delta），所以在 `onShortcutTouchStart` 中需要保存第一次触碰的位置，两个函数需要同时能访问到这个值，所以在 `created` 钩子函数中定义 `this.touch = {}`
- 为什么不在 `data` 里面写 `touch` 因为写在 `data` 里面的数据是会被观察者观察的，我们只是在两个函数之间共同使用，所以没有必要进行被观察
- 根据第一次开始触碰的锚点索引和差值锚点索引，计算出新的锚点索引，然后调用 `_scrollTo` 方法滚动到相应位置
- 增加联动效果，丰富 scroll 组件，添加 `props` 中的 listen 属性，在初始化 scroll 组件的时候，进行判断，如果 listen 属性是 true 那么就向外派发 'scroll' 事件
- 在 listview 组件中设置 listenScroll 为 true，并传入 scroll 组件中的 listen 属性中，scroll 组件派发 'scroll' 事件，我们在 listview 组件中用 'scroll' 方法接收
- listview 组件中的 data 里面设置 scrollY 为 -1，表示需要监听的位置
- 在观测一个 currentIndex 表示当前应该显示的是第几个，currnetIndex 是哪个就表示哪个是高亮显示
- listview 组件中添加  `_calculateHeight` 方法来计算高度，得到一个高度区间数组 `this.listHeight`
- 然后 watch `scrollY` 的值，来计算得到 `currentIndex` 在根据 `currentIndex` 来绑定 current 样式
- 梳理 `scrollY` 里面的逻辑，分为三个部分

## 2018-01-20

- 解决点击歌手列表右边快速入口，字母不高亮的问题
- 快速入口滑动的时候边界处理
- 歌手列表页添加 fixedTitle
- fixedTitle 的向上顶的效果
- 歌手列表页添加 loading 效果

## 2018-01-21

- 创建业务组件 singer-details ，并配置路由
- 给 singer-details 组件添加转场动画
- 安装并初始化 vuex
- 抓取歌手详情信息数据
- 为了得到我们想要的数据，我们创建一个类 Song
- 给 Song 类扩展一个工厂方法
- `_normalizeSongs` 得到我们想要的数据
- 添加 music-list 业务组件
- 开发 song-list 基础组件

## 2018-01-22

- 在 music-list 组件中添加 layer 层，用于歌曲向上滑的时候跟随一起动
- 修复歌曲文字高于背景图片的问题
- 歌曲上滑的时候添加 blur 效果
- 在 dom.js 中封装 prefixStyle 方法，根据不同浏览器添加不同的 transform 头部