<template>
    <m-card :icon="icon" :title="title">
        <div class="nav jc-between">
            <div class="nav-item" :class="{active: active === i}" v-for="(category, i) in categories" :key="i" @click="active = i">
                <div class="nav-link">{{category.name}}</div>
            </div>
        </div>

        <div class="pt-3">
            <swiper 
                ref="list"
                @slide-change="change"
            >
                <swiper-slide v-for="(category, i) in categories" :key="i">
                    <slot name="items" :category="category"></slot>
                </swiper-slide>
            </swiper>
        </div>
    </m-card>
</template>

<script>
    import { Swiper, SwiperSlide } from 'swiper/vue'
    import 'swiper/css'
    import 'swiper/css/pagination'

    import MCard from './MCard.vue'

    export default {
        props: {
            title: { type: String, required: true },
            icon: { type: String, required: true },
            categories: { type: Array, required: true },
        },
        components: {
            Swiper,
            SwiperSlide,
            MCard
        },
        methods: {
            change(e){
                this.active = e.activeIndex
                console.log(this.$refs.list)
            }
        },
        data() {
            return {
                active: 0
            }
        }
    }
</script>

<style lang="scss">
    @import '../assets/scss/variables';
    .card {
        .card-header {
            border-bottom: 1px solid $border-color;
        }
        border-bottom: 1px solid $border-color;
    }
</style>