import {createRouter, createWebHashHistory} from 'vue-router'


const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   redirect:'/home'
  //   // component: () => import('../pages/home/index.vue')
  // },
  {
    path: '/',
    name: 'home',
    component: () => import('../pages/home/index.vue')
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: () => import('../pages/home/detail.vue')
  },
  {
    path: '/lang',
    name: 'lang',
    component: () => import('../pages/lang/index.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
