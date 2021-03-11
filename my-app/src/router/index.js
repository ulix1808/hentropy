import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Dashboard.vue'
import Login from '../components/Login.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            component: Login
        },
        {
            path: '/home',
            component: Home
        }
        
    ],
    linkActiveClass: "active",
    mode: "history"
})