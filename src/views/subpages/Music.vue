<template>
  <div class="container">
    <div class="page-handler">
      <el-input style="margin-right: 15px; width: 200px" clearable placeholder="请输入需要查询的音乐名"></el-input>
      <el-button type="primary" @click="">搜索歌曲</el-button>
      <el-button type="success" @click="">新增歌曲</el-button>
      <el-button type="danger" @click="">删除歌曲</el-button>
    </div>
    <el-table
        ref="tableRef"
        :data="tableData.entityData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        :v-loading="tableData.loading"
    >
      <el-table-column type="selection" width="55"/>
      <el-table-column property="name" label="歌曲名"/>
      <el-table-column property="singerName" label="歌手名"/>
      <el-table-column prop="albumName" label="专辑名" v-if="tableData.albumId != -1"/>
      <el-table-column label="歌曲描述">
        <template #default="props">
          {{ props.row.description }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="选项" min-width="200">
        <template #default="props">
          <el-button type="warning" size="small" @click="">修改</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增专辑弹窗 -->
    <el-dialog
        v-model="tableData.dialog.addMusic.isShow"
        title="添加歌手"
        @open="formDataClear"
    >
      <el-form
          ref="albumFormRef"
          style="max-width: 600px"
          :model="tableData.formData"
          :rules="tableData.dialog.rules"
          label-width="auto"
          status-icon
      >
        <el-form-item label="音乐名称" prop="name">
          <el-input v-model="tableData.formData.name" placeholder="音乐名称"/>
        </el-form-item>
        <el-form-item label="音乐描述" prop="description">
          <el-input v-model="tableData.formData.description" type="textarea" placeholder="音乐描述"/>
        </el-form-item>
      </el-form>


      <template #footer>
        <div class="dialog-footer">
          <el-button @click="tableData.dialog.addMusic.isShow = Boolean(false)">取消</el-button>
          <el-button type="primary" @click="addMusic">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
  import {onMounted, reactive} from "vue";
  import {MusicFormData} from "../../api/entity/formModel.ts";
  import {useRouter} from "vue-router";
  import {RequestHandler} from "../../api";
  import {ElMessage, FormRules} from "element-plus";

  /**
   * 2024/11/4 10:07
   * @author <a href="https://github.com/wzh-devin">devin</a>
   * @description 歌曲管理
   * @version 1.0
   * @since 1.0
   */
  const router = useRouter();
  const requestHandler = RequestHandler.getMusicRequestInstance();

  const tableData = reactive({
    singerId: router.currentRoute.value.query['singerId'],
    albumId: router.currentRoute.value.query['albumId'] || -1,
    formData: reactive<MusicFormData>({}),
    entityData: Array<MusicFormData>(),
    loading: Boolean(false),
    dialog: {
      addMusic: {
        isShow: Boolean(false),
      },
      rules: reactive<FormRules<MusicFormData>>({
        name: {required: true, message: '请输入音乐名称'},
        description: {required: false}
      })
    }
  })

  onMounted(() => {
    tableDataInit();
  })

  // 表格数据初始化
  const tableDataInit = async () => {
    tableData.loading = Boolean(true);
    await requestHandler.getMusicList(tableData.singerId, tableData.albumId).then(
        res => {
          // 初始化数据
          tableData.entityData.length = 0;
          tableData.entityData.push(...res.data);
          ElMessage({type: 'success', message: '加载成功'});
        },
        error => {
          ElMessage({type: 'error', message: '加载失败, 请联系管理员'});
        }
    );
    tableData.loading = Boolean(false);
  }

  // 表单数据清空
  const formDataClear = () => {
    Object.assign(tableData.formData, {
      id: '',
      singerId: tableData.singerId,
      albumId: tableData.albumId,
      singerName: '',
      albumName: '',
      name: '',
      musicUrl: '',
      musicPicUrl: '',
      description: '',
    })
  }

  const addMusic = async () => {
    await requestHandler.addMusic(tableData.formData).then(
        res => {
          tableDataInit();
          ElMessage({type: 'success', message: '添加成功'});
        },
        error => {
          ElMessage({type: 'error', message: '添加失败, 请联系管理员'});
        }
    )
    tableData.dialog.addMusic.isShow = Boolean(false);
  }
</script>

<style scoped>

</style>