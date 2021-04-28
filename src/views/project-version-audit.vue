<template>
  <div v-cloak style="padding:0 20px">
    <div class="breadcrumb-buttons-bar">
      <Button @click="back" size="small" type="default" icon="ios-arrow-back" >返回</Button>
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
        <a href="javascript:;"  @click="toLinkParams({name:'project-version-scene',query:{versionId:row.id,projectId:$route.query.id}})">场景管理</a>
      </template>

      <template slot="editPeple" slot-scope="{row}">
        <template v-if="row.versionState=='待审核'" >
          <Button size="small" type="success" @click="openPublishModel=true;currentId=row.id;publishType=1" style="margin-right:10px">通过</Button>
          <Button size="small" type="error" @click="openPublishModel=true;currentId=row.id;publishType=0">驳回</Button>
        </template>
        <span v-else>----</span>
      </template>

    </Table>

    <publishModel v-if="openPublishModel" :id="currentId" :open="openPublishModel" :publishType="publishType" />

  </div>
</template>

<script>
import publishModel from "@/views/project-version-audit-publish.vue";
import { GetHeight } from "@/mixins/mixins";
export default {
  components: { publishModel },
  mixins: [GetHeight],
  data() {
    return {
      openPublishModel: false,
      tableLoading:false,
      editData: {},
      publishType:1,
      columns: [
        {
          title: "版本编号",
          key: "versionNo",
          minWidth: 100
        },
        {
          title: "版本名称",
          key: "versionName",
          minWidth: 100
        },
        {
          title: "版本状态",
          key: "versionState",
          minWidth: 100
        },
        {
          title: "审核意见",
          key: "auditOpinion",
          minWidth: 150,
        },
        {
          title: "审核",
          slot: "editPeple",
          width: 200,
          align:'center'
        },
        {
          title: "操作",
          slot: "action",
          width: 200,
          align:'center'
        }
      ],
      tableData: []
    };
  },
  computed: {},
  mounted() {
    // this.$log(GetHeight);
    this.getData()
  },
  methods: {
    getData() {
      var _this = this;
      _this.tableLoading = true;
      _this.$http
        .get(`/edition/list/${_this.$route.query.id}`)
        .then(function(res) {
          _this.tableData = res.data.data;
          _this.tableLoading = false;
        })
        .catch(function(error) {
          _this.tableLoading = false;
          // console.log(error);
        });
    },
    del(id){
      var _this = this;
      _this.$Modal.confirm({
          title: "温馨提示",
          content: "<p>你确定要删除选中版本吗？</p>",
          onOk: () => {
            _this.$http
              .delete(`/edition/deleteVersionById?versionId=${id}`)
              .then(res => {
                if (res) {
                  _this.getData()
                } 
              });
          }
        });
      
    },
    edit(data) {
      this.editData = data;
      this.openEditModel = true;
    },
    show(data) {
      this.showData = data;
      this.openShowModel = true;
    }
  }
};
</script>
<style scoped>
[v-cloak] {
  display: none;
}
</style>