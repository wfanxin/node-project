<template>
    <div>
        <h1>{{ props.id ? '编辑' : '新建' }}物品</h1>
        <el-form :model="form" label-width="200px" style="max-width: 400px">
            <el-form-item label="名称">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="图标">
              <el-input v-model="form.icon" />
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

const props = defineProps({
    id: String
})

const fetch = (id) => {
    proxy.$http.get(`rest/items/${id}`).then((res)=>{
      form.name = res.data.name
    })
}

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

props.id && fetch(props.id)
</script>
