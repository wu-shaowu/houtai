import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'

const router = createRouter({
    history: createWebHistory(),
    routes:routes
})

router.beforeEach((to, from, next) => {
   const token:string|null =localStorage.getItem('token')
    if(!token&&to.path!=='/login'){
        next('/login')
    }else{
        next()
    }
})
export default router
