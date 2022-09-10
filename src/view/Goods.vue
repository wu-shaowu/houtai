<template>
    <div>
        <div>
            <el-form :inline="true" :model="selectData" class="demo-form-inline">
                <el-form-item label="标题">

                    <el-input v-model="selectData.title" placeholder="请输入" />
                </el-form-item>
                <el-form-item label="详情">
                    <el-input v-model="selectData.introduce" placeholder="请输入" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                    <el-button type="primary" @click="unSubmit">返回</el-button>
                </el-form-item>

            </el-form>
        </div>
        <div>
            <el-table :data="dataList.comList" border style="width: 100%">
                <el-table-column prop="id" label="ID" width="180" />
                <el-table-column prop="title" label="标题" width="180" />
                <el-table-column prop="introduce" label="详情" />
            </el-table>
        </div>
        <el-pagination @current-change='currentChange' @size-change="sizeChange" layout="prev, pager, next"
            :total="selectData.count * 2" />
    </div>
    <p>{{count}}</p>
    <p>{{bar}}</p>
    <p>{{main.count10}}</p>
    <button @click="test">测试</button>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed, onBeforeMount ,watch} from 'vue'
import { getGoodsList } from '../request/api'
import { InitData, ListInt } from '../type/good'
import {userMainStore } from '../store/index'
import {storeToRefs} from 'pinia'
export default defineComponent({
    setup() {
        const data = reactive(new InitData())
        const main = userMainStore()
        const {bar ,count} = storeToRefs(main)
        const getdata = async()=>{
            const result = await getGoodsList()
            data.list = result.data
            data.selectData.count = result.data.length
        }
        // getGoodsList().then((res)=>{
        //     data.list=res.data
        //     data.selectData.count=res.data.length
        // }
        // )
        // 截取分页数据
        const dataList = reactive({
            comList: computed(() => {
                return data.list.slice((data.selectData.page - 1) * data.selectData.pagesize, data.selectData.page * data.selectData.pagesize)
            })
        })
        // 获得当前页和页数
        const currentChange = (page: number) => {
            data.selectData.page = page
        }
        const sizeChange = (pagesize: number) => {
            data.selectData.pagesize = pagesize
        }
        // 获得数据
        onBeforeMount(() => {
            getdata()
            // const result = await getGoodsList()
            // data.list = result.data
            // data.selectData.count = result.data.length
            //     console.log(result);


        })
        // 查询
        const onSubmit = () => {
            let arr: ListInt[] = []
            if (data.selectData.title || data.selectData.introduce) {
                if (data.selectData.title) {
                    arr = data.list.filter((v) => {
                        return v.title.indexOf(data.selectData.title) !== -1
                    })
                }
                if (data.selectData.introduce) {
                    arr = data.list.filter((v) => {
                        return v.title.indexOf(data.selectData.introduce) !== -1
                    })
                }

            }
            else {
                arr = data.list
            }
            data.selectData.count = arr.length
            data.list = arr

        }
        //清除查询
        const unSubmit = async()=>{
            data.selectData.title = ""
            data.selectData.introduce = ""
            const result = await getGoodsList()
            data.list = result.data
            data.selectData.count = result.data.length
        }
        watch([()=>data.selectData.title,()=>data.selectData.title],()=>{
            if(data.selectData.title==""&&data.selectData.introduce=="")
            {
                getdata()
            }
        })
        const test =()=>{
            // 单个改变
            // count.value++

            // 多个改变
            // main.$patch(state=>{
            //     state.count++
            //     state.bar = "kan"
            // })

            // 逻辑
            main.change()
        }
        return { ...toRefs(data), currentChange, sizeChange, dataList, onSubmit ,unSubmit,main,count,bar,test}
    }

})
</script>

<style scoped>
</style>