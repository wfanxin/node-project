<template>
    <el-container class="layout-container-demo" style="height: 100vh;">
        <el-aside width="220px">
            
            <el-scrollbar>
                <div class="title">后台管理</div>
                <el-menu router :default-openeds="['1']" unique-opened :default-active="router.currentRoute.value.path">
                    <el-sub-menu index="1">
                        <template #title>
                            <el-icon><notebook /></el-icon>内容管理
                        </template>
                        <el-menu-item-group>
                            <template #title>物品</template>
                            <el-menu-item index="/items/create">新建物品</el-menu-item>
                            <el-menu-item index="/items/list">物品列表</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group>
                            <template #title>英雄</template>
                            <el-menu-item index="/heros/create">新建英雄</el-menu-item>
                            <el-menu-item index="/heros/list">英雄列表</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group>
                            <template #title>文章</template>
                            <el-menu-item index="/articles/create">新建文章</el-menu-item>
                            <el-menu-item index="/articles/list">文章列表</el-menu-item>
                        </el-menu-item-group>
                    </el-sub-menu>
                    <el-sub-menu index="2">
                        <template #title>
                            <el-icon><notebook /></el-icon>运营管理
                        </template>
                        <el-menu-item-group>
                            <template #title>广告位</template>
                            <el-menu-item index="/ads/create">新建广告位</el-menu-item>
                            <el-menu-item index="/ads/list">广告位列表</el-menu-item>
                        </el-menu-item-group>
                    </el-sub-menu>
                    <el-sub-menu index="3">
                        <template #title>
                            <el-icon><notebook /></el-icon>系统设置
                        </template>
                        <el-menu-item-group>
                            <template #title>分类</template>
                            <el-menu-item index="/categories/create">新建分类</el-menu-item>
                            <el-menu-item index="/categories/list">分类列表</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group>
                            <template #title>管理员</template>
                            <el-menu-item index="/admin_users/create">新建管理员</el-menu-item>
                            <el-menu-item index="/admin_users/list">管理员列表</el-menu-item>
                        </el-menu-item-group>
                    </el-sub-menu>
                </el-menu>
            </el-scrollbar>
        </el-aside>

        <el-container>
            <el-header style="text-align: right; font-size: 12px;">
                <div class="toolbar">
                    <el-dropdown>
                        <el-icon style="margin-right: 8px; margin-top: 1px">
                            <setting/>
                        </el-icon>
                        <template #dropdown>
                            <el-dropdown-menu>
                            <el-dropdown-item @click="logout">退出</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                    <span>{{ username }}</span>
                </div>
            </el-header>

            <el-main style="padding: 0 20px;">
                <router-view :key="router.currentRoute.value.path" />
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup>

    // 引入图标
    import { Setting, Notebook } from '@element-plus/icons-vue'
    import { useRouter } from 'vue-router'
    import { ref } from 'vue'

    const router = useRouter() // 获取router
    const username = ref(localStorage.username)

    // 退出登录
    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        router.push('/login')
    }
</script>

<style scoped>
    .title{
        background-color: var(--el-color-primary-light-3);
        height: 60px;
        line-height: 60px;
        overflow: hidden;
        text-align: center;
        font-weight: bold;
        color: #ffffff;
    }
    .layout-container-demo .el-header {
        position: relative;
        background-color: var(--el-color-primary-light-5);
        color: var(--el-text-color-primary);
    }
    .layout-container-demo .el-aside {
        color: var(--el-text-color-primary);
        background: var(--el-color-primary-light-5);
    }
    .layout-container-demo .el-menu {
        border-right: none;
    }
    .layout-container-demo .el-main {
        padding: 0;
    }
    .layout-container-demo .toolbar {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        right: 20px;
    }
</style>
