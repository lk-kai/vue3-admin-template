import axios from 'axios'
import { ElNotification } from 'element-plus'
import {getToken} from '~/utils/auth.js'
const instance = axios.create({
  timeout: 5000,
  baseURL: 'https://www.fastmock.site/mock/268db58ddfe565c9e0e6c51294f19ae2/test'
})

// 当前正在请求的数量
let needLoadingRequestCount = 0

// 显示loading
function showLoading (target) {
  needLoadingRequestCount++
  document.getElementById('loading').style.display = 'block'
}

// 隐藏loading
function hideLoading () {
  needLoadingRequestCount--
  needLoadingRequestCount = Math.max(needLoadingRequestCount, 0) // 做个保护
  if (needLoadingRequestCount === 0) {
    // 关闭loading
    document.getElementById('loading').style.display = 'none'
  }
}

// 添加请求拦截器(post只能接受字符串类型数据)
instance.interceptors.request.use(
  function (config) {
    const token = getToken()
    if (token) {
      config.headers['token'] = token
    }
    // const { icode, time } = getIcode()
    // config.headers.icode = icode
    // config.headers.codeType = time + ''
    // // 在这个位置需要统一的去注入token
    // if (store.getters.token) {
    //   if (isCheckTimeOut()) {
    //     // 登出操作
    //     store.dispatch('user/logout')
    //     return Promise.reject(new Error('您未登录，或者登录已经超时，请先登录'))
    //   }
    //   // 如果token存在 注入token
    //   config.headers.Authorization = `Bearer ${store.getters.token}`
    // }
    // config.headers['Accept-Language'] = store.getters.language
    // showLoading()
    return config
  },
  function (error) {
    // needLoadingRequestCount = 0
    // hideLoading()
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  // 响应包含以下信息data,status,statusText,headers,config
  (response) => {
    // hideLoading()
    const { msg, data } = response.data
    if (msg === 'ok') return data
    ElNotification.closeAll()
    ElNotification({
      title: 'Error',
      message: msg,
      type: 'error',
    })
    return Promise.reject(new Error(msg))
  },
  (err) => {
    // needLoadingRequestCount = 0
    // hideLoading()
    if (err.response && err.response.data && err.response.data.code === 401) {
      // store.dispatch('user/logout')
    }
    httpErrorStatusHandle(err)
    return Promise.reject(err)
  }
)

/**
 * 处理异常
 * @param {*} error
 */
function httpErrorStatusHandle (error) {
  // 处理被取消的请求
  if (axios.isCancel(error)) return console.error('请求的重复请求：' + error.message)
  let message = ''
  if (error && error.response) {
    switch (error.response.status) {
      case 302: message = '接口重定向了！'; break
      case 400: message = '参数不正确！'; break
      case 401: message = '您未登录，或者登录已经超时，请先登录！'; break
      case 403: message = '您没有权限操作！'; break
      case 404: message = `请求地址出错: ${error.response.config.url}`; break // 在正确域名下
      case 408: message = '请求超时！'; break
      case 409: message = '系统已存在相同数据！'; break
      case 500: message = '服务器内部错误！'; break
      case 501: message = '服务未实现！'; break
      case 502: message = '网关错误！'; break
      case 503: message = '服务不可用！'; break
      case 504: message = '服务暂时无法访问，请稍后再试！'; break
      case 505: message = 'HTTP版本不受支持！'; break
      default: message = '异常问题，请联系管理员！'; break
    }
  }
  if (error.message.includes('timeout')) message = '网络请求超时！'
  if (error.message.includes('Network')) message = window.navigator.onLine ? '服务端异常！' : '您断网了！'
  ElNotification.closeAll()
  ElNotification({
    type: 'error',
    message: message || error.message
  })
}

export default instance
