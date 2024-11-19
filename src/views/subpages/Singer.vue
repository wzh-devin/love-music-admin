<template>
  <div class="container">
    <div class="page-handler">
      <el-button type="success" @click="addSingerDialog = true">添加</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" current-row-key="row" v-loading="loading">
      <el-table-column type="expand">
        <template #default="props">
          <div class="table-detail">
            <img src="../../assets/images/header.jpg" alt="">
            <el-tooltip class="" :content="props.row.description">
              <el-button>简介</el-button>
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
          </div>
        </template>
      </el-table-column>
      <el-table-column label="名称" prop="name"/>
      <el-table-column label="性别" prop="sex"/>
      <el-table-column label="出生日期" prop="birthday"/>
      <el-table-column label="操作" prop="buttons">
        <template #default="options">
          <el-button type="warning" @click="editSinger(options)">修改</el-button>
          <el-button type="danger" @click="delSinger(options)">删除</el-button>
          <el-button type="primary">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <!-- 添加歌手弹窗 -->
  <el-dialog
      v-model="addSingerDialog"
      title="添加歌手"
      @open="formDataClear"
  >
    <el-form
        ref="singerFormRef"
        style="max-width: 600px"
        :model="singerFormData"
        :rules="rules"
        label-width="auto"
        status-icon
    >
      <el-form-item label="歌手名" prop="name">
        <el-input v-model="singerFormData.name" placeholder="歌手名称"/>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="singerFormData.sex">
          <el-radio value="1">男</el-radio>
          <el-radio value="0">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="歌手国籍" prop="nationality">
        <el-input v-model="singerFormData.nationality" placeholder="歌手国籍"/>
      </el-form-item>
      <el-form-item label="出生日期">
        <el-col :span="11">
          <el-form-item prop="birthday">
            <el-date-picker
                v-model="singerFormData.birthday"
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
        <el-input v-model="singerFormData.description" type="textarea" placeholder="歌手简介"/>
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

  <!-- 修改歌手弹窗 -->
  <el-dialog
      v-model="editSingerDialog"
      title="修改歌手"
      @close="formDataClear"
  >
    <el-form
        ref="singerFormRef"
        style="max-width: 600px"
        :model="singerFormData"
        :rules="rules"
        label-width="auto"
        status-icon
    >
      <el-form-item label="歌手名" prop="name">
        <el-input v-model="singerFormData.name" placeholder="歌手名称"/>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="singerFormData.sex">
          <el-radio value="1">男</el-radio>
          <el-radio value="0">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="歌手国籍" prop="nationality">
        <el-input v-model="singerFormData.nationality" placeholder="歌手国籍"/>
      </el-form-item>
      <el-form-item label="出生日期">
        <el-col :span="11">
          <el-form-item prop="birthday">
            <el-date-picker
                v-model="singerFormData.birthday"
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
        <el-input v-model="singerFormData.description" type="textarea" placeholder="歌手简介"/>
      </el-form-item>
    </el-form>


    <template #footer>
      <div class="dialog-footer">
        <el-button @click="editSingerDialog = false">取消</el-button>
        <el-button type="primary" @click="editSingerInfo">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>

  <!-- 删除歌手信息弹窗-->
  <el-dialog
      v-model="delSingerDialog"
      @close="formDataClear"
  >
    <span>是否删除歌手信息</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="delSingerDialog = false">取消</el-button>
        <el-button type="primary" @click="delSingerInfo">
          确认
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
  import {ref, reactive, onMounted, watch} from "vue";
  import {FormRules} from "element-plus";
  import {RequestHandler} from "../../api";
  import {SingerFormData, singerFormData} from "../../api/entity/formModel.ts";

  // 表格数据
  let tableData = reactive<Array<SingerFormData>>([]);

  // 添加歌手弹窗控制器
  let addSingerDialog = ref(false);
  // 修改歌手弹窗控制器
  let editSingerDialog = ref(false);
  // 删除歌手弹窗控制器
  let delSingerDialog = ref(false);
  // 弹窗
  const singerFormRef = ref();
  // 请求执行器
  const requestHandler = RequestHandler.getInstance();
  // loading
  let loading = ref(false);

  onMounted(() => {
    // 初始化数据
    tableDataInit();
  })

  // 表单数据清空
  const formDataClear = () => {
    console.log(tableData.hasOwnProperty())
    Object.assign(singerFormData, {
      id: '',
      name: '',
      sex: 1,
      birthday: '',
      singerPicUrl: '',
      description: '',
      nationality: '',
      albums: []
    });
  }

  // 表格数据初始化
  const tableDataInit = async () => {
    loading.value = true;
    await requestHandler.getSingerList().then(
        (res) => {
          tableData.length = 0;
          tableData.push(...res.data);
        },
        (error) => {
          // 获取数据错误
          ElMessage({type: 'error', message: '获取数据失败, 请联系管理员'});
        }
    )
    loading.value = false;
  }

  // 添加歌手
  const addSinger = async () => {
    await requestHandler.addSinger(singerFormData).then(
        (res) => {
          tableDataInit();
          ElMessage({type: 'success', message: '添加成功'});
        },
        (error) => {
          // 添加错误
          ElMessage({type: 'error', message: '添加失败'});
        }
    )
    // 关闭弹窗
    addSingerDialog.value = false;
  }

  // 更新歌手弹窗
  const editSinger = ({row}) => {
    editSingerDialog.value = true;
    Object.assign(singerFormData, row);
  }

  // 更新歌手信息
  const editSingerInfo = async () => {
    await requestHandler.updateSingerInfo(singerFormData)
        .then(
            (res) => {
              // tableDataInit(); 优化代码，不需要再次请求数据，减少不必要的浪费
              const singerIndex = tableData.findIndex(item => item.id == singerFormData.id);
              if (singerIndex != -1) {
                // 更新tableData数据
                Object.assign(tableData[singerIndex], singerFormData);
              }
              ElMessage({type: 'success', message: '更新成功'});
            },
            (error) => {
              // 更新错误
              ElMessage({type: 'error', message: '更新失败'});
            }
        )
    editSingerDialog.value = false;
  }

  // 删除歌手弹窗
  const delSinger = ({row}) => {
    delSingerDialog.value = true;
    Object.assign(singerFormData, row);
  }

  // 删除歌手信息
  const delSingerInfo = async () => {
    // 数据封装
    const ids: number[] = [singerFormData.id];
    await requestHandler.deleteSingerInfo(ids)
        .then(
            (res) => {
              Object.assign(tableData, tableData.filter(item => item.id != singerFormData.id));
              ElMessage({type: 'success', message: '删除成功'});
            },
            (error) => {
              // 删除错误
              ElMessage({type: 'error', message: '删除失败'});
            }
        )
    delSingerDialog.value = false;
  }

  // 弹窗属性规则
  const rules = reactive<FormRules<SingerFormData>>({
    name: {required: true, message: '请填写歌手名', trigger: 'blur'},
    birthday: {required: true, message: '请填写出生日期'},
    sex: {required: true, message: '请填写歌手性别'},
    nationality: {required: true, message: '请填写歌手国籍'}
  })

  // 检测tableData属性，刷新页面
  watch(tableData, () => {
  }, {
    deep: true
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