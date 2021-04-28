<template>
  <div v-cloak style="padding:0 20px">
    <div class="breadcrumb-buttons-bar">
      <Button
        @click="toLink('project-list')"
        size="small"
        type="default"
        icon="ios-arrow-back"
        style="margin-right:10px"
      >返回</Button>
      <Button icon="md-add" type="warning" size="small" @click="openAddModel=true">新增版本</Button>
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
        <a href="javascript:;" style="margin-right:15px" @click="openEditModel=true;editData=row">修改</a>
        <a href="javascript:;" style="margin-right:15px" @click="del(row.id)">删除</a>
        <a
          href="javascript:;"
          @click="toLinkParams({name:'project-version-scene',query:{versionId:row.id,projectId:$route.query.projectId}})"
        >场景管理</a>
      </template>

      <template slot="editPeple" slot-scope="{row}">
        <Button
          v-if="row.versionState=='未发布'"
          size="small"
          type="success"
          @click="openPublishModel=true;currentId=row.id;publishType=1"
        >发布</Button>
        <Button
          v-else-if="row.versionState=='已发布'"
          size="small"
          type="error"
          @click="openPublishModel=true;currentId=row.id;publishType=0"
        >停用</Button>
        <span v-else>----</span>
      </template>
    </Table>

    <addModel
      v-if="openAddModel"
      :open="openAddModel"
      :list="tableData"
      :projectId="Number($route.query.projectId)"
    />

    <editModel v-if="openEditModel" :data="editData" :open="openEditModel" :list="tableData" />

    <publishModel
      v-if="openPublishModel"
      :id="currentId"
      :open="openPublishModel"
      :publishType="publishType"
    />
  </div>
</template>

<script>
import addModel from "@/views/project-version-add.vue";
import editModel from "@/views/project-version-edit.vue";
import publishModel from "@/views/project-version-publish.vue";
import { GetHeight } from "@/mixins/mixins";
export default {
  components: { addModel, editModel, publishModel },
  mixins: [GetHeight],
  data() {
    return {
      openAddModel: false,
      openEditModel: false,
      openPublishModel: false,
      tableLoading: false,
      editData: {},
      publishType: 1,
      columns: [
        {
          title: "序号",
          key: "id",
          sortable: true,
          width: 80,
        },
        {
          title: "版本编号",
          key: "versionNo",
          minWidth: 100,
        },
        {
          title: "版本名称",
          key: "versionName",
          minWidth: 100,
        },
        {
          title: "版本状态",
          key: "versionState",
          minWidth: 100,
        },
        {
          title: "审核意见",
          key: "auditOpinion",
          minWidth: 150,
        },
        {
          title: "更改状态",
          slot: "editPeple",
          width: 100,
          align: "center",
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
        .get(`/edition/list/${_this.$route.query.projectId}`)
        .then(function (res) {
          if (res) {
            _this.tableData = res.data.data;
            _this.tableLoading = false;
          } else {
            _this.tableLoading = false;
          }
        })
        .catch(function (error) {
          _this.tableLoading = false;
          // console.log(error);
        });
    },
    del(id) {
      var _this = this;
      _this.$Modal.confirm({
        title: "温馨提示",
        content: "<p>你确定要删除选中版本吗？</p>",
        onOk: () => {
          _this.$http
            .delete(`/edition/deleteVersionById?versionId=${id}`)
            .then((res) => {
              if (res) {
                _this.getData();
              }
            });
        },
      });
    },
    edit(data) {
      this.editData = data;
      this.openEditModel = true;
    },
    show(data) {
      this.showData = data;
      this.openShowModel = true;
    },
  },
};
</script>
<style scoped>
[v-cloak] {
  display: none;
}
</style>