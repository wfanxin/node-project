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

        <m-card-list icon="cc-menu-circle" title="新闻资讯" :categories="newsCats">
            <template #items="{category}">
                <div class="py-2" v-for="(news, i) in category.newsList" :key="i">
                    <span>[{{news.categoryName}}]</span>
                    <span>|</span>
                    <span>{{news.title}}</span>
                    <span>{{news.date}}</span>
                </div>
            </template>
        </m-card-list>

        <m-card-list icon="cc-menu-circle" title="英雄列表"></m-card-list>
        <m-card-list icon="cc-menu-circle" title="精彩视频"></m-card-list>
        <m-card-list icon="cc-menu-circle" title="图文攻略"></m-card-list>
    </div>
</template>

<script>
    import { defineComponent } from 'vue'
    import { Pagination } from 'swiper'
    import { Swiper, SwiperSlide } from 'swiper/vue'
    import 'swiper/css'
    import 'swiper/css/pagination'

    import MCardList from '../components/MCardList.vue'

    export default defineComponent({
        components: {
            Swiper,
            SwiperSlide,
            MCardList
        },
        setup() {
            return {
                modules: [Pagination],
                newsCats: [
                    {
                        name: '热门',
                        newsList: new Array(5).fill({
                            categoryName: '公告',
                            title: '更新公告',
                            date: '06/01'
                        })
                    },
                    {
                        name: '新闻',
                        newsList: new Array(5).fill({
                            categoryName: '公告',
                            title: '更新公告',
                            date: '06/01'
                        })
                    }
                ]
            }
        }
    })
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
</style>