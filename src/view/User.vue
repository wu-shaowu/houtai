<template>
    <div>
        <div>
            <el-form :inline="true" :model="selectData" class="demo-form-inline">
                <el-form-item label="姓名">

                    <el-input v-model="selectData.nickName" placeholder="请输入" />
                </el-form-item>
                <el-form-item label="角色">
                    <el-select v-model="selectData.role" class="m-2" placeholder="Select" size="large">
                        <el-option v-for="item in roleList" :key="item.roleId" :label="item.roleName"
                            :value="item.roleId" />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onsubmit">查询</el-button>
                    <el-button type="primary" @click="unsubmit">返回</el-button>
                </el-form-item>

            </el-form>
        </div>
        <div>
            <el-table :data="list" border style="width: 100%">
                <el-table-column prop="id" label="ID" width="180" /> >
                <el-table-column prop="nickName" label="姓名" width="180" />
                <el-table-column prop="role" label="角色">
                    <template #default="scope">
                        <el-button v-for="item in scope.row.role" :key="item.role" link type="primary" size="small">
                            {{ item.roleName }}
                        </el-button>
                    </template>


                </el-table-column>
                <el-table-column prop="role" label="操作">
                    <template #default="scope">
                        <el-button link type="primary" size="small" @click="changeUser(scope.row)">
                            编辑
                        </el-button>
                    </template>


                </el-table-column>
            </el-table>
        </div>
    </div>
    <el-dialog v-model="isShow" title="编辑">
        <el-form :model="active">
            <el-form-item label="姓名" label-width="50px">
                <el-input v-model="active.nickName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="角色" label-width="50px">
                <el-select multiple v-model="active.role" placeholder="请选角色">
                  
                        <el-option v-for="item in roleList" :key="item.roleId" :label="item.roleName"
                            :value="item.roleId" />
                 
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="undataUser">更改</el-button>
        <el-button type="primary" @click="quexiao">取消</el-button
        >
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts">
import { fa } from 'element-plus/es/locale';
import { values } from 'lodash';
import { defineComponent, onMounted, reactive, toRefs, watch } from 'vue'
import { getUserList, getRoleList } from '../request/api'
import { LoginData } from '../type/login';
import { InitData, ListInt } from '../type/user';
import { userStore} from '../store/user'
export default defineComponent({
    setup() {
        const user = userStore()
        const data = reactive(new InitData)
        const getuser = async () => {
            const result = await getUserList()
            const result2 = await getRoleList()
            data.list = result.data
            data.roleList = result2.data
            console.log(result);
            console.log(result2);


        }

        onMounted(() => {
            user.getUser()
            getuser();
            console.log(data.selectData);

        })

        const onsubmit = async () => {
            await getuser()
            let arr: ListInt[] = []
            if (data.selectData.nickName || data.selectData.role!) {
                if (data.selectData.nickName) {
                    arr = data.list.filter((v) => {
                        return v.nickName.indexOf(data.selectData.nickName) !== -1
                    })
                }
                if (data.selectData.role) {

                    arr = (data.selectData.nickName ? arr : data.list).filter((v) => {
                        return v.role.find((item) => item.role === data.selectData.role)
                    })
                } else {
                    arr = data.list
                }
                data.list = arr
            }
            // else {
            //     arr = data.list
            // }



        }
        const unsubmit = () => {
            data.selectData.nickName = ""
            data.selectData.role = 0
            getuser();

        }
        watch([() => data.selectData.nickName, () => data.selectData.role], () => {
            if (data.selectData.nickName == "" && data.selectData.role == 0) {
                getuser()
            }
        })
        const changeUser = (row: ListInt) => {
            console.log(row);

            data.active = {
                id: row.id,
                nickName: row.nickName,
                userName: row.userName,
                role:row.role.map((v:any)=>v.role||v.roleId)
            }
            // row.role.forEach((item)=>{
            //     data.active.role.push(item.role)
            // })
          
            console.log(data.active);

            data.isShow = true


        }
        const undataUser =()=>{
            let obj:any=data.list.find((v)=>v.id==data.active.id)
            obj.nickName=data.active.nickName
            obj.role =data.roleList.filter(v=>data.active.role.indexOf(v.roleId)!==-1)
            data.list.forEach((item,i)=>{
                if(item.id==obj.id){
                    data.list[i]=obj
                }
            })
            data.isShow = false
        }
        const quexiao =()=>{
          data.isShow=false
            
        }
        return { ...toRefs(data), onsubmit, unsubmit, changeUser ,undataUser,quexiao,user}
    }
})
</script>

<style scoped>
</style>