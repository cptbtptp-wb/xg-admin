import axios from 'axios'
import store from '@/store'
// import router from '@/router'
import { Message } from 'element-ui' // 弹出信息样式

const request = axios.create({
  baseURL: 'http://liufusong.top:8899/api/private/v1/',
  timeout: 8000
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  const token = store.state.user.token
  // console.log(token)
  if (token) {
    // 请求头
    config.headers.Authorization = token
    // this.$router.push('/home')
  }
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use(function (response) {
  const { data, meta } = response.data // 解构数据请求回的数据
  const { msg, status } = meta // 深层解构
  if (status) {
    return data
  } else {
    Message.error(msg)
    return Promise.reject(new Error(msg))
  }
}, function (error) {
  // 响应错误
  return Promise.reject(error)
})
// request.interceptors.response.use(function (response) {
//   const { data, meta } = response.data
//   const { msg, status } = meta
//   if (success) {
//     return data
//   } else {
//     Message.error(message)
//     return Promise.reject(new Error(message))
//   }
// }, function (error) {
//   return Promise.reject(error)
// })

export default request

// 对象解构
// const { data, meta } = response.data
// 约等于：
// const data = response.data.data
// const meta = response.data.meta

//   const { msg, status } = meta
// 约等于：
// const msg = meta.msg
// const status = meta.status
