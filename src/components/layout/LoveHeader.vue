<template>
  <div class="header">
    <div class="collapse-btn" @click="collapseChange">
      <el-icon v-if="!collapse">
        <expand/>
      </el-icon>
      <el-icon v-else>
        <fold/>
      </el-icon>
    </div>
    <div class="logo">{{ StaticString.TITLE }}</div>
    <div class="header-right-user">
      <div class="header-user-image">
        <img src="../../assets/images/header.jpg">
      </div>

      <el-dropdown class="user-name" trigger="click">
        <span class="el-dropdown-link">
          Admin
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
  /**
   * 2024/11/3 20:24
   * @author <a href="https://github.com/wzh-devin">devin</a>
   * @description 管理后台的头部组件
   * @version 1.0
   * @since 1.0
   */
  import {onMounted, ref, watch} from "vue";
  import {StaticString} from "../../enums";
  import {emitter} from "../../event/emitter.ts";

  import {Expand, Fold} from "@element-plus/icons-vue";
  import {EventEnum} from "../../event";

  let collapse = ref(false);

  onMounted(() => {
    if (document.body.clientWidth < 1500) {
      collapseChange();
    }
  })

  const collapseChange = () => {
    collapse.value = !collapse.value;
  }

  const logout = () => {
    // TODO 退出登录，跳转登录页面，发送退出请求，后端清空请求
  }

  /**
   * 监听collapse改变
   */
  watch(collapse, () => {
    emitter.emit(EventEnum.CollapseChange, collapse.value);
  })
</script>

<style scoped lang="scss">

  $height: 60px;

  .header {
    position: absolute;
    z-index: 100;
    width: 100%;
    height: $height;
    display: flex;
    align-items: center;
    font-size: 20px;
    color: #2c3e50;
    background: #ffff;
    box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.3);
  }

  .collapse-btn {
    display: flex;
    padding: 0 21px;
    cursor: pointer;
  }

  .header .logo {
    width: 250px;
    font-weight: bold;
  }

  .header-right-user {
    display: flex;
    position: absolute;
    right: 0;
    padding-right: 30px;
    align-items: center;
  }

  .header-user-image img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .user-name {
    margin-left: 15px;
  }

  .el-dropdown-link {
    cursor: pointer;
    font-size: 17px;
    display: flex;
    align-items: center;
  }
</style>