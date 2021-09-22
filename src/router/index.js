import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/appointmentList',
    meta: {
      title: '主页'
    },
    children: [
      {
        path: '/appointmentList',
        name: 'AppointmentList',
        component: () => import('../views/AppointmentList.vue'),
        meta: {
          title: '订单管理'
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
