import Vue from 'vue'
import App from './App.vue'
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import $http from './until/http.js'
// Vue.use($http)
Vue.use(ElementUI);
import store from './store'
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
