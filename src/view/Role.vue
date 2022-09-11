<template>
    <div>

        <div>
            <el-form :inline="true">
                <el-form-item label="">
                    <el-button type="primary" @click="addRole">添加角色 </el-button>
                </el-form-item>
            </el-form>

            <el-table :data="role.roleList" border style="width: 100%">
                <el-table-column prop="roleId" label="ID" width="180" /> >
                <el-table-column prop="roleName" label="角色名" width="180" />
                <el-table-column prop="authority" label="操作">
                    <template #default="scope">
                        <el-button link type="primary" size="small" @click="changeRole(scope.row)">
                            修改权限
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, toRefs, reactive } from 'vue'
import { getRoleList } from '../request/api'
import { InitDate,ListInt } from '../type/role'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
import {roleStore } from '../store/role'
export default defineComponent({
    setup() {
        const role = roleStore()
        const router = useRouter()
        const data = reactive(new InitDate())
        const getRoleData = async () => {
            const result = await getRoleList()
            console.log(result);
            data.list = result.data
        }
        const addRole = () => {
          
            ElMessageBox.prompt('输入角色名', '添加', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',

            })
                .then(({ value }) => {
                    if(value ){
                        data.list.push({roleId:data.list.length+1,roleName:value,authority:[]})
                    }
                    ElMessage({
                        type: 'success',
                        message: `更改为:${value}`,
                    })
                })
                .catch(() => {
                    ElMessage({
                        type: 'info',
                        message: '输入错误',
                    })
                })

        }
        const changeRole = (row:ListInt) => {
            router.push({
                name:"authority",
                params:{
                    id:row.roleId,
                    authority:row.authority

                }
            })
        }
        onMounted(() => {
            role.getRole();
            console.log(role.roleList)
            getRoleData()
        })

        return { ...toRefs(data), addRole, changeRole ,role}
    }
})
</script>

<style scoped>
</style>