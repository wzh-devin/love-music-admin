<template>
  <div class="login-container">
    <div class="login-title">{{ title }}</div>
    <div class="login">
      <el-form :model="formData">

      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
  /**
   * 2024/11/1 12:39
   * @author <a href="https://github.com/wzh-devin">devin</a>
   * @description 登录页面
   * @version 1.0
   * @since 1.0
   */
  const title = '爱音乐';
</script>

<style scoped>
  .login-container {
    position: relative;
    background: url("../assets/images/background.jpg") fixed center;
    background-size: cover;
    width: 100%;
    height: 100%;
  }

  .login-title {
    position: absolute;
    top: 50%;
    width: 100%;
    margin-top: -230px;
    text-align: center;
    font-size: 30px;
    font-weight: 600;
    color: black;
  }

  .login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 300px;
    margin: -150px 0 0 -190px;
    padding: 40px;
    border-radius: 5px;
    background: #fff;
  }

  .login-btn {
    width: 100%;
  }
</style>