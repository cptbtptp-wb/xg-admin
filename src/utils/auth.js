// 工具函数文件
// 声明一个变量，方便查错
const TokenKey = 'HRtoken'

// 取token
export function getToken () {
  return window.localStorage.getItem(TokenKey)
}

// 存token
export function setToken (token) {
  return window.localStorage.setItem(TokenKey, token)
}

export function removeToken () {
  return window.localStorage.removeItem(TokenKey)
}
