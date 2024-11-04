<template>
  <div class="sidebar">
    <el-menu
        class="sidebar-el-menu"
        background-color="#ffffff"
        active-text-color="#30a4fc"
        default-active="home"
        :collapse="collapse"
        router
    >
      <el-menu-item index="systemManager">
        <el-icon>
          <House/>
        </el-icon>
        <span>系统首页</span>
      </el-menu-item>
      <el-menu-item index="singer">
        <el-icon>
          <User/>
        </el-icon>
        <span>歌手管理</span>
      </el-menu-item>
      <el-menu-item index="music">
        <el-icon>
          <Mic/>
        </el-icon>
        <span>歌曲管理</span>
      </el-menu-item>
      <el-menu-item index="album">
        <el-icon>
          <Tickets/>
        </el-icon>
        <span>专辑管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang="ts">/**
 * 2024/11/4 8:50
 * @author <a href="https://github.com/wzh-devin">devin</a>
 * @description 侧边栏组件
 * @version 1.0
 * @since 1.0
 */
import {onMounted, onUnmounted, ref} from "vue";
import {emitter} from "../../event/emitter.ts";
import {House, Mic, Tickets, User} from "@element-plus/icons-vue";
import {EventEnum} from "../../event";

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
  .sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 60px;
    bottom: 0;
    overflow-y: scroll;
  }

  .sidebar::-webkit-scrollbar {
    width: 0;
  }

  .sidebar > ul {
    height: 100%;
  }
</style>