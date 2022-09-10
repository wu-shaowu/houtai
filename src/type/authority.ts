export interface ListInt {
    name:string
    roleId:number
    roleList?:ListInt[]
    viewRole?:string
}
export class InitDate{
    id:number
    authority:number[]
    constructor(id:number,authority:number[],treeRef:any){
        this.id = id,
        this.authority = authority,
        this.treeRef = treeRef
    }
    list:ListInt[]=[]
    // treeRef:any=null
    treeRef:any
}