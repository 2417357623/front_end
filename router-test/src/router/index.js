import { createRouter,createWebHistory } from "vue-router"; 
import HomePage from "@/pages/home.vue";
import sourceData from "@/data.json";

const routes = [
    {
        path:"/",
        name:"Home",
        component: HomePage
    },
    {
        path:"/destination/:id/:slug/:experienceSlug",
        name:"Experience.show",
        component:()=>import("@/pages/ExperienceShow.vue"),
        props:route=> ({...route.params,id:parseInt(route.params.id)})
    },
    {
        path:"/destination/:id/:slug",
        name:"Destination.show",
        component:() => import("@/pages/DestinationShow.vue"),
        props:route=>({ ...route.params,id:parseInt(route.params.id)}),
        beforeEnter:(to,from)=>{
            const exist = sourceData.destinations.find(
                (destination) => destination.id === parseInt(to.params.id)
            )
            if(!exist) return {
                name:'NotFound'
            }
        },
        children:[
            {
                path:":experienceSlug",
                name:"Experience.show",
                component:()=>import("@/pages/ExperienceShow.vue"),
                props:route=> ({...route.params,id:parseInt(route.params.id)})
            }
        ]
    },
    {
        path:"/:pathMatch(.*)*",
        name:"NotFound",
        component:() => import("@/pages/NotFound.vue")
    }
    
]

const router = createRouter({
    history:createWebHistory(),
    routes:routes,
    linkActiveClass:"vue-router-link",
    scrollBehavior(to,from,savedPosition){
        if (to.matched.length > 1) {
            // Return `null` to prevent any scrolling for nested routes
            return null;
        }else{
            return savedPosition || {top:0 , behavior:"smooth"}
        }
    }
})

export default router