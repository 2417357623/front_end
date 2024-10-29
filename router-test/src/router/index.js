import { createRouter,createWebHistory } from "vue-router"; 
import HomePage from "@/components/home.vue";

const routes = [
    {
        path:"/",
        name:"Home",
        component: HomePage
    },
    {
        path:'/about',
        name:"About",
        component:() => import("@/components/about.vue")
    },
    {
        path:'/brazil',
        name:"Brazil",
        component:() => import("@/components/brazil.vue")
    },
    {
        path:'/panama',
        name:"panama",
        component:() => import("@/components/panama.vue")
    },
    {
        path:'/hawaii',
        name:"hawaii",
        component:() => import("@/components/hawaii.vue")
    },
    
]

const router = createRouter({
    history:createWebHistory(),
    routes:routes
})

export default router