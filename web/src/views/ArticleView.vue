<template>
    <div class="page-article" v-if="data.article">
        <div class="d-flex py-3 px-2 border-bottom">
            <div class="iconfont icon-xiangzuojiantou text-blue mr-1" @click="goBack"></div>
            <strong class="flex-1 text-blue text-ellipsis">
                {{data.article.title}}
            </strong>
            <div class="text-grey fs-xs">
                {{filters(data.article.updatedAt)}}
            </div>
        </div>
        <div v-html="data.article.body" class="px-3 body fs-lg"></div>
        <div class="px-3 border-top py-3">
            <div class="d-flex ai-center">
                <i class="iconfont icon-cc-menu-circle"></i>
                <strong class="text-blue fs-lg ml-1">相关资讯</strong>
            </div>
            <div class="pt-2">
                <div 
                    class="py-1"
                    v-for="item in data.article.related"
                    :key="item._id"
                    @click="goDetail(item._id, 'articles')"
                >
                    {{item.title}}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { defineProps, getCurrentInstance, reactive } from 'vue'
    import { useRouter } from 'vue-router'
    import dayjs from 'dayjs'
    const { proxy } = getCurrentInstance() // 获取当前实例

    // 指定props变量
    const props = defineProps({
        id: { required: true }
    })

    const data = reactive({
        article: {}
    })

    // 定义获取详情接口的函数
    const fetch = (id) => {
        proxy.$http.get(`articles/${id}`).then((res)=>{
            data.article = res.data
        })
    }

    // 执行函数
    fetch(props.id)

    const router = useRouter() // 获取router

    // 定义跳转文章详情的函数
    const goDetail = (id, category) => {
        router.replace(`/${category}/${id}`)
        fetch(id)
    }

    // 返回函数
    const goBack = () => {
        router.go(-1)
    }

    const filters = (val) => {
        return dayjs(val).format('YY-MM-DD HH:mm:ss')
    }
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