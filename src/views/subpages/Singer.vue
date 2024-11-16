<template>
  <div class="container">
    <div class="page-handler">
      <el-button type="success" @click="addSingerDialog = true">添加</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" current-row-key="row">
      <el-table-column type="expand">
        <template #default="props">
          <div class="table-detail">
            <img src="../../assets/images/header.jpg" alt="">
            <el-tooltip class="" :content="props.row.description">
              <el-button @click="descriptionDialog = true">简介</el-button>
            </el-tooltip>
            <el-table :data="props.row.albums">
              <el-table-column label="专辑名" prop="name"/>
              <el-table-column label="发布时间" prop="releaseTime"/>
              <el-table-column label="歌曲总数" prop="musicTotal"/>
              <el-table-column label="操作" prop="scope">
                <template #default="options">
                  <el-button type="danger">删除</el-button>
                  <el-button type="primary">查看</el-button>
                </template>
              </el-table-column>
            </el-table>

            <!-- 修改简介弹窗 -->
            <el-dialog
                v-model="descriptionDialog"
                title="修改简介"
            >
              <el-input v-model="props.row.description" type="textarea"/>

              <template #footer>
                <div class="dialog-footer">
                  <el-button @click="descriptionDialog = false">取消</el-button>
                  <el-button type="primary" @click="editDesc">
                    确定
                  </el-button>
                </div>
              </template>
            </el-dialog>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="名称" prop="name"/>
      <el-table-column label="性别" prop="sex"/>
      <el-table-column label="出生日期" prop="birthday"/>
      <el-table-column label="操作" prop="buttons">
        <template #default="options">
          <el-button type="danger">删除</el-button>
          <el-button type="primary">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <!-- 添加歌手弹窗 -->
  <el-dialog
      v-model="addSingerDialog"
      title="添加歌手"
  >
    <el-form
        ref="SingerSingerRuleFormRef"
        style="max-width: 600px"
        :model="SingerRuleForm"
        :rules="rules"
        label-width="auto"
        status-icon
    >
      <el-form-item label="歌手名" prop="name">
        <el-input v-model="SingerRuleForm.name" placeholder="歌手名称"/>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="SingerRuleForm.sex">
          <el-radio value="1">男</el-radio>
          <el-radio value="0">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="歌手国籍" prop="nationality">
        <el-input v-model="SingerRuleForm.nationality" placeholder="歌手国籍"/>
      </el-form-item>
      <el-form-item label="出生日期">
        <el-col :span="11">
          <el-form-item prop="birthday">
            <el-date-picker
                v-model="SingerRuleForm.birthday"
                type="date"
                value-format="YYYY-MM-DD"
                aria-label="Pick a date"
                placeholder="Pick a date"
                style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="简介" prop="desc">
        <el-input v-model="SingerRuleForm.description" type="textarea" placeholder="歌手简介"/>
      </el-form-item>
    </el-form>


    <template #footer>
      <div class="dialog-footer">
        <el-button @click="addSingerDialog = false">取消</el-button>
        <el-button type="primary" @click="addSinger">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  /**
   * 2024/11/4 10:06
   * @author <a href="https://github.com/wzh-devin">devin</a>
   * @description 歌手管理
   * @version 1.0
   * @since 1.0
   */
  import {ref, reactive, onMounted} from "vue";
  import {FormRules} from "element-plus";
  import {RequestHandler} from "../../api";
  import {SingerFormData, SingerRuleForm} from "../../api/entity/formModel.ts";

  // 表格数据
  let tableData = reactive<Array<SingerFormData>>([]);
  // 添加歌手弹窗的控制器
  let addSingerDialog = ref(false);
  // 修改简介弹窗的控制器
  let descriptionDialog = ref(false);
  // 请求执行器
  const requestHandler = RequestHandler.getInstance();

  onMounted(() => {
    // 初始化数据
    tableDataInit();
  })

  // 表格数据初始化
  const tableDataInit = async () => {
    Object.assign(tableData, (await requestHandler.getSingerList()).data);
  }

  // 添加歌手
  const addSinger = async () => {
    await requestHandler.addSinger(SingerRuleForm);
    // 关闭弹窗
    addSingerDialog.value = false;
    // 刷新页面
    await tableDataInit();
  }

  // TODO 修改简介
  const editDesc = () => {
    // 修改简介弹窗
    descriptionDialog.value = false;
  }

  const rules = reactive<FormRules<SingerFormData>>({
    name: {required: true, message: '请填写歌手名', trigger: 'blur'},
    birthday: {required: true, message: '请填写出生日期'},
    sex: {required: true, message: '请填写歌手性别'},
    nationality: {required: true, message: '请填写歌手国籍'}
  })
</script>

<style scoped lang="scss">
  $img-size: 120px;

  img {
    width: $img-size;
    height: $img-size;
    border-radius: 50%;
  }

  .singer-desc {
    width: 600px;
    height: 120px;
    margin-left: 30px;
    display: inline-block;
    overflow: scroll;
    padding: 10px 0 10px 0;
    text-overflow: ellipsis;
    white-space: collapse;
  }

  .table-detail {
    margin-left: 45px;
  }
</style>