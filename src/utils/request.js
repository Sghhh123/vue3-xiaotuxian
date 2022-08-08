import axios from 'axios'
import store from '@/store'
import router from '@/router'

export const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'
const instance = axios.create({
  baseURL,
  timeout: 5000
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 拦截业务逻辑
    // 进行请求配置的修改
    // 如果本地又token就在头部携带
    // 1. 获取用户信息对象
    const { profile } = store.state.user
    // 2. 判断是否有token
    if (profile.token) {
      // 3. 设置token
      config.headers.Authorization = `Bearer ${profile.token}`
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

instance.interceptors.response.use(
  (res) => {
    return res.data
  },
  (err) => {
    if (err.response && err.response.state === 401) {
      // 1.清空无效用户信息
      // 2.跳转到登录页
      // 3.跳转需要传参（当前路由地址）给登录页
      store.commit('user/setUser', {})
      // 当前路由地址
      // 组件中：$route.fullPath
      // js模块中：router.currentRoute.fullPath ，是ref响应式数据
      const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
      router.push('/login?redirectUrl=' + fullPath)
    }
    return Promise.reject(err)
  }
)

// 请求工具
export default (url, method, submitData) => {
  // 负责发请求：请求地址，请求方式，提交的数据
  return instance({
    url,
    method,
    // 1.如果是get请求 需要使用params来传递submitData
    // 2.如果不是get请求，需要使用data来传递submitData
    // 3.[]设置一个动态的key，写js表达式，js表达式的执行结果当做key
    // method参数：get，Get，GET
    [method.toLowercase() === 'get' ? 'params' : 'data']: submitData
  })
}
