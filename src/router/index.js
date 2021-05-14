import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue")
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("@/views/Home.vue"),
    redirect: "/orderList",
    children: [
      {
        path: "/orderList",
        name: "OrderList",
        component: () => import("@/views/order/OrderList.vue")
      },
      {
        path: "/orderDetails",
        name: "OrderDetails",
        component: () => import("@/views/order/OrderDetails.vue")
      },
      {
        path: "/roomList",
        name: "RoomList",
        component: () => import("@/views/room/RoomList.vue")
      },
      {
        path: "/roomDetails",
        name: "RoomDetails",
        component: () => import("@/views/room/RoomDetails.vue")
      },
      {
        path: "/notFound",
        name: "NotFound",
        component: () => import("@/views/NotFound.vue")
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  document.title = "北京理工大学睿信社区管理系统";
  // 获取 token
  const tokenObj = JSON.parse(window.localStorage.getItem("token"));

  // 如果有 token 说明该用户已经登录
  if (tokenObj) {
    // 在已登录的情况下, 访问登录页会被重定向到首页
    if (to.path === "/login") {
      next({ path: "/" });
    } else {
      next();
    }
  } else {
    // 没有登录的话, 访问任何页面都重定向到登录页
    if (to.path === "/login") {
      next();
    } else {
      next({ path: "/login" });
    }
  }
});

export default router;
