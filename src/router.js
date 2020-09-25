import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Dashboard from './views/Dashboard.vue'
import RegisterUser from './views/RegisterUser.vue'
import LoginUser from './views/LoginUser.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterUser
    },
    {
      path: '/login',
      name: 'login',
      component: LoginUser
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   // check if user logged in or not
//   const loggedIn = localStorage.getItem('user')

//   // redirects to homepage
//   if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
//     next('/')
//   }
//   // When the to route doesn't require authentication
//   next()
// })

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('user')

  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next('/')
  }
  next()
})

export default router
// // matched = give us an array of Records that match the "to" route
// // some = determines whether the specified callback function returns true for any element of an array
// if (to.matched.some(record => record.meta.requiresAuth)) {
//   // if user not loggedIn redirect them to the homepage.
//   if (!loggedIn) {
//     next('/')
//   } else {
//     // if our route required auth and we do have loggin user
//     // We will call next() to continue navigating to the "to" route
//     next()
//   }
// } else {
//   // When the to route doesn't require authentication
//   next()
// }