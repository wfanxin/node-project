<template>
    <div class="card bg-white p-3 mt-3">
        <div class="card-header d-flex ai-center pb-3">
            <i class="iconfont" :class="`icon-${icon}`"></i>
            <div class="fs-xl flex-1 px-2">{{title}}</div>
            <i class="iconfont icon-more"></i>
        </div>

        <div class="card-body pt-3">
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
    import { defineProps } from 'vue'

    // 指定props变量
    defineProps({
        title: { type: String, required: true },
        icon: { type: String, required: true },
    })
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