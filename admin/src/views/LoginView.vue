<template>
    <div class="login-container">
        <el-card header="请先登录" class="login-card">
            <el-form label-width="100px">
                <el-form-item label="用户名">
                    <el-input v-model="model.username" />
                </el-form-item>
                <el-form-item label="密码">
                    <el-input type="password" v-model="model.password" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submit">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script setup>
    import { reactive, getCurrentInstance } from 'vue'
    import { useRouter } from 'vue-router'
    const { proxy } = getCurrentInstance() // 获取当前实例

    const router = useRouter() // 获取router

    // 定义变量
    const model = reactive({
        username: '',
        password: ''
    });

    // 定义登录提交函数
    const submit = () => {
        proxy.$http.post('login', model).then((res)=>{
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('username', res.data.username)
            router.push('/')
        }).catch(()=>{})
    }
</script>

<style>
    .login-card{
        width: 25rem;
        margin: 5rem auto;
    }
</style>
