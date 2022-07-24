import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/Layout'

Vue.use(VueRouter)

const routes = [
  // { path: '/', redirect: '/login' },
  { path: '/login', component: () => import('@/views/Login/index.vue') },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/Home/index.vue')
      },
      // 用户列表
      {
        path: 'users',
        component: () => import('@/views/User/index.vue'),
        meta: {
          BreadCrumb: ['用户管理', '用户列表']
        }
      },
      // 角色列表
      {
        path: 'roles',
        component: () => import('@/views/Roles/index.vue'),
        meta: {
          BreadCrumb: ['权限管理', '角色列表']
        }
      },
      // 权限列表
      {
        path: 'rights',
        component: () => import('@/views/Rights/index.vue'),
        meta: {
          BreadCrumb: ['权限管理', '权限列表']
        }
      },
      // 商品列表
      {
        path: 'goods',
        component: () => import('@/views/Goods/index.vue'),
        meta: {
          BreadCrumb: ['商品管理', '商品列表']
        }
      },
      // 添加商品
      {
        path: 'goods/add',
        component: () => import('@/views/AddGoods/index.vue'),
        meta: {
          BreadCrumb: ['商品管理', '添加商品']
        }
      },
      // 分类参数
      {
        path: 'params',
        component: () => import('@/views/Params/index.vue'),
        meta: {
          BreadCrumb: ['商品管理', '分类参数']
        }
      },
      // 商品分类
      {
        path: 'categories',
        component: () => import('@/views/Categories/index.vue'),
        meta: {
          BreadCrumb: ['商品管理', '商品分类']
        }
      },
      // 订单列表
      {
        path: 'orders',
        component: () => import('@/views/Orders/index.vue'),
        meta: {
          BreadCrumb: ['订单管理', '订单列表']
        }
      },
      // 数据列表
      {
        path: 'reports',
        component: () => import('@/views/Reports/index.vue'),
        meta: {
          BreadCrumb: ['数据统计', '数据列表']
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
