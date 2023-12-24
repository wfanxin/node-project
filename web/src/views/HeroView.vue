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
        <div class="top" v-if="data.hero.avatar" :style="{'background-image': `url(${data.hero.avatar})`}">
            <div class="info text-white p-3 h-100 d-flex flex-column jc-end">
                <div class="fs-sm">{{data.hero.title}}</div>
                <div class="my-2">{{data.hero.name}}</div>
                <div class="fs-sm" v-if="data.hero.categories">{{data.hero.categories.map(v => v.name).join('/')}}</div>
                <div class="d-flex jc-between py-2">
                    <div class="scores d-flex ai-center" v-if="data.hero.scores">
                        <span>难度</span>
                        <span class="badge bg-primary">{{data.hero.scores.difficult}}</span>
                        <span>技能</span>
                        <span class="badge bg-blue-1">{{data.hero.scores.skills}}</span>
                        <span>攻击</span>
                        <span class="badge bg-danger">{{data.hero.scores.attack}}</span>
                        <span>生存</span>
                        <span class="badge bg-dark">{{data.hero.scores.survive}}</span>
                    </div>
                    <router-link to="/" class="text-grey fs-sm">
                        皮肤：2 &gt;
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { defineProps, getCurrentInstance, reactive } from 'vue'
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
</script>

<style lang="scss">
    .page-hero {
        .top {
            height: 53vw;
            background: #ffffff no-repeat top center;
            background-size: auto 100%;
        }
        .info {
            background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,1));
            .scores {
                .badge {
                    margin: 0 0.25rem;
                    display: inline-block;
                    width: 1rem;
                    height: 1rem;
                    line-height: 0.9rem;
                    text-align: center;
                    border-radius: 50%;
                    font-size: 0.6rem;
                    border: 1px solid rgba(255,255,255,0.2);
                }
            }
        }
    }
</style>