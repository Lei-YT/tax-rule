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
              v-model="examineNote"
              clearable
              size="small"
              type="text"
              placeholder="请输入..."
              style="width:120px"
            />
          </div>
          <div style="margin-right:15px">
            审批人员：
            <Select size="small" v-model="examineName" style="width:120px">
              <Option v-for="item in userList" :value="item.name" :key="item.id">{{ item.name }}（{{item.username}}）</Option>
            </Select>
          </div>
          <div style="margin-right:15px">
            操作人员：
            <Select size="small" v-model="operateName" style="width:120px">
              <Option v-for="item in userList" :value="item.name" :key="item.id">{{ item.name }}（{{item.username}}）</Option>
            </Select>
          </div>
          <div style="margin-right:15px">
            审批时间：
            <DatePicker size="small"  @on-change="operateTime = $event" type="date" placeholder="请选择..." style="width: 120px"></DatePicker>
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


      <template slot="examineResult" slot-scope="{row}">
       <span v-if="row.examineResult" style="color:#19be6b">通过</span>
       <span v-else style="color:#ed4014">不通过</span>
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
      examineNote: "",
      examineName: "",
      operateName:'',
      operateTime:"",
      columns: [
        {
          title: "审批编号",
          key: "id",
          width: 90
        },
        {
          title: "审批时间",
          key: "examineTime",
          width: 180
        },
        {
          title: "审批人员",
          key: "examineName",
          width: 150
        },
        {
          title: "提交时间",
          key: "operateTime",
          width: 150
        },
        {
          title: "提交人员",
          key: "operateName",
          width: 150
        },
        {
          title: "审批内容",
          key: "examineNote",
          width: 300
        },
        {
          title: "审批结果",
          slot: "examineResult",
          width: 150
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
        .post("/log/examineLogs", {
          examineNote: _this.examineNote,
          examineName: _this.examineName,
          operateName: _this.operateName,
          operateTime: _this.operateTime,
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