import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import cart from './modules/cart'
import category from './modules/category'
import user from './modules/user'

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    cart,
    category,
    user
  },
  Plugin: [
    createPersistedState({
      key: 'vue3-xiaotu-vuex',
      // 指定存储的模块
      paths: ['user', 'cart']
    })
  ]
})
