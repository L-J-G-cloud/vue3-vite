import { nextTick } from 'vue'
export default {
  LogOut({ commit }) {
    return new Promise((resolve) => {
      commit('setAccount', '')
      resolve()
    })
  },
  changeload({ commit }) {
    commit('toReload', false)
    return nextTick(function () {
      commit('toReload', true)
    })
  },
}