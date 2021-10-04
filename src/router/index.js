import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/welcome',
    meta: {
      title: '主页'
    },
    children: [
      {
        path: 'welcome',
        component: () => import('../views/Welcome.vue'),
        meta: {
          title: '欢迎页'
        }
      },
      {
        path: 'appointmentList',
        name: 'AppointmentList',
        component: () => import('../views/admin/AppointmentList.vue'),
        meta: {
          title: '订单列表'
        }
      },
      {
        path: 'appointmentItem/:id',
        name: 'AppointmentItem',
        component: () => import('../views/admin/AppointmentItem.vue'),
        meta: {
          title: '订单详情'
        }
      },
      {
        path: 'managerList',
        name: 'ManagerList',
        component: () => import('../views/admin/ManagerList.vue'),
        meta: {
          title: '管理员列表'
        }
      },
      {
        path: 'roomList',
        name: 'RoomList',
        component: () => import('../views/admin/RoomList.vue'),
        meta: {
          title: '房间列表'
        }
      },
      {
        path: 'roomItem/:id',
        name: 'RoomItem',
        component: () => import('../views/admin/RoomItem.vue'),
        meta: {
          title: '房间详情'
        }
      },
      {
        path: 'orderRoomList',
        name: 'orderRoomList',
        component: () => import('../views/order/OrderRoomList.vue'),
        meta: {
          title: '管理员预约'
        }
      },
      {
        path: 'orderRoomItem/:id',
        name: 'orderRoomItem',
        component: () => import('../views/order/OrderRoomItem.vue'),
        meta: {
          title: '管理员预约'
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
