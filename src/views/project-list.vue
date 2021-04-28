<template>
  <div
    v-cloak
    :style="`height:${divHeight}px;padding:0 15px;background-color:#fff;overflow-y:scroll`"
  >
    <div class="breadcrumb-buttons-bar">
      <Button icon="md-add" type="warning" size="small" @click="openAddModel=true">添加项目</Button>
    </div>

    <div style="height:15px"></div>

    <template v-if="items.length">
      <template v-for="(vo,index) in items">
        <div class="item" :key="index">
          <div style="padding:20px 15px" flex="main:justify">
            <div flex="cross:center">
              <h4>{{vo.projectName}}（{{vo.projectCode}}）</h4>
              <span v-if="vo.projectState=='未发布'" style="color:#19be6b">（{{vo.projectState}}）</span>
              <span v-if="vo.projectState=='待审核'" style="color:#5cadff">（{{vo.projectState}}）</span>
              <span v-if="vo.projectState=='已发布'" style="color:#ed4014">（{{vo.projectState}}）</span>
              <p style="margin-left:10px;color:#777">审核意见：{{vo.auditOpinion||'---'}}</p>
            </div>

            <div>
              <Tag
                class="shubiao"
                color="success"
                v-if="vo.projectState=='未发布'"
                @click.native="currentId=vo.id;openPublishModel=true;publishType=1"
              >发布</Tag>
              <Tag
                class="shubiao"
                color="error"
                v-if="vo.projectState=='已发布'"
                @click.native="currentId=vo.id;openPublishModel=true;publishType=0"
              >停用</Tag>
            </div>
          </div>
          <div flex="main:justify" style="padding:15px;background-color:#f9f9f9">
            <div style>
              <Button
                size="small"
                type="success"
                @click="toLinkParams({name:'project-data',query:{id:vo.id}})"
                style="margin-right:10px"
              >
                <Icon custom="iconfont icon-form" size="18" style="margin-right:3px" />数据字典
              </Button>

              <Button
                size="small"
                type="success"
                @click="toLinkParams({name:'project-version',query:{projectId:vo.id}})"
                style="margin-right:10px"
              >
                <Icon custom="iconfont icon-read" size="18" style="margin-right:3px" />版本管理
              </Button>
              <Button
                size="small"
                type="success"
                @click="toLinkParams({name:'project-version-audit',query:{id:vo.id}})"
                style="margin-right:10px"
              >
                <Icon custom="iconfont icon-post" size="18" style="margin-right:3px" />版本审核
              </Button>
              <Button size="small" type="success" @click="openTestModel = true;currentId = vo.id">
                <Icon custom="iconfont icon-light" size="18" style="margin-right:3px" />业务测试
              </Button>
            </div>
            <div style>
              <Button
                size="small"
                type="dashed"
                style="margin-right:10px"
                @click.prevent="openPeopleModel = true;currentId = vo.id"
              >更改人员</Button>
              <Button
                size="small"
                type="dashed"
                style="margin-right:10px"
                @click.prevent="editData=vo;openEditModel=true"
              >编辑</Button>
              <Button size="small" type="dashed" @click.prevent="del(index,vo.id)">删除</Button>
            </div>
          </div>
        </div>
      </template>
      <div style="height:15px"></div>
    </template>

    <div v-else>数据加载中...</div>

    <addModel v-if="openAddModel" :open="openAddModel" />
    <editModel v-if="openEditModel" :data="editData" :open="openEditModel" />
    <peopleModel v-if="openPeopleModel" :id="currentId" :open="openPeopleModel" />
    <publishModel
      v-if="openPublishModel"
      :id="currentId"
      :open="openPublishModel"
      :publishType="publishType"
    />

    <testModel v-if="openTestModel" :projectId="currentId" :open="openTestModel" />
  </div>
</template>

<script>
import addModel from "@/views/project-list-add.vue";
import editModel from "@/views/project-list-edit.vue";
import peopleModel from "@/views/project-list-people.vue";
import publishModel from "@/views/project-list-publish.vue";
import testModel from "@/views/test-project.vue";
import { GetHeight } from "@/mixins/mixins";

export default {
  components: { addModel, editModel, peopleModel, publishModel, testModel },
  mixins: [GetHeight],
  data() {
    return {
      openAddModel: false,
      openEditModel: false,
      openPeopleModel: false,
      openPublishModel: false,
      openTestModel: false,
      tableLoading: false,
      publishType: 1,
      editData: {},
      currentId: "",
      items: [],
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
      _this.$http.get("/item/list").then(function (res) {
        if (res) {
          _this.items = res.data.data;
          _this.tableLoading = false;
        }
      });
    },
    del(index, id) {
      let _this = this;
      _this.$Modal.confirm({
        title: "温馨提示",
        content: "<p>你确定要删除选中的项目吗？</p>",
        onOk: () => {
          _this.$http
            .post("item/deleteItem", {
              id: id,
            })
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
.item {
  background-color: #fff;
  border: #eee 15px solid;
  /* box-shadow: 3px 3px 1px rgba(0, 0, 0, 0.1); */
  /* margin-bottom: 10px; */
  /* border-radius: 5px; */
}
</style>
