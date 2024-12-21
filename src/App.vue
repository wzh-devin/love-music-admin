<script setup lang="ts">
  import {onUnmounted} from "vue";

  onUnmounted(() => {
    // 应用被卸载、销毁执行回调函数
  })
</script>

<template>
  <router-view></router-view>
</template>

<style scoped>
</style>
