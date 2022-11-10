<template>
    <div class="page-hero" v-if="data.hero">
        <div class="topbar bg-black py-2 px-3 d-flex ai-center text-white">
            <img src="../assets/logo.png" height="30">
            <div class="px-2 flex-1">
                <span class="text-white">王者荣耀</span>
                <span class="ml-2">攻略站</span>
            </div>
            <router-link to="/">更多英雄 &gt;</router-link>
        </div>

    </div>
</template>

<script setup>
    import { defineProps, getCurrentInstance, reactive } from 'vue'
    // import { useRouter } from 'vue-router'
    const { proxy } = getCurrentInstance() // 获取当前实例

    // 指定props变量
    const props = defineProps({
        id: { required: true }
    })

    const data = reactive({
        hero: {}
    })

    // 定义获取详情接口的函数
    const fetch = (id) => {
        proxy.$http.get(`heros/${id}`).then((res)=>{
            data.hero = res.data
        })
    }

    // 执行函数
    fetch(props.id)

    // const router = useRouter() // 获取router

    // 定义跳转详情的函数
    // const goDetail = (id, category) => {
    //     router.push(`/${category}/${id}`)
    // }
</script>

<style lang="scss">
    .page-article {
        .body {
            img {
                max-width: 100%;
                height: auto;
            }

            iframe {
                max-width: 100%;
                height: auto;
            }
            
            line-height: 2rem;
        }
        .icon-xiangzuojiantou{
            font-weight: bold;
        }
    }
</style>