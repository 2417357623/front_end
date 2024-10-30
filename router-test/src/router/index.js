import { createRouter,createWebHistory } from "vue-router"; 
import HomePage from "@/pages/home.vue";

const routes = [
    {
        path:"/",
        name:"Home",
        component: HomePage
    },
    {
        path:"/destination/:id/:slug",
        name:"Destination.show",
        component:() => import("@/pages/DestinationShow.vue"),
        props:route=>({ ...route.params,id:parseInt(route.params.id)})
    },
    {
        path:"/destination/:id/:slug/:experienceSlug",
        name:"Experience.show",
        component:()=>import("@/pages/ExperienceShow.vue"),
        props:route=> ({...route.params,id:parseInt(route.params.id)})
    }
    
]

const router = createRouter({
    history:createWebHistory(),
    routes:routes,
    linkActiveClass:"vue-router-link",
})

export default router