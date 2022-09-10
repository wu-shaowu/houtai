import {RouteRecordRaw} from 'vue-router'

export const routes:Array<RouteRecordRaw> = [{
    path: '/login',
    name: 'login',
    component: () => import('../view/Login.vue'),
   
},{
    path: '/',
    name: 'home',
    component: () => import('../view/Home.vue'),
    redirect:"goods",
    children:[
        {
            path:'/goods',
            name:'goods',
            meta:{
                isShow:true,
                title:"商品列表"
            },
            component:()=>import('../view/Goods.vue')
        },
        {
            path:'/user',
            name:'user',
            meta:{
                isShow:true,
                title:"用户列表"
            },
            component:()=>import('../view/User.vue')
        },
        {
            path:'/role',
            name:'role',
            meta:{
                isShow:true,
                title:"角色列表"
            },
            component:()=>import('../view/Role.vue')
        },
        {
            path:'/authority',
            name:'authority',
            meta:{
                isShow:false,
                title:"权限列表"
            },
            component:()=>import('../view/Authority.vue')
        }
    ]
}
]

