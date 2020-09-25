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
    },
    // CLEAR_USER_DATA(state) {
    //   // clear user state
    //   state.user = null
    //   // clear local storage
    //   localStorage.removeItem('user')
    //   axios.defaults.headers.common['Authorization'] = null
    // }
    CLEAR_USER_DATA(state) {
      // clear local storage
      localStorage.removeItem('user')
      // Reloads the current page and force refresh and since vuex state and axios header settings
      // will not survive the refresh
      location.reload()
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
    },
    login({
      commit
    }, credentials) {
      return axios
        .post('//localhost:3000/login', credentials)
        .then(({
          data
        }) => {
          commit('SET_USER_DATA', data)
          console.log('this is the data', data)
        })
    },
    logout({
      commit
    }) {
      commit('CLEAR_USER_DATA')
    }
  },
  getters: {
    loggedIn(state) {
      // !! will return true or false of the value
      return !!state.user
    }
  }
})