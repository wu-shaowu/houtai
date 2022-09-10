import { fa } from "element-plus/es/locale"

export interface ListInt{
    id:number
    nickName:string
    role:RoleInt[]
    userName:string
}
 interface RoleInt{
    role:number
    roleName:string
}
interface selectDataInt {
    role:number,
    nickName:string
}
interface RoleInt{
    authority:number[]
    roleId:number
    roleName:string       
}
interface ActiveInt{
    id:number
    nickName:string
    role:number[]
    userName:string
}
export class InitData{
    selectData:selectDataInt={   //搜索信息
        nickName:"",
        role:0
    }
    list:ListInt[]=[]  //用户信息
    roleList:RoleInt[]=[]//角色信息
    isShow:boolean=false 
    active:ActiveInt={  //编辑选中的对象
        id:0,
        nickName:"",
        role:[],
        userName:""
    }
}