// 对外暴露配置路由
import { RouteRecordRaw } from "vue-router";
// 常量路由
export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "layout",
    component: () => import("@/layout/index.vue"),
    redirect: "/home",
    meta: {
      title: "layout",
      icon: "Avatar",
    },
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/views/home/index.vue"),
        meta: {
          title: "首页",
          icon: "HomeFilled",
        },
      },
    ],
  },
  {
    path: "/screen",
    name: "Screen",
    component: () => import("@/views/screen/index.vue"),
    meta: {
      hidden: false,
      title: "大屏",
      icon: "Platform",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登陆",
      hidden: true,
      icon: "Promotion",
    },
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/404/index.vue"),
    meta: {
      title: "404",
      hidden: true,
      icon: "CircleClose",
    },
  },
];

// 异步路由
export const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: "/acl",
    name: "Acl",
    component: () => import("@/layout/index.vue"),
    meta: {
      icon: "Setting",
      title: "权限管理",
    },
    redirect: "/acl/user", // 为了面包屑点击上一级重定向到第一个子路由
    children: [
      {
        path: "/acl/user",
        name: "User",
        component: () => import("@/views/acl/user/index.vue"),
        meta: {
          title: "用户管理",
          icon: "User",
        },
      },
      {
        path: "/acl/role",
        name: "Role",
        component: () => import("@/views/acl/role/index.vue"),
        meta: {
          title: "角色管理",
          icon: "MoreFilled",
        },
      },
      {
        path: "/acl/permission",
        name: "Permission",
        component: () => import("@/views/acl/permission/index.vue"),
        meta: {
          title: "菜单管理",
          icon: "Grid",
        },
      },
    ],
  },
  {
    path: "/product",
    name: "Product",
    component: () => import("@/layout/index.vue"),
    meta: {
      icon: "Goods",
      title: "商品管理",
    },
    redirect: "/product/trademark", // 为了面包屑点击上一级重定向到第一个子路由
    children: [
      {
        path: "/product/trademark",
        name: "Trademark",
        component: () => import("@/views/product/trademark/index.vue"),
        meta: {
          title: "品牌管理",
          icon: "ShoppingCart",
        },
      },
      {
        path: "/product/attr",
        name: "Attr",
        component: () => import("@/views/product/attr/index.vue"),
        meta: {
          title: "属性管理",
          icon: "PieChart",
        },
      },
      {
        path: "/product/spu",
        name: "Spu",
        component: () => import("@/views/product/spu/index.vue"),
        meta: {
          title: "spu管理",
          icon: "Calendar",
        },
      },
      {
        path: "/product/sku",
        name: "Sku",
        component: () => import("@/views/product/sku/index.vue"),
        meta: {
          title: "sku管理",
          icon: "Orange",
        },
      },
    ],
  },
];

// 任意路由
export const anyRoutes: Array<RouteRecordRaw> = [
  // 没有找到匹配项的路由
  {
    path: "/:pathMatch(.*)*",
    name: "any",
    redirect: "/404",
    meta: {
      title: "任意路由",
      hidden: true,
      icon: "WarningFilled",
    },
  },
];
