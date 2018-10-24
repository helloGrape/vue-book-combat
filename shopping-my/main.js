// 导入Vue框架
import Vue from 'vue';
import router from './src/router';
import store from './src/store';
import App from './src/app.vue';
import './src/style.css';

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});