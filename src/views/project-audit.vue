<template>
  <div v-cloak style="padding:0 20px">
    <div ref="top" style="height:20px"></div>

    <Table
      :loading="tableLoading"
      size="small"
      :max-height="divHeight"
      border
      :columns="columns"
      :data="tableData"
    >
      <template slot="audit" slot-scope="{row}">
        <template v-if="row.projectState=='待审核'">
          <Button  style="margin-right:10px" size="small" type="success" @click="currentId=row.id;openPublishModel=true;publishType=1">通过</Button>
          <Button size="small" type="error" @click="currentId=row.id;openPublishModel=true;publishType=0">驳回</Button>
        </template>
      </template>

      <template slot="editPeple" slot-scope="{row}">
        <a
          href="javascript:;"
          style="margin-right:10px"
          @click.prevent="openPeopleModel = true;currentId = row.id"
        >更改</a>
      </template>
    </Table>

    <peopleModel v-if="openPeopleModel" :id="currentId" :open="openPeopleModel" />
    <publishModel v-if="openPublishModel" :id="currentId" :open="openPublishModel" :publishType="publishType" />
    
  </div>
</template>

<script>
import publishModel from "@/views/project-audit-publish.vue";
import peopleModel from "@/views/project-list-people.vue";
import { GetHeight } from "@/mixins/mixins";
export default {
  components: { peopleModel,publishModel },
  mixins: [GetHeight],
  data() {
    return {
      openPeopleModel: false,
      currentId: "",
      openPublishModel:false,
      publishType:1,
      columns: [
        {
          title: "项目代码",
          key: "projectCode",
          minWidth: 120
        },
        {
          title: "项目名称",
          key: "projectName",
          minWidth: 200
        },
        {
          title: "项目状态",
          key: "projectState",
          width: 100
        },
        {
          title: "审核信息",
          key: "auditMessage",
          minWidth: 100
        },
        {
          title: "审核意见",
          key: "auditOpinion",
          minWidth: 150
        },
        {
          title: "审核",
          slot: "audit",
          width: 150,
          align: "center"
        },
        {
          title: "更改项目人员",
          slot: "editPeple",
          width: 120,
          align: "center"
        }
      ],
      tableData: [],
      tableLoading:false
    };
  },
  computed: {},
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      var _this = this;
      _this.tableLoading = true;
      _this.$http.get("/item/list").then(function(res) {
        if (res) {
          _this.tableData = res.data.data;
          _this.tableLoading = false;
        }
      });
    }
  }
};
</script>
<style scoped>
[v-cloak] {
  display: none;
}
</style>