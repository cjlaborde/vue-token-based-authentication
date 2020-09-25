import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      // save state
      state.user = userData,
        // save to local storage
        localStorage.setItem('user', JSON.stringify(userData))
      // set the header
      axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`
    }
  },
  actions: {
    register({
      commit
    }, credentials) {
      return axios
        .post('//localhost:3000/register', credentials)
        .then(({
          data
        }) => {
          commit('SET_USER_DATA', data)
          console.log('this is the data', data)
        })
    }
  }
})