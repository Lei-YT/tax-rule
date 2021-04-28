<template>
  <div v-cloak style="padding:0 20px">
    <div class="breadcrumb-buttons-bar">
      <Button icon="md-add" type="warning" size="small" @click="openAddModel=true">添加人员</Button>
    </div>

    <div ref="top">
      <div style="height:15px"></div>
      <div flex>
        <div flex-box="1" flex class="search-title">
          <div style="margin-right:15px">
            姓名：
            <Input
              v-model="username"
              clearable
              size="small"
              type="text"
              placeholder="请输入..."
              style="width:120px"
            />
          </div>
          <div style="margin-right:15px">
            职务：
            <Select size="small" v-model="postId" style="width:200px">
              <Option v-for="item in postList" :value="item.id" :key="item.id">{{ item.postName }}</Option>
            </Select>
          </div>
        </div>
        <div flex-box="0" flex="cross:bottom">
          <Button size="small" type="primary" icon="ios-search" @click="getData">查询</Button>
        </div>
      </div>
      <div style="height:15px"></div>
    </div>

    <Table
      @on-selection-change="getTableIds"
      :loading="tableLoading"
      size="small"
      :max-height="divHeight"
      border
      :columns="columns"
      :data="tableData"
    >


      <template slot="status" slot-scope="{row}">
        <a v-show="row.enabled" href="javascript:;" style="margin-right:10px;color:#19be6b"  @click="setState(row.id,0)">启用中</a>
        <a v-show="!row.enabled" href="javascript:;" style="margin-right:10px;color:#999"  @click="setState(row.id,1)">禁用中</a>
      </template>

      <template slot="action" slot-scope="{row}">
        <a href="javascript:;" style="margin-right:10px" @click="edit(row,'ziwu')">职务</a>
        <a href="javascript:;" style="margin-right:10px" @click="edit(row,'edit')">编辑</a>
        <a href="javascript:;" style="margin-right:10px" @click="editPassword(row)">密码</a>
        <a @click="del(row.id)" href="javascript:;">删除</a>
      </template>

    </Table>

    <div ref="footer">
      <div style="height:10px"></div>
      <div flex>
        <div flex-box="1">
          <!-- <Button type="warning" size="small" @click="delChange">删除</Button> -->
        </div>
        <div flex-box="0">
          <Page
            transfer
            @on-change="changePage"
            @on-page-size-change="changeSize"
            :total="total"
            :current="page"
            :page-size-opts="pageSizeOpts"
            :page-size="size"
            show-total
            size="small"
            show-elevator
            show-sizer
          />
        </div>
      </div>
      <div style="height:10px"></div>
    </div>

    <addModel v-if="openAddModel" :open="openAddModel" :postList="postList" />

    <editModel v-if="openEditModel" :data="editData" :open="openEditModel" :postList="postList" :editType="editType" />

    <passwordModel v-if="openPasswordModel" :data="editData" :open="openPasswordModel" />
  </div>
</template>

<script>
import addModel from "@/views/auth-people-add.vue";
import editModel from "@/views/auth-people-edit.vue";
import passwordModel from "@/views/auth-people-edit-password.vue";
import { GetHeight, page } from "@/mixins/mixins";
export default {
  components: { addModel, editModel, passwordModel },
  mixins: [GetHeight, page],
  data() {
    return {
      openAddModel: false,
      openEditModel: false,
      openPasswordModel: false,
      editData: {},
      editType:'edit',
      username: "",
      postId: "",
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center",
          fixed: "left"
        },
        {
          title: "ID",
          key: "id",
          minWidth: 80
        },
        {
          title: "姓名",
          key: "name",
          minWidth: 150
        },
        {
          title: "账号",
          key: "username",
          minWidth: 150
        },
        {
          title: "职务",
          key: "postName",
          minWidth: 300
        },
        {
          title: "启用状态",
          slot: "status",
          width: 120
        },
        {
          title: "操作",
          slot: "action",
          width: 180,
          fixed: "right"
        }
      ],
      tableData: [],
      postList: []
    };
  },
  computed: {},
  mounted() {
    // this.$log(GetHeight);
    this.getPostList();
    this.getData()
  },
  methods: {
    getData() {
      var _this = this;
      _this.tableLoading = true;
      _this.$http
        .post("/user/getUserList", {
          username: _this.username,
          postId: _this.postId,
          pageNum: _this.page,
          pageSize: _this.size
        })
        .then(function(res) {
          _this.tableData = res.data.data.list;
          _this.total = res.data.data.total;
          _this.tableLoading = false;
        });
    },
    setState(id,state) {
      var _this = this;
      _this.$http
        .put("/user/enabled",{
          id: id,
          enabled: state,
        })
        .then(function(res) {
          if(res){
            _this._M('操作成功')
            _this.getData()
          }
        })
    },
    del(id) {
      let _this = this;
      _this.$Modal.confirm({
        title: "温馨提示",
        content: "<p>你确定要删除选中数据吗</p>",
        onOk: () => {
          _this.$http.delete(`/user/delete/${id}`).then(res => {
            if (res) {
              _this.getData();
            }
          });
        }
      });
    },
    edit(data,type) {
      this.editData = data;
      this.openEditModel = true;
      this.editType = type;
    },
    editPassword(data) {
      this.editData = data;
      this.openPasswordModel = true;
    },
    show(data) {
      this.showData = data;
      this.openShowModel = true;
    },
    getPostList() {
      var _this = this;
      _this.tableLoading = true;
      _this.$http.get("/user/getPostList").then(function(res) {
        _this.postList = res.data.data;
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