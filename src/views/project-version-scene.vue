<template>
  <div v-cloak style="padding:0 20px">
    <div class="breadcrumb-buttons-bar">
      <Button
        @click="toLinkParams({name:'project-version',query:{projectId:$route.query.projectId}})"
        size="small"
        type="default"
        icon="ios-arrow-back"
        style="margin-right:10px"
      >返回</Button>
      <Button
        icon="md-add"
        type="warning"
        size="small"
        @click="openAddImageModel=true"
        style="margin-right:10px"
      >选择影像场景</Button>
      <Button icon="md-add" type="warning" size="small" @click="openAddModel=true">新增场景</Button>
    </div>

    <div ref="top">
      <div style="height:15px"></div>
    </div>

    <Table
      :loading="tableLoading"
      size="small"
      :max-height="divHeight"
      border
      :columns="columns"
      :data="tableData"
    >
      <template slot="action" slot-scope="{row}">
        <a
          href="javascript:;"
          style="margin-right:15px"
          v-if="!row.imageKey"
          @click="openEditModel=true;editData=row"
        >修改</a>
        <a href="javascript:;" style="margin-right:15px" @click="del(row.id)">删除</a>
        <a
          href="javascript:;"
          @click="toLinkParams({name:'project-version-scene-rule',query:{id:row.id,versionId:$route.query.versionId,projectId:$route.query.projectId}})"
        >规则管理</a>
      </template>

      <template slot="isForce" slot-scope="{row}">{{row.isForce?'是':'否'}}</template>
    </Table>

    <addModel v-if="openAddModel" :open="openAddModel" :list="tableData" />

    <addImageModel v-if="openAddImageModel" :open="openAddImageModel" :list="tableData" />

    <editModel v-if="openEditModel" :data="editData" :open="openEditModel" />
  </div>
</template>

<script>
import addModel from "@/views/project-version-scene-add.vue";
import addImageModel from "@/views/project-version-scene-add-image.vue";
import editModel from "@/views/project-version-scene-edit.vue";
import showModel from "@/views/example-table-show.vue";
import { GetHeight } from "@/mixins/mixins";
export default {
  components: { addModel, editModel, addImageModel },
  mixins: [GetHeight],
  data() {
    return {
      openAddModel: false,
      openEditModel: false,
      openAddImageModel: false,
      tableLoading: false,
      editData: {},
      columns: [
        {
          title: "序号",
          key: "id",
          sortable: true,
          width: 80,
        },
        {
          title: "规则场景",
          key: "sceneName",
          minWidth: 100,
        },
        {
          title: "KEY",
          key: "imageKey",
          minWidth: 100,
        },
        {
          title: "是否强制执行",
          slot: "isForce",
          minWidth: 100,
        },
        {
          title: "操作",
          slot: "action",
          width: 200,
          align: "center",
        },
      ],
      tableData: [],
    };
  },
  computed: {},
  mounted() {
    // this.$log(GetHeight);
    this.getData();
  },
  methods: {
    getData() {
      var _this = this;
      _this.tableLoading = true;
      _this.$http
        .get("/edition/scene/getSceneById", {
          params: {
            versionId: _this.$route.query.versionId,
          },
        })
        .then(function (res) {
          if (res) {
            _this.tableData = res.data.data;
            _this.tableLoading = false;
          } else {
            _this.tableLoading = false;
          }
        });
    },
    del(id) {
      var _this = this;
      _this.$Modal.confirm({
        title: "温馨提示",
        content: "<p>你确定要删除场景及下级规则吗？</p>",
        onOk: () => {
          _this.$http
            .delete(`/edition/scene/deleteSceneById?sceneId=${id}`)
            .then((res) => {
              if (res) {
                _this.getData();
              }
            });
        },
      });
    },
  },
};
</script>
<style scoped>
[v-cloak] {
  display: none;
}
</style>