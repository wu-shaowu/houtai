import {defineStore} from 'pinia'
// 定义容器
export const userMainStore = defineStore('main',{
 state:()=>{
    return {
        count:100,
        bar:"bar",
    }
 },
 getters:{
    count10(state){
        return state.count*10
    }
 },
 actions:{
    change(){
        this.count++,
        this.bar="jjjj"
    }
 }
})