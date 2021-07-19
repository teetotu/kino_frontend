import {createRouter, createWebHistory} from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import Location from '../views/Location.vue'
import SignUp from '../views/Signup.vue'
import Login from '../views/Login.vue'
import Account from '../views/Account.vue'
import {resolveComponent} from 'vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/signup',
        name: 'SignUp',
        component: SignUp,

        meta: {
            disableIfAuthenticated: true
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,

        meta: {
            disableIfAuthenticated: true
        }
    },
    {
        path: '/account',
        name: 'Account',
        component: Account,

        meta: {
            requireLogin: true
        }
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/:location_slug/',
        name: 'Location',
        component: Location
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated) {
        next({name: 'Login', query: {to: to.path}});
    } else {
        next()
    }
})
export default router
