import {createRouter, createWebHashHistory} from 'vue-router'

import Login from '~/view/login/login.vue'
import NotFound from '~/view/NotFount/NotFound.vue'
import admin from '~/layouts/admin.vue'
import index from '~/view/Index/index.vue'
import goodsList from '~/view/goods/list.vue'
import dataScreen from '~/view/dataScreen/dataScreen.vue'

const routes = [
  {
    path: '/',
    name: 'Admin',
    component: admin,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/dataScreen',
    name: 'dataScreen',
    component: dataScreen,
    meta: {
      title: '大屏'
    }
  },
  { path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: {
      title: '找不到页面了～～'
    }
  },
]

const asyncRoutes = [
  {
    path: '/',
    name: '/',
    component: index,
    meta: {
      title: '后台首页'
    }
  },
  {
    path: '/goods/list',
    name: '/goods/list',
    component: goodsList,
    meta: {
      title: '商品管理'
    }
  }
]
export const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export const addRoutes = (menus) => {
  const findAndAddRouteForMenus = (arr) => {
    arr.forEach(e => {
      let item = asyncRoutes.find(o => o.path === e.frontpath )
      if (item && !router.hasRoute(item.path)) {
        router.addRoute('Admin',item)
      }
      if (e.child && e.child.length) {
        findAndAddRouteForMenus(e.child)
      }
    })
  }
  findAndAddRouteForMenus(menus)
}
