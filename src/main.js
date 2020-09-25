import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex/store'
import axios from 'axios'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  // code to run when our app created
  // This will be used to automatic login
  created() {
    const userString = localStorage.getItem('user')
    if (userString) {
      const userData = JSON.parse(userString)
      this.$store.commit('SET_USER_DATA', userData)
    }
    // allow us to intercept axios request
    axios.interceptors.response.use(
      response => response,
      error => {
        // Meaning user doesn't have proper credentials to access
        // The page they trying to
        if (error.response.status === 401) {
          this.$store.dispatch('logout')
        }
        // Creates a new rejected promise for the provided reason
        // we returning a rejected promise as the error been the reason
        return Promise.reject(error)
      }
    )
  },
  render: h => h(App)
}).$mount('#app')