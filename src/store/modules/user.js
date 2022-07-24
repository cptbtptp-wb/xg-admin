// 用本地存储获取token
// yarn add vuex-persist +
// 引入对应接口
import { login, getSideBar } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router from '@/router'
const state = {
  token: getToken(),
  sidebarList: []// 左侧菜单数据
}

const mutations = {
  setToken (state, payload) {
    state.token = payload
  },
  removeToken (state) {
    state.token = null// 清空token
    removeToken()
  },
  getSideBar (state, payload) {
    state.sidebarList = payload
  }
}

const actions = {
  // 登录
  async login (context, data) {
    const res = await login(data)
    // console.log(res)
    context.commit('setToken', res.token)// 调用请求回的token
    setToken(res.token)// 存储到本地
    router.push('/home') // 跳转到首页
  },
  // 退出登录
  logout (context) {
    context.commit('removeToken')
  },
  // 左侧栏内容
  async getSideBar (context) {
    const res = await getSideBar()
    // console.log(res)
    // 后一个参数是接收回来的具体数据
    context.commit('getSideBar', res)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
