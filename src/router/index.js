import { createRouter, createWebHistory } from "vue-router";

const Home = () => import("@/views/Home.vue");
const Login = () => import("@/views/Login.vue");
// const Register = () => import("@/views/Register.vue");

/* 预约管理 */
const OrderList = () => import("@/views/order/OrderList.vue"); // 预约列表
const OrderDetails = () => import("@/views/order/OrderDetails.vue"); // 预约审批

/* 管理员管理 */
const UserList = () => import("@/views/admin/UserList.vue"); // 管理员列表
const AuthorizationList = () => import("@/views/role/AuthorizationList.vue");
const RoleList = () => import("@/views/role/RoleList.vue");

/* 房间管理 */
const RoomList = () => import("@/views/room/RoomList.vue"); // 房间列表
const RoomDetails = () => import("@/views/room/RoomDetails.vue"); // 房间详情

const OrderCharts = () => import("@/views/statistics/OrderCharts.vue");
const PersonalDeatils = () => import("@/views/person/PersonalDeatils.vue");

/* 404 */
const NotFound = () => import("@/views/NotFound.vue");
const routes = [
  { path: "/", redirect: "/home" },
  { path: "/login", name: "Login", component: Login },
  // { path: "/register", name: "Register", component: Register },
  {
    path: "/home",
    name: "Home",
    component: Home,
    redirect: "/orderList",
    children: [
      { path: "/orderList", name: "OrderList", component: OrderList },
      { path: "/orderDetails", name: "OrderDetails", component: OrderDetails },
      { path: "/userList", name: "UserList", component: UserList },
      { path: "/roleList", name: "RoleList", component: RoleList },
      {
        path: "/authorizationList",
        name: "AuthorizationList",
        component: AuthorizationList
      },
      {
        path: "/roomList",
        name: "RoomList",
        component: RoomList
      },
      {
        path: "/roomDetails",
        name: "RoomDetails",
        component: RoomDetails
      },
      {
        path: "/orderCharts",
        name: "OrderCharts",
        component: OrderCharts
      },
      {
        path: "/personalDetails",
        name: "PersonalDetails",
        component: PersonalDeatils
      },
      { path: "/notFound", name: "NotFound", component: NotFound }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// 挂载路由导航守卫
// router.beforeEach((to, from, next) => {
//   if (to.path === "/login") {
//     return next();
//   }

//   // 获取 token
//   const tokenStr = window.sessionStorage.getItem("token");
//   if (!tokenStr) {
//     return next("/login");
//   }

//   next();
// });

export default router;
