
import state from './state.js'
import getters from './getters.js'
import mutations from './mutations.js'
import actions from './actions'
import Vuex from "vuex";

const saveState = sessionStorage.getItem('vuex') ? JSON.parse(sessionStorage.getItem('vuex')) : state;
//Vuex.Store 构造器选项
const store = new Vuex.Store({
  state:saveState,
  getters,
  mutations,
  actions,
})

export default store


