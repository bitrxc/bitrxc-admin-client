import { createRouter, createWebHistory } from "vue-router";

const Home = () => import("@/views/Home.vue");
const Login = () => import("@/views/Login.vue");
const Register = () => import("@/views/Register.vue");
const AuthorizationList = () => import("@/views/role/AuthorizationList.vue");
const RoleList = () => import("@/views/role/RoleList.vue");
const Classification = () => import("@/views/room/Classification.vue");
const Parameter = () => import("@/views/room/Parameter.vue");
const RoomList = () => import("@/views/room/RoomList.vue");
const OrderCharts = () => import("@/views/statistics/OrderCharts.vue");
const PersonalDeatils = () => import("@/views/person/PersonalDeatils.vue");
const LayRow = () => import("@/components/layRow/LayRow.vue");

const routes = [
  { path: "/", redirect: "/home" },
  { path: "/login", name: "Login", component: Login },
  { path: "/register", name: "Register", component: Register },
  {
    path: "/home",
    name: "Home",
    component: Home,
    redirect: "/roleList",
    children: [
      { path: "/roleList", name: "RoleList", component: RoleList },
      {
        path: "/authorizationList",
        name: "AuthorizationList",
        component: AuthorizationList
      },
      {
        path: "/classification",
        name: "Classification",
        component: Classification
      },
      {
        path: "/parameter",
        name: "Parameter",
        component: Parameter
      },
      {
        path: "/roomList",
        name: "RoomList",
        component: RoomList
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
      }
    ]
  },
  { path: "/layRow", name: "LayRow", component: LayRow }
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
