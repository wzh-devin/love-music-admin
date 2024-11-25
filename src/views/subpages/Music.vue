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
      <el-table-column prop="albumName" label="专辑名" v-if="isExistAlbum"/>
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
  </div>
</template>

<script setup lang="ts">
  import {onMounted, reactive} from "vue";
  import {MusicFormData} from "../../api/entity/formModel.ts";
  import {useRouter} from "vue-router";
  import {RequestHandler} from "../../api";
  import {ElMessage} from "element-plus";

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
    albumId: router.currentRoute.value.query['albumId'],
    formData: reactive<MusicFormData>({}),
    entityData: Array<MusicFormData>(),
    loading: Boolean(false),
    dialog: {
      isShow: Boolean(false)
    }
  })

  /**
   * 判断album是否存在
   */
  const isExistAlbum = (): boolean => {
    return Boolean(tableData.albumId == undefined || null);
  }

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
</script>

<style scoped>

</style>