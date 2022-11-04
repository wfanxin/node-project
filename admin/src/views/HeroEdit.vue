<template>
    <div>
        <h1>{{ props.id ? '编辑' : '新建' }}英雄</h1>
        <el-form :model="form" label-width="150px" style="max-width: 1000px">
            <el-tabs v-model="activeName" type="border-card">
                <el-tab-pane label="基础信息" name="基础信息">
                    <el-form-item label="名称">
                        <el-input v-model="form.name" />
                    </el-form-item>
                    <el-form-item label="称号">
                        <el-input v-model="form.title" />
                    </el-form-item>
                    <el-form-item label="类型">
                        <el-select v-model="form.categories" multiple>
                            <el-option :key="item._id" :label="item.name" :value="item._id" v-for="item in data.categories" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="难度">
                        <el-rate :max="10" show-score v-model="form.scores.difficult" />
                    </el-form-item>
                    <el-form-item label="技能">
                        <el-rate :max="10" show-score v-model="form.scores.skills" />
                    </el-form-item>
                    <el-form-item label="攻击">
                        <el-rate :max="10" show-score v-model="form.scores.attack" />
                    </el-form-item>
                    <el-form-item label="生存">
                        <el-rate :max="10" show-score v-model="form.scores.survive" />
                    </el-form-item>
                    <el-form-item label="顺风出装">
                        <el-select v-model="form.items1" multiple>
                            <el-option :key="item._id" :label="item.name" :value="item._id" v-for="item in data.items" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="逆风出装">
                        <el-select v-model="form.items2" multiple>
                            <el-option :key="item._id" :label="item.name" :value="item._id" v-for="item in data.items" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="使用技巧">
                        <el-input type="textarea" v-model="form.usageTips" />
                    </el-form-item>
                    <el-form-item label="对抗技巧">
                        <el-input type="textarea" v-model="form.battleTips" />
                    </el-form-item>
                    <el-form-item label="团战思路">
                        <el-input type="textarea" v-model="form.teamTips" />
                    </el-form-item>
                    <el-form-item label="头像">
                        <el-upload
                            class="avatar-uploader"
                            :action="uploadUrl"
                            :headers="getAuthHeaders"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                        >
                            <img v-if="form.avatar" :src="form.avatar" class="avatar" />
                            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                        </el-upload>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="技能" name="技能">
                    <el-button @click="form.skills.push({})"><el-icon><Plus /></el-icon>添加技能</el-button>
                    <el-row type="flex" style="flex-wrap: wrap;">
                        <el-col :md="12" v-for="(item, i) in form.skills" :key="i">
                            <el-form-item label="名称">
                                <el-input v-model="item.name" /> 
                            </el-form-item>
                            <el-form-item label="图标">
                                <el-upload
                                    class="avatar-uploader"
                                    :action="uploadUrl"
                                    :headers="getAuthHeaders"
                                    :show-file-list="false"
                                    :on-success="res => item.icon = res.url"
                                >
                                    <img v-if="item.icon" :src="item.icon" class="avatar" />
                                    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                                </el-upload>
                            </el-form-item>
                            <el-form-item label="描述">
                                <el-input type="textarea" v-model="item.description" />
                            </el-form-item>
                            <el-form-item label="小提示">
                                <el-input type="textarea" v-model="item.tips" />
                            </el-form-item>
                            <el-form-item>
                                <el-button size="small" type="danger" @click="form.skills.splice(i, 1)">删除</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
            
            <el-form-item style="margin-top: 20px;">
                <el-button type="primary" @click="onSubmit">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
    import { reactive, getCurrentInstance, defineProps, ref } from 'vue'
    import { useRouter } from 'vue-router'
    import { ElMessage } from 'element-plus'
    import { Plus } from '@element-plus/icons-vue'
    import { uploadUrl, getAuthHeaders } from '../upload'

    const { proxy } = getCurrentInstance() // 获取当前实例

    const router = useRouter() // 获取router

    // 定义对象变量
    const form = reactive({
        scores: {},
        skills: []
    })

    // 指定props变量
    const props = defineProps({
        id: String
    })

    // 定义获取详情函数
    const fetch = (id) => {
        proxy.$http.get(`rest/heros/${id}`).then((res)=>{
            form.name = res.data.name
            form.avatar = res.data.avatar
            form.title = res.data.title
            form.categories = res.data.categories
            form.scores = res.data.scores
            form.items1 = res.data.items1
            form.items2 = res.data.items2
            form.usageTips = res.data.usageTips
            form.battleTips = res.data.battleTips
            form.teamTips = res.data.teamTips
            form.skills = res.data.skills
        })
    }

    const handleAvatarSuccess = (res) => {
        form.avatar = res.url
    }

    // 定义提交函数
    const onSubmit = () => {
        if (props.id) {
            proxy.$http.put(`rest/heros/${props.id}`, form).then(() => {
                router.push('/heros/list')
                ElMessage({
                    message: '操作成功',
                    type: 'success',
                })
            })
        } else {
            proxy.$http.post('rest/heros', form).then(() => {
                router.push('/heros/list')
                ElMessage({
                    message: '操作成功',
                    type: 'success',
                })
            })
        }
    }

    // 定义数据变量
    const data = reactive({
        categories: [],
        items: []
    })

    // 定义获取类型函数
    const fetchCategories = () => {
        proxy.$http.get('rest/categories').then((res)=>{
            data.categories = res.data
        })
    }

    // 定义获取物品函数
    const fetchItems = () => {
        proxy.$http.get('rest/items').then((res)=>{
            data.items = res.data
        })
    }

    let activeName = ref('基础信息')

    // 执行函数
    fetchCategories()

    // 执行函数
    fetchItems()

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
