<template>
  <div v-cloak style="padding:0 20px">
    <!-- <div class="breadcrumb-buttons-bar">
      <Button icon="md-add" type="warning" size="small" @click="openAddModel=true">添加人员</Button>
    </div> -->

    <div ref="top">
      <div style="height:15px"></div>
      <div flex>
        <div flex-box="1" flex class="search-title">
          <div style="margin-right:15px">
            关键词：
            <Input
              v-model="action"
              clearable
              size="small"
              type="text"
              placeholder="请输入..."
              style="width:120px"
            />
          </div>
          <div style="margin-right:15px">
            操作人员：
            <!-- <Input
              v-model="userId"
              clearable
              size="small"
              type="text"
              placeholder="请输入..."
              style="width:120px"
            /> -->
            <Select size="small" v-model="userId" style="width:120px">
              <Option v-for="item in userList" :value="item.id" :key="item.id">{{ item.name }}（{{item.username}}）</Option>
            </Select>
          </div>
          <div style="margin-right:15px">
            操作时间：
            <DatePicker size="small"  @on-change="opTime = $event" type="date" placeholder="请选择..." style="width: 120px"></DatePicker>
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

  </div>
</template>

<script>

import { GetHeight, page } from "@/mixins/mixins";
export default {
  mixins: [GetHeight, page],
  data() {
    return {
      action: "",
      userId: "",
      opTime:"",
      columns: [
        {
          title: "操作编号",
          key: "opNo",
          width: 150
        },
        {
          title: "操作时间",
          key: "opTime",
          width: 180
        },
        {
          title: "操作人员",
          key: "name",
          width: 150
        },
        {
          title: "操作动作",
          key: "action",
          minWidth: 300
        }
      ],
      tableData: [],
      userList: []
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
        .post("/log/opList", {
          action: _this.action,
          userId: _this.userId,
          opTime: _this.opTime,
          pageNum: _this.page,
          pageSize: _this.size
        })
        .then(function(res) {
          _this.tableData = res.data.data.list;
          _this.total = res.data.data.total;
          _this.tableLoading = false;
        });
    },
    getPostList() {
      var _this = this;
      _this.tableLoading = true;
      _this.$http.post("/user/getUserList",{
          username:'',
          postId:'',
          pageNum:1,
          pageSize:100
        }).then(function(res) {
        _this.userList = res.data.data.list;
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