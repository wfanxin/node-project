<template>
    <m-card :icon="icon" :title="title">
        <div class="nav jc-between">
            <div class="nav-item" :class="{active: active === i}" v-for="(category, i) in categories" :key="i" @click="data.swiper.slideTo(i)">
                <div class="nav-link">{{category.name}}</div>
            </div>
        </div>

        <div class="pt-3">
            <swiper 
                @slide-change="onChange"
                @swiper="onSwiper"
            >
                <swiper-slide v-for="(category, i) in categories" :key="i">
                    <slot name="items" :category="category"></slot>
                </swiper-slide>
            </swiper>
        </div>
    </m-card>
</template>

<script setup>
    import { defineProps, reactive, ref } from 'vue'
    import { Swiper, SwiperSlide } from 'swiper/vue'
    import 'swiper/css'
    import 'swiper/css/pagination'

    import MCard from './MCard.vue'

    // 指定props变量
    defineProps({
        title: { type: String, required: true },
        icon: { type: String, required: true },
        categories: { type: Array, required: true },
    })

    // 定义变量
    let active = ref(0)
    const onChange = (e) => {
        active.value = e.activeIndex
    }

    // 定义变量
    const data = reactive({
        swiper: null
    })
    
    // 定义函数
    const onSwiper = (e) => {
        data.swiper = e
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