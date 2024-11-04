<template>
  <LoveHeader/>
  <LoveSideBar/>
  <div class="content-box" :class="{ 'content-collapse': collapse }">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">/**
 * 2024/11/2 0:00
 * @author <a href="https://github.com/wzh-devin">devin</a>
 * @description 后台管理的家页面
 * @version 1.0
 * @since 1.0
 */
import LoveHeader from "../components/layout/LoveHeader.vue";
import LoveSideBar from "../components/layout/LoveSideBar.vue";
import {emitter} from "../event/emitter.ts";
import {onMounted, onUnmounted, ref} from "vue";
import {EventEnum} from "../event";

let collapse = ref(false);

onMounted(() => {
  emitter.on(EventEnum.CollapseChange, (msg) => {
    collapse.value = msg as boolean;
  })
})

onUnmounted(() => {
  // 销毁订阅的事件
  console.log('订阅事件销毁');
  emitter.off(EventEnum.CollapseChange);
})


</script>

<style scoped>
  .content-box {
    position: absolute;
    top: 60px;
    right: 0;
    bottom: 0;
    left: 150px;
    transition: left 0.3s ease-in-out;
    padding: 20px;
    overflow-y: scroll;
  }
</style>