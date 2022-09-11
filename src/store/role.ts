import {defineStore} from 'pinia'
import { ListInt } from '../type/role'
import {getRoleList} from '../request/api'
// 定义容器
export const roleStore = defineStore('role',{
 state:()=>{
    return {
        roleList:[] as ListInt[]
    }
 },
 getters:{

 },
 actions:{
    async getRole(){
       const result = await getRoleList()
       this.roleList = result.data
    }
 }
})