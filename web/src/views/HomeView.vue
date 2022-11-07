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

        <div class="card bg-white p-3 mt-3">
            <div class="card-hearder d-flex ai-center">
                <i class="iconfont icon-cc-menu-circle"></i>
                <div class="fs-xl flex-1 px-2">新闻资讯</div>
                <i class="iconfont icon-more"></i>
            </div>

            <div class="card-body">
                <div class="nav">
                    <div class="nav-item active">
                        <div class="nav-link">热门</div>
                    </div>
                    <div class="nav-item">
                        <div class="nav-link">新闻</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { defineComponent } from 'vue'
    import { Pagination } from 'swiper'
    import { Swiper, SwiperSlide } from 'swiper/vue'
    import 'swiper/css'
    import 'swiper/css/pagination'

    export default defineComponent({
        components: {
            Swiper,
            SwiperSlide
        },
        setup() {
            return {
                modules: [Pagination]
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