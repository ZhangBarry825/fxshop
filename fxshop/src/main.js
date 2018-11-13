// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import resource from 'vue-resource'
import vueUtil from './util/vueutil'
import store from './store/index'
// import VueAwesomeSwiper from 'vue-awesome-swiper'

Vue.config.productionTip = false;
Vue.use(resource);
Vue.use(vueUtil.vueUtil);
// import { AlertPlugin, ToastPlugin } from 'vux'

// Vue.use(AlertPlugin)
// Vue.use(ToastPlugin)
// require('./mock.js')
// vueUtil.vueUtil();
// Vue.prototype.pushRoute=function(path){
//   this.$router.push(path);
// }
// Vue.use(BaiduMap,{
//   ak:'O1bvQ9wk5VG7WVerj9UYte6HcfWtOcWy'
// });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
