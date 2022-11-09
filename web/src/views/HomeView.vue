<template>
    <div>
        <swiper :modules="modules" :pagination="{ clickable: true }">
            <swiper-slide >
                <img class="w-100" src="../assets/images/swiper1.jpg">
            </swiper-slide>
            <swiper-slide>
                <img class="w-100" src="../assets/images/swiper2.png">
            </swiper-slide>
            <swiper-slide>
                <img class="w-100" src="../assets/images/swiper3.jpg">
            </swiper-slide>
        </swiper>

        <div class="nav-icons bg-white mt-3 text-center pt-3 text-dark-1">
            <div class="d-flex flex-wrap">
                <div class="nav-item mb-3" v-for="n in 10" :key="n">
                    <i class="sprite"></i>
                    <div>爆料站</div>
                </div>
            </div>
            <div class="bg-light py-2">
                收起
            </div>
        </div>

        <!-- 新闻资讯 -->
        <m-card-list icon="cc-menu-circle" title="新闻资讯" :categories="data.newsCats">
            <template #items="{category}">
                <div class="py-2 d-flex fs-lg" v-for="(news, i) in category.newsList" :key="i">
                    <span class="text-info">[{{news.categoryName}}]</span>
                    <span class="px-2">|</span>
                    <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{news.title}}</span>
                    <span class="text-grey-1 fs-sm">{{filters(news.updatedAt)}}</span>
                </div>
            </template>
        </m-card-list>

        <!-- 英雄列表 -->
        <m-card-list icon="yingxiongxiangqing" title="英雄列表" :categories="data.heroCats">
            <template #items="{category}">
                <div class="d-flex flex-wrap" style="margin: 0 -0.5rem;">
                    <div class="p-2 text-center" style="width: 20%;" v-for="(hero, i) in category.heroList" :key="i">
                        <img :src="hero.avatar" class="w-100 images-radius">
                        <div>{{ hero.name }}</div>
                    </div>
                </div>
            </template>
        </m-card-list>
    </div>
</template>

<script setup>
    import { getCurrentInstance, reactive } from 'vue'
    import { Pagination } from 'swiper'
    import { Swiper, SwiperSlide } from 'swiper/vue'
    import 'swiper/css'
    import 'swiper/css/pagination'

    import MCardList from '../components/MCardList.vue'
    import dayjs from 'dayjs'

    const modules = reactive([Pagination])
    const { proxy } = getCurrentInstance() // 获取当前实例
    const data = reactive({
        newsCats: [],
        heroCats: []
    })

    // 请求新闻分类函数
    const fetchNewsCates = () => {
        proxy.$http.get('/news/list').then(res => {
            data.newsCats = res.data
        })
    }

    // 执行函数
    fetchNewsCates()

    // 请求英雄分类函数
    const fetchHeroCates = () => {
        proxy.$http.get('/heros/list').then(res => {
            data.heroCats = res.data
        })
    }

    // 执行函数
    fetchHeroCates()

    const filters = (val) => {
        return dayjs(val).format('MM/DD')
    }
</script>

<style lang="scss">
    @import '../assets/scss/variables';

    .swiper-pagination-bullets {
        text-align: right;
        .swiper-pagination-bullet {
            border-radius: 20%;
            opacity: 1;
            background: map-get($colors, 'white');
            &.swiper-pagination-bullet-active{
                background: map-get($colors, 'info');
            }
        }
    }

    .nav-icons{
        border-top: 1px solid $border-color;
        border-bottom: 1px solid $border-color;
        .nav-item{
            width: 25%;
            border-left: 1px solid $border-color;
            &:nth-child(4n+1) {
                border-left: none;
            }
        }
    }

    .images-radius{
        height: 4rem;
        border-top-right-radius: .5rem;
        height: 4rem;
        border-bottom-left-radius: .5rem;
    }
</style>