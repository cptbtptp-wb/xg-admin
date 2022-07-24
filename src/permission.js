// 权限控制
import store from '@/store'
import router from '@/router'

// 路由守卫
router.beforeEach((to, from, next) => {
  const token = store.state.user.token
  // console.log(token)
  if (token) {
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else { // 没有token
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})
router.afterEach(() => {
})
