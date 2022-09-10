<template>
    <div>
        <el-tree ref="treeRef" :data="list" show-checkbox node-key="roleId" :check-strictly="true"
            :default-checked-keys="authority" :props="{
                children: 'roleList',
                label: 'name',
            }" />
        <el-button @click="updata">确认修改</el-button>
    </div>

    <!-- <el-tre
        :data="list"
        show-checkbox
        node-key="roleId"
        :check-strictly="true"
        :default-checked-keys="authority"
        ref="tree_ref"
        :props="{
          children: 'roleList',
          label: 'name'
        }"
    /> -->

</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted ,ref} from 'vue'
import { useRoute } from 'vue-router'
import { InitDate } from '../type/Authority'
import { getAuthorityList } from '../request/api'
import { functions } from 'lodash'
export default defineComponent({
    setup() {
        const route = useRoute()
        let treeRef:any = ref(null);
        const getdata = async () => {
            const result = await getAuthorityList()
            data.list = result.data

        }
        onMounted(() => {

            getdata()
          
            
            
            
        })
        const params: any = route.params
        const data = reactive(new InitDate(params.id, params.authority,null))
        const updata = () => {
            
            
            console.log(treeRef.getCheckedKeys().sort(function(a:number,b:number)
            {return a-b}));

        }
        return { ...toRefs(data), updata ,treeRef}
    }
})

</script>

<style scoped>
</style>