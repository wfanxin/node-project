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

const { proxy } = getCurrentInstance()
const router = useRouter();

// do not use same name with ref
const form = reactive({})

const data = reactive({
    parents: []
})

const props = defineProps({
    id: String
})

const fetch = (id) => {
    proxy.$http.get(`/categories/${id}`).then((res)=>{
      form.name = res.data.name
    })
}

const fetchParents = () => {
    proxy.$http.get('/categories').then((res)=>{
        data.parents = res.data
    })
}

const onSubmit = () => {
  if (props.id) {
    proxy.$http.put(`categories/${props.id}`, form).then(() => {
      router.push('/categories/list')
      ElMessage({
          message: '操作成功',
          type: 'success',
      })
    })
  } else {
    proxy.$http.post('categories', form).then(() => {
      router.push('/categories/list')
      ElMessage({
          message: '操作成功',
          type: 'success',
      })
    })
  }
}

props.id && fetch(props.id)
fetchParents()
</script>
