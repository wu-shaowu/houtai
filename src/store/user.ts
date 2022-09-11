import {defineStore} from 'pinia'
import { ListInt } from '../type/role'
import {getUserList} from '../request/api'
// 定义容器
export const userStore = defineStore('user',{
 state:()=>{
    return {
        userList:[] as ListInt[]
    }
 },
 getters:{

 },
 actions:{
    async getUser(){
       const result = await getUserList()
       this.userList = result.data
    }
 }
})