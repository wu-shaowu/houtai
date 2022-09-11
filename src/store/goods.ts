import {defineStore} from 'pinia'
import {ListInt} from '../type/good'
import {getGoodsList} from '../request/api'
// 定义容器
export const goodsStore = defineStore('goods',{
 state:()=>{
    return {
       list:[] as ListInt[]
    }
 },
 getters:{

 },
 actions:{
    async getGood(){
        const result = await getGoodsList()
        this.list = result.data
        console.log(this.list);
        
    }
 }
})