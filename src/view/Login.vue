<template>
    <!-- <div>
        <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px"
            class="demo-ruleForm">
            <el-form-item label="账号：" prop="username">
                <el-input v-model="ruleForm.username" autocomplete="off" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
                <el-button @click="resetForm(ruleFormRef)">重置</el-button>
            </el-form-item>
        </el-form>
    </div> -->
    <div class="login">
    <div class="form-cls">
        <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            status-icon
            :rules="rules"
            label-width="70px"
        >
          <h2>后台管理系统</h2>
          <el-form-item label="用户名:" prop="username">
            <el-input v-model="ruleForm.username" type="text" autocomplete="off" />
          </el-form-item>

          <el-form-item label="密码:" prop="password">
            <el-input v-model="ruleForm.password" type="password" autocomplete="off"/>
          </el-form-item>

          <el-form-item>
            <el-button class="login-btn" type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
            <el-button class="login-btn" @click="resetForm(ruleFormRef)">重置</el-button>
          </el-form-item>

        </el-form>

      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'
import { LoginData } from '../type/login'
import { login } from '../../src/request/api'
import { useRouter } from 'vue-router'
import type { FormInstance } from 'element-plus'



export default defineComponent({
    setup() {
        const data = reactive(new LoginData())

        const rules = {
            username: [+
                { required: true, message: 'Please input Activity username', trigger: 'blur' },
            { min: 3, max: 10, message: 'Length should be 3 to 10', trigger: 'blur' },
            ],
            password: [
                { required: true, message: 'Please input Activity password', trigger: 'blur' },
                { min: 3, max: 10, message: 'Length should be 3 to 10', trigger: 'blur' },
            ],
        }
        //登录
        const ruleFormRef = ref<FormInstance>()
        const router = useRouter()
        const submitForm = (formEl: FormInstance | undefined) => {
            if (!formEl) return
            // 表单验证
            formEl.validate(async (valid) => {
                console.log(valid);
                if (valid) {

                const result = await login(data.ruleForm)
                    if (result.data.success) {
                        localStorage.setItem("token", result.data.token)
                        router.push("/")
                        console.log("登录成功");
                        
                    }
                } else {
                    console.log('error submit!')
                    return false
                }
            })
        }
        // 重置
        const resetForm = (formEl: FormInstance | undefined) => {
            if (!formEl) return
            formEl.resetFields()
        }

        return { ...toRefs(data), submitForm, resetForm, rules, ruleFormRef }
    }
})
</script>

<style scoped>

    .login{
      width: 100%;
      height: 100vh;
      background-image: url("../assets/bg.jpg");
    }
  
    .form-cls{
      padding: 50px;
      width: 400px;
      margin: 0 auto;
      background-color: white;
      position: relative;
      top:200px;
      border-radius: 4px;
    }
  
    .login-btn{
      width: 48%;
    }
  
    h2{
      text-align: center;
      margin-bottom: 20px;
    }
  </style>