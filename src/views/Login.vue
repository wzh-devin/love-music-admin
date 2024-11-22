<template>
  <div class="login-container">
    <div class="login-title">{{ title }}</div>
    <div class="login">
      <el-form :model="formData" :rules="rules">
        <el-form-item prop="username">
          <el-input type="text" placeholder="请输入用户名" v-model="formData.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="请输入密码" v-model="formData.password"
                    @keyup.enter="submitForm"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" type="primary" @click="submitForm">登录</el-button>
        </el-form-item>
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
  import {getCurrentInstance, reactive} from "vue";
  import {RouterPath, StaticString} from "../enums";
  import {RequestHandler} from "../api";
  import {ApiResponse} from "../api/entity/response.ts";
  import {RouterManager} from "../manager/router-manager.ts";

  const title = StaticString.TITLE;
  const requestHandler = RequestHandler.getInstance();
  const proxy = getCurrentInstance();

  const formData = reactive({
    username: 'admin',
    password: '123'
  });

  const rules = reactive({
    username: [
      {
        required: true,
        message: '请输入用户名',
        trigger: 'blur'
      }
    ],
    password: [{
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    }]
  })

  /**
   * 提交表单数据
   */
  const submitForm = async () => {
    const result = await requestHandler.login(formData) as ApiResponse;
    console.log(result)
    if (result.isSuccess) {
      ElMessage({
        message: '登录成功',
        type: 'success'
      })
      await RouterManager.skipRoute({path: RouterPath.Home});
    }
  }
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