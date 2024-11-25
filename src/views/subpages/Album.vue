<template>
  <div class="container">
    <div class="page-handler">
      <el-input style="margin-right: 15px; width: 200px" clearable placeholder="请输入需要查询的专辑名"></el-input>
      <el-button type="primary" @click="">搜索专辑</el-button>
      <el-button type="success" @click="tableData.dialog.addAlbum.isShow = Boolean(true)">新增专辑</el-button>
      <el-button type="danger" @click="tableData.dialog.delAlbum.isShow = Boolean(true)">删除专辑</el-button>
    </div>
    <el-table
        ref="tableRef"
        :data="tableData.entityData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        :v-loading="tableData.loading"
    >
      <el-table-column type="selection" :selectable="selectable" width="55"/>
      <el-table-column property="name" label="专辑名"/>
      <el-table-column property="singerName" label="歌手名"/>
      <el-table-column property="musicTotal" label="专辑歌曲总数"/>
      <el-table-column label="发行日期">
        <template #default="scope">{{ scope.row.releaseTime }}</template>
      </el-table-column>
      <el-table-column label="专辑描述">
        <template #default="props">
          {{ props.row.description }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="选项" min-width="200">
        <template #default="props">
          <el-button type="primary" size="small" @click="musicInfo">歌曲信息</el-button>
          <el-button type="warning" size="small" @click="showEditDialog(props)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <!-- 新增专辑弹窗 -->
  <el-dialog
      v-model="tableData.dialog.addAlbum.isShow"
      title="添加歌手"
      @open="formDataClear"
  >
    <el-form
        ref="albumFormRef"
        style="max-width: 600px"
        :model="tableData.formData"
        :rules="tableData.dialog.addAlbum.rules"
        label-width="auto"
        status-icon
    >
      <el-form-item label="专辑名" prop="name">
        <el-input v-model="tableData.formData.name" placeholder="专辑名称"/>
      </el-form-item>
      <el-form-item label="发行日期">
        <el-col :span="11">
          <el-form-item prop="releaseTime">
            <el-date-picker
                v-model="tableData.formData.releaseTime"
                type="date"
                value-format="YYYY-MM-DD"
                aria-label="Pick a date"
                placeholder="Pick a date"
                style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="专辑描述" prop="description">
        <el-input v-model="tableData.formData.description" type="textarea" placeholder="专辑描述"/>
      </el-form-item>
    </el-form>


    <template #footer>
      <div class="dialog-footer">
        <el-button @click="tableData.dialog.addAlbum.isShow = Boolean(false)">取消</el-button>
        <el-button type="primary" @click="addAlbum">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>

  <!-- 修改专辑弹窗 -->
  <el-dialog
      v-model="tableData.dialog.editAlbum.isShow"
      title="添加歌手"
      @close="formDataClear"
  >
    <el-form
        ref="albumFormRef"
        style="max-width: 600px"
        :model="tableData.formData"
        :rules="tableData.dialog.rules"
        label-width="auto"
        status-icon
    >
      <el-form-item prop="id" hidden="hidden"></el-form-item>
      <el-form-item label="专辑名" prop="name">
        <el-input v-model="tableData.formData.name" placeholder="专辑名称"/>
      </el-form-item>
      <el-form-item label="发行日期">
        <el-col :span="11">
          <el-form-item prop="releaseTime">
            <el-date-picker
                v-model="tableData.formData.releaseTime"
                type="date"
                value-format="YYYY-MM-DD"
                aria-label="Pick a date"
                placeholder="Pick a date"
                style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="专辑描述" prop="description">
        <el-input v-model="tableData.formData.description" type="textarea" placeholder="专辑描述"/>
      </el-form-item>
    </el-form>


    <template #footer>
      <div class="dialog-footer">
        <el-button @click="tableData.dialog.editAlbum.isShow = Boolean(false)">取消</el-button>
        <el-button type="primary" @click="editAlbum">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>

  <!-- 删除专辑弹窗 -->
  <el-dialog
      v-model="tableData.dialog.delAlbum.isShow"
      @close="formDataClear"
  >
    <span>是否删除专辑信息</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="tableData.dialog.delAlbum.isShow = Boolean(false)">取消</el-button>
        <el-button type="primary" @click="delAlbum">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  /**
   * 2024/11/4 11:18
   * @author <a href="https://github.com/wzh-devin">devin</a>
   * @description
   * @version 1.0
   * @since 1.0
   */
  import {onMounted, reactive} from "vue";
  import {useRouter} from "vue-router";
  import {RequestHandler} from "../../api";
  import {AlbumFormData} from "../../api/entity/formModel.ts";
  import {ElMessage, FormRules} from "element-plus";

  const router = useRouter();
  const requestHandler = RequestHandler.getAlbumRequestInstance();

  // 表格数据信息
  const tableData = reactive({
    singerId: router.currentRoute.value.query['singerId'],
    formData: reactive<AlbumFormData>({}),
    entityData: Array<AlbumFormData>(),
    loading: Boolean(false),
    dialog: {
      addAlbum: {
        isShow: Boolean(false)
      },
      editAlbum: {
        id: '',
        isShow: Boolean(false),
      },
      delAlbum: {
        data: {
          albumIds: [],
          singerId: router.currentRoute.value.query['singerId']
        },
        isShow: Boolean(false)
      },
      rules: reactive<FormRules<AlbumFormData>>({
        name: {required: true, message: '请填写专辑名称'},
        releaseTime: {required: true, message: '请选择发行日期'},
        description: {required: true, message: '请填写专辑描述'}
      })
    }
  })

  onMounted(() => {
    tableDataInit();
  })

  // 表格数据初始化
  const tableDataInit = async () => {
    // 页面loading
    tableData.loading = true;
    await requestHandler.getSingerAlbums(tableData.singerId).then(
        res => {
          // 表格数据清空
          tableData.entityData.length = 0;
          tableData.entityData.push(...res.data);
          // 页面loading
          tableData.loading = Boolean(true);
          // 弹窗
          ElMessage({type: 'success', message: '加载成功'});
        },
        error => {
          // 弹窗
          ElMessage({type: 'warning', message: '数据加载失败，请联系管理员'});
        }
    )
  }

  // 表单数据清空
  const formDataClear = () => {
    Object.assign(tableData.formData, {
      id: '',
      name: '',
      releaseTime: '',
      description: '',
      singerId: tableData.singerId,
      singerName: '',
      musicTotal: 0,
    })
  }

  // 新增专辑
  const addAlbum = async () => {
    await requestHandler.addAlbum(tableData.formData).then(
        res => {
          tableDataInit();
          ElMessage({type: 'success', message: '添加成功'});
        },
        error => {
          ElMessage({type: 'danger', message: '添加失败，请重试。。。'});
        }
    )
    tableData.dialog.addAlbum.isShow = Boolean(false);
  }

  // 显示修改专辑弹窗
  const showEditDialog = ({row}) => {
    Object.assign(tableData.formData, row);
    tableData.dialog.editAlbum.isShow = Boolean(true);
  }

  // 修改专辑
  const editAlbum = async () => {
    await requestHandler.editAlbum(tableData.formData).then(
        res => {
          const index = tableData.entityData.findIndex(item => item.id === tableData.formData.id);
          Object.assign(tableData.entityData[index], tableData.formData);
          ElMessage({type: 'success', message: '专辑修改成功'});
        },
        error => {
          ElMessage({type: 'danger', message: '专辑修改失败，请重试。。。'});
        }
    )
    tableData.dialog.editAlbum.isShow = Boolean(false);
  }

  const handleSelectionChange = (rows) => {
    tableData.dialog.delAlbum.data.albumIds = rows.map(item => item.id);
  }

  // 删除专辑
  const delAlbum = async () => {
    await requestHandler.delAlbum(tableData.dialog.delAlbum.data).then(
        res => {
          tableDataInit();
          ElMessage({type: 'success', message: '专辑删除成功'});
        },
        error => {
          ElMessage({type: 'danger', message: '专辑删除失败，请重试。。。'});
        }
    )
    tableData.dialog.delAlbum.isShow = Boolean(false);
  }
</script>

<style scoped>
</style>