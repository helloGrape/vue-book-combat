import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const Routers = [
  {
    path: '/cart',
    meta: {
      title: '购物车'
    },
    component: () => import('../views/cart.vue')
  },
  {
    path: '/product/:id',
    meta: {
      title: '商品详情'
    },
    component: () => import('../views/product.vue')
  },
  {
    path: '/list',
    meta: {
      title: '商品列表'
    },
    component: () => import('../views/list.vue')
  },
  {
    path: '*',
    redirect: '/list'
  }
];
const RouterConfig = {
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
export default router;