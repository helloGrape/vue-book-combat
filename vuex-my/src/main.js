// 导入Vue框架
import Vue from 'vue';
import VueRouter from 'vue-router';
//import Vuex from 'vuex';
import App from './app.vue';
import store from './store';

Vue.use(VueRouter);
//Vue.use(Vuex);

/*const Routers = [
  {
    path: '/index',
    component: (resolve) => require(['./views/index.vue'], resolve)
  },
  {
    path: '/about',
    component: (resolve) => require(['./views/about.vue'], resolve)
  },
  {
    path: '*',
    redirect: '/index'
  }
];*/
const Routers = [
  {
    path: '/index',
    meta: {
      title: '首页'
    },
    component: () => import('./views/index.vue')
  },
  {
    path: '/about',
    meta: {
      title: '关于'
    },
    component: () => import('./views/about.vue')
  },
  {
    path: '/user/:id',
    meta: {
      title: '个人主页'
    },
    component: () => import('./views/user.vue')
  },
  {
    path: '*',
    redirect: '/index'
  }
];
/*const Routers = [
  {
    path: '/index',
    component: require('./views/index.vue')
  },
  {
    path: '/about',
    component: require('./views/about.vue')
  },
  {
    path: '*',
    redirect: '/index'
  }
];*/
const RouterConfig = {
  // 使用HTML5的History路由模式
  //mode: 'history',
  routes: Routers
};
const router = new VueRouter(RouterConfig);
router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title;
  next();
});
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
})

// 配置Vuex
/*const store = new Vuex.Store({
  state: {
    count: 0,
    list: [1, 5, 8, 10, 30, 50]
  },
  mutations: {
    increment (state, n = 1) {
      state.count += n;
      //state.count += params.count;
    },
    decrease (state) {
      state.count --;
    }
  },
  actions: {
    decrease(context) {
      context.commit('decrease');
    },
    asyncIncrement(context) {
      return new Promise(resolve => {
        setTimeout(() => {
          context.commit('increment');
          resolve();
        }, 1000)
      });
    }
  },
  getters: {
    filteredList: state => state.list.filter(item => item < 10),
    listCount: (state, getters) => getters.filteredList.length
  }
})*/

new Vue({
  el: '#app',
  router,
  // 使用vuex
  store,
  render: h => h(App)
});