<template>
    <div>
        <h1>物品列表</h1>
        <el-table :data="data.tableData" style="width: 100%">
            <el-table-column prop="_id" label="ID" width="300" />
            <el-table-column prop="name" label="物品名称" />
            <el-table-column fixed="right" label="操作" width="120">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click.prevent="edit(scope.row)">编辑</el-button>
                    <el-button link type="primary" size="small" @click.prevent="remove(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import { reactive, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
const { proxy } = getCurrentInstance()

const router = useRouter();

const data = reactive({
    tableData: []
})
const fetch = () => {
    proxy.$http.get('rest/items').then((res)=>{
        data.tableData = res.data
    })
}
fetch()

const edit = (row) => {
    router.push('/items/edit/'+row._id)
}

const remove = (row) => {
    ElMessageBox.confirm(
        `是否确定要删除分类 "${row.name}"`,
        '提示',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
    .then(() => {
        proxy.$http.delete('rest/items/'+row._id).then(()=>{
            ElMessage({
                message: '删除成功',
                type: 'success',
            })
            fetch()
        })
    })
    .catch(() => {})
}

</script>