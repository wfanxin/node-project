<template>
    <div>
        <h1>{{ props.id ? '编辑' : '新建' }}文章</h1>
        <el-form :model="form" label-width="200px" style="max-width: 400px">
            <el-form-item label="所属分类">
                <el-select v-model="form.categories" multiple>
                    <el-option :key="item._id" :label="item.name" :value="item._id" v-for="item in data.categories" />
                </el-select>
            </el-form-item>
            <el-form-item label="标题">
                <el-input v-model="form.title" />
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
        categories: []
    })

    // 指定props变量
    const props = defineProps({
        id: String
    })

    // 定义获取详情函数
    const fetch = (id) => {
        proxy.$http.get(`rest/articles/${id}`).then((res)=>{
            form.title = res.data.title
            form.categories = res.data.categories
        })
    }

    // 定义获取分类函数
    const fetchCategories = () => {
        proxy.$http.get('rest/categories').then((res)=>{
            data.categories = res.data
        })
    }

    // 定义提交函数
    const onSubmit = () => {
        if (props.id) { // 编辑
            proxy.$http.put(`rest/articles/${props.id}`, form).then(() => {
                router.push('/articles/list')
                ElMessage({
                    message: '操作成功',
                    type: 'success',
                })
            })
        } else { // 新增
            proxy.$http.post('rest/articles', form).then(() => {
                router.push('/articles/list')
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
    fetchCategories()
</script>
