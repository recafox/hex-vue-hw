//npm套件
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap'; //為了使用bootstrap的套件
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

//自定義
import App from './App.vue'
import router from './router'
import './bus'

Vue.use(VueAxios, axios)
Vue.component('Loading', Loading);

Vue.config.productionTip = false
axios.defaults.withCredentials = true;
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

//檢查用戶是否登入
router.beforeEach((to, from, next) => {
  console.log(to, from);
  next();
  if(to.meta.requiresAuth){
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`;
    axios.post(api).then(response => {
      console.log(response.data);
      if(response.data.success){
        next();
      }else{
        next({
          path:'/login'
        })
      }
    });

  }else{
    next();
  }
  
});

