<template>
    <div>
        <h1>{{ props.id ? '编辑' : '新建' }}物品</h1>
        <el-form :model="form" label-width="200px" style="max-width: 400px">
            <el-form-item label="名称">
                <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="图标">
                <el-upload
                    class="avatar-uploader"
                    :action="proxy.$http.defaults.baseURL + '/upload'"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                >
                    <img v-if="form.icon" :src="form.icon" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                </el-upload>
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
    import { Plus } from '@element-plus/icons-vue'

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
        proxy.$http.get(`rest/items/${id}`).then((res)=>{
            form.name = res.data.name
            form.icon = res.data.icon
        })
    }

    const handleAvatarSuccess = (res) => {
        form.icon = res.url
    }

    // 定义提交函数
    const onSubmit = () => {
        if (props.id) {
            proxy.$http.put(`rest/items/${props.id}`, form).then(() => {
                router.push('/items/list')
                ElMessage({
                    message: '操作成功',
                    type: 'success',
                })
            })
        } else {
            proxy.$http.post('rest/items', form).then(() => {
                router.push('/items/list')
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

<style>
    .avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed var(--el-border-color);
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition: var(--el-transition-duration-fast);
    }

    .avatar-uploader .el-upload:hover {
        border-color: var(--el-color-primary);
    }

    .el-icon.avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        text-align: center;
    }
</style>
