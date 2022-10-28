<template>
    <div>
        <h1>{{ props.id ? '编辑' : '新建' }}分类</h1>
        <el-form :model="form" label-width="120px">
            <el-form-item label="名称">
            <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item>
            <el-button type="primary" @click="onSubmit">Create</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { reactive, getCurrentInstance, defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const { proxy } = getCurrentInstance()
const router = useRouter();

// do not use same name with ref
const form = reactive({
  name: ''
})

const props = defineProps({
    id: String
})

const fetch = (id) => {
    proxy.$http.get(`/categories/${id}`).then((res)=>{
      form.name = res.data.name
    })
}

const onSubmit = () => {
  proxy.$http.post('categories', {
    name: form.name
  }).then(() => {
    router.push('/categories/list')
    ElMessage({
        message: '操作成功',
        type: 'success',
    })
  })
}

props.id && fetch(props.id)

</script>
