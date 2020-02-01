import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../components/HelloWorld'
import Login from '../components/pages/Login.vue'
import Dashboard from '../components/dashboard'
import Products from '../components/pages/Products.vue'

Vue.use(VueRouter)

const routes = [
  {
    //避免用戶進入不存在頁面
    path:'*',
    redirect:'login'
  },
  // {
  //   path: '/',
  //   name: 'home',
  //   component: Home,
  //   meta:{
  //     requiresAuth: true,
  //   }
  // },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/admin',
    name: 'dashboard',
    component: Dashboard,
    meta:{
      requiresAuth: true,
    },
    children:[
      {
        path: 'products',
        name: 'Products',
        component: Products,
        meta:{
          requiresAuth: true,
        },
      },
    ]
  },
]

const router = new VueRouter({
  routes
});


export default router
