<template>
    <div>
        <h1>{{ props.id ? '编辑' : '新建' }}分类</h1>
        <el-form :model="form" label-width="200px" style="max-width: 400px">
            <el-form-item label="上级分类">
                <el-select v-model="form.parent">
                    <el-option :key="item._id" :label="item.name" :value="item._id" v-for="item in data.parents" />
                </el-select>
            </el-form-item>
            <el-form-item label="名称">
                <el-input v-model="form.name" />
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

    // 定义对象变量
    const data = reactive({
        parents: []
    })

    // 指定props变量
    const props = defineProps({
        id: String
    })

    // 定义获取详情函数
    const fetch = (id) => {
        proxy.$http.get(`rest/categories/${id}`).then((res)=>{
            form.name = res.data.name
            form.parent = res.data.parent
        })
    }

    // 定义获取上级分类函数
    const fetchParents = () => {
        proxy.$http.get('rest/categories').then((res)=>{
            data.parents = res.data
        })
    }

    // 定义提交函数
    const onSubmit = () => {
        if (props.id) { // 编辑
            proxy.$http.put(`rest/categories/${props.id}`, form).then(() => {
                router.push('/categories/list')
                ElMessage({
                    message: '操作成功',
                    type: 'success',
                })
            })
        } else { // 新增
            proxy.$http.post('rest/categories', form).then(() => {
                router.push('/categories/list')
                ElMessage({
                    message: '操作成功',
                    type: 'success',
                })
            })
        }
    }

    // 有id则执行函数
    props.id && fetch(props.id)

    // 执行函数
    fetchParents()
</script>
