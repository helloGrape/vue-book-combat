// 导入Vue框架
import Vue from 'vue';
import App from './src/app.vue';
import './src/style.css';

new Vue({
  el: '#app',
  render: h => h(App)
});