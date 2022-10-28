<template>
    <div>
        <h1>分类列表</h1>
        <el-table :data="data.tableData" style="width: 100%">
            <el-table-column prop="_id" label="ID" width="300" />
            <el-table-column prop="name" label="分类名称" />
            <el-table-column fixed="right" label="Operations" width="120">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click.prevent="edit(scope.row)">Edit</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import { reactive, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
const { proxy } = getCurrentInstance()

const router = useRouter();

const data = reactive({
    tableData: []
})
const fetch = () => {
    proxy.$http.get('/categories').then((res)=>{
        data.tableData = res.data
    })
}
fetch()

const edit = (row) => {
    router.push('/categories/edit/'+row._id)
}

</script>