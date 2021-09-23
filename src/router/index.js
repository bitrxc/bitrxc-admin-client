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
        path: 'appointmentList',
        name: 'AppointmentList',
        component: () => import('../views/AppointmentList.vue'),
        meta: {
          title: '订单列表'
        }
      },
      {
        path: 'appointmentItem/:id',
        name: 'AppointmentItem',
        component: () => import('../views/AppointmentItem.vue'),
        meta: {
          title: '订单详情'
        }
      },
      {
        path: 'managerList',
        name: 'ManagerList',
        component: () => import('../views/ManagerList.vue'),
        meta: {
          title: '管理员列表'
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
