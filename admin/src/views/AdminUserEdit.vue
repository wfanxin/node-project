<template>
    <div>
        <h1>{{ props.id ? '编辑' : '新建' }}管理员</h1>
        <el-form :model="form" label-width="200px" style="max-width: 1000px">
            <el-form-item label="用户名">
                <el-input v-model="form.username" />
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="password" v-model="form.password" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
    import { reactive, getCurrentInstance, defineProps } from 'vue'
    import { useRouter } from 'vue-router'
    import { ElMessage } from 'element-plus'

    const { proxy } = getCurrentInstance() // 获取当前实例

    const router = useRouter() // 获取router

    // 定义对象变量
    const form = reactive({})

    // 指定props变量
    const props = defineProps({
        id: String
    })

    // 定义获取详情函数
    const fetch = (id) => {
        proxy.$http.get(`rest/admin_users/${id}`).then((res)=>{
            form.username = res.data.username
        })
    }

    // 定义提交函数
    const onSubmit = () => {
        if (props.id) { // 编辑
            proxy.$http.put(`rest/admin_users/${props.id}`, form).then(() => {
                router.push('/admin_users/list')
                ElMessage({
                    message: '操作成功',
                    type: 'success',
                })
            })
        } else { // 新增
            proxy.$http.post('rest/admin_users', form).then(() => {
                router.push('/admin_users/list')
                ElMessage({
                    message: '操作成功',
                    type: 'success',
                })
            })
        }
    }

    // 有id则执行函数
    props.id && fetch(props.id)
</script>
