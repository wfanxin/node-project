<template>
    <div>
        <h1>{{ props.id ? '编辑' : '新建' }}广告位</h1>
        <el-form :model="form" label-width="200px">
            <el-form-item label="名称">
                <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="广告">
                <el-button @click="form.items.push({})"><el-icon><Plus /></el-icon>添加广告</el-button>
                <el-col>
                    <el-row type="flex" style="flex-wrap: wrap;">
                        <el-col :md="12" v-for="(item, i) in form.items" :key="i">
                            <el-form-item label="跳转链接（URL）">
                                <el-input v-model="item.url" /> 
                            </el-form-item>
                            <el-form-item label="图片" style="margin-top: 10px;">
                                <el-upload
                                    class="avatar-uploader"
                                    :action="proxy.$http.defaults.baseURL + '/upload'"
                                    :show-file-list="false"
                                    :on-success="res => item.image = res.url"
                                >
                                    <img v-if="item.image" :src="item.image" class="avatar" />
                                    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                                </el-upload>
                            </el-form-item>
                            <el-form-item>
                                <el-button size="small" type="danger" @click="form.items.splice(i, 1)">删除</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-col>
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
    const form = reactive({
        items: []
    })

    // 指定props变量
    const props = defineProps({
        id: String
    })

    // 定义获取详情函数
    const fetch = (id) => {
        proxy.$http.get(`rest/ads/${id}`).then((res)=>{
            form.name = res.data.name
            form.items = res.data.items
        })
    }

    // 定义提交函数
    const onSubmit = () => {
        if (props.id) { // 编辑
            proxy.$http.put(`rest/ads/${props.id}`, form).then(() => {
                router.push('/ads/list')
                ElMessage({
                    message: '操作成功',
                    type: 'success',
                })
            })
        } else { // 新增
            proxy.$http.post('rest/ads', form).then(() => {
                router.push('/ads/list')
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
        width: 100px;
        height: 100px;
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
        width: 100px;
        height: 100px;
        text-align: center;
    }
</style>
