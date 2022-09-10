<template>
  <div class="common-layout top">
    <el-container>
      <el-header height="80px">
        <el-row :gutter="20">
          <el-col :span="4">
            <img src="../assets/logo.png" alt="">
          </el-col>
          <el-col :span="16">
            <h2>
              后台管理系统
            </h2>
          </el-col>
          <el-col :span="4" class="logout" @click="loginOut">
            退出登录
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo"
            :default-active="active" text-color="#fff" router> 
            <!-- router开启路由模式 ，用index跳转-->
            <el-menu-item :index="item.path" v-for="(item, index) in list" :key="item.path">
              <span>{{ item.meta.title }}</span>
            </el-menu-item>

          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
  <p>{{count}}</p>
  <p>{{bar}}</p>
  <p>{{ main.bar }}</p>
</template>

<script lang="ts">
import { defineComponent,onMounted,computed } from 'vue'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import { useRouter,useRoute } from 'vue-router'
import {userMainStore } from '../store/index'
import {storeToRefs} from 'pinia'
export default defineComponent({
  setup() {
    const router = useRouter()
    const route = useRoute()
    const list = router.getRoutes().filter(v => v.meta.isShow)

   const main = userMainStore()
   const { count ,bar } = storeToRefs(main)
    onMounted(() => {
      // console.log(store.state.count)
      console.log(main.count)
    })
// 类型为 number
    console.log(list);

    const handleOpen = (key: string, keyPath: string[]) => {
      console.log(key, keyPath)
    }
    const handleClose = (key: string, keyPath: string[]) => {
      console.log(key, keyPath)
    }
    const loginOut = ()=>{
      localStorage.removeItem('token')
      router.push('/login')
    }
    return {  list ,active:route.path,loginOut,count,bar,main}
  }
})
</script>

<style lang="less" scoped>
.top {
  // position:absolute;
  // top: 0;
  // left: 0;
  height: 80px;
  background-color: #666;
  line-height: 80px;

  img {
    height: 80px;
    width: 80px;
  }

  h2,
  .logout {
    text-align: center;
    height: 80px;
    line-height: 80px;
    color: white;
  }
}

.el-aside {
  .el-menu {
    // height: calc( 100vh-80p );
    height: 100vh
  }

}
</style>