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
    }
]

const router = createRouter({
    history:createWebHistory(),
    routes:routes
})

export default router