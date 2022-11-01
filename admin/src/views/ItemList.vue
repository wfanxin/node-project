<template>
    <div>
        <h1>物品列表</h1>
        <el-table :data="data.tableData" style="width: 100%">
            <el-table-column prop="_id" label="ID" width="300" />
            <el-table-column prop="name" label="物品名称" />
            <el-table-column prop="icon" label="图标">
                <template #default="scope">
                    <!-- <img :src="scope.row.icon" style="height: 50px;"> -->
                    <div class="demo-image__preview">
                    <el-image
                        style="height: 50px;"
                        :src="scope.row.icon"
                        :preview-src-list="[scope.row.icon]"
                        :initial-index="1"
                        fit="fill"
                    />
                    </div>
                </template>
            </el-table-column>
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

    const { proxy } = getCurrentInstance() // 获取当前实例

    const router = useRouter() // 获取router

    // 定义对象变量
    const data = reactive({
        tableData: []
    })

    // 定义列表函数
    const fetch = () => {
        proxy.$http.get('rest/items').then((res)=>{
            data.tableData = res.data
        })
    }
    
    // 定义编辑函数
    const edit = (row) => {
        router.push(`/items/edit/${row._id}`)
    }

    // 定义删除函数
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
            proxy.$http.delete(`rest/items/${row._id}`).then(()=>{
                ElMessage({
                    message: '删除成功',
                    type: 'success',
                })
                fetch()
            })
        })
        .catch(() => {})
    }

    // 执行函数
    fetch()
</script>

<style>
    /* 解决预览在编辑下面的问题 */
    .el-table .el-table__cell {
        position: static !important;
    }
</style>