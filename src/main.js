// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from "vue-router";
//开启debug模式
Vue.config.debug = true;
Vue.use(VueRouter);

Vue.config.sys = {
    /*=================开发 =======================*/
        ip: 'http://127.0.0.1:8085/kill/',
   /*=================生产=======================*/
//       ip: 'http://192.168.2.114:8085/kill/',
    /*============请求超时时间=====================*/
    timeout: 60 * 1000
};
// 定义组件, 也可以像教程之前教的方法从别的文件引入
const First = { template: '<div><h2>我是第 1 个子页面</h2></div>' }
import PorductList from './components/PorductList'
import OrdertList from './components/OrderList'
import Detail from './components/Detail'

// 创建一个路由器实例
// 并且配置路由规则
const routes =  [
    { path: '/', redirect: '/index' },
    {
        path: '/index',
        component: PorductList
    },
    {
        path: '/order',
        component: OrdertList
    },// 动态路径参数 以冒号开头
    { path: '/detail', component: Detail }
];

const router = new VueRouter({
    routes: routes,
    base:__dirname
});


new Vue({
  el: '#app',
  template: '<App/>',
    router: router,
  components: { App }
}).$mount('#app');
