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
      openPeopleModel: false,
      currentId: "",
      openPublishModel:false,
      publishType:1,
      columns: [
        {
          title: "标题",
          key: "examineContent",
          minWidth: 100
        },
        {
          title: "发布人",
          key: "name",
          width: 150,
          align: "center"
        },
        {
          title: "日期",
          key: "examineTime",
          width: 150,
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
    // for(var i=0;i<20;i++){
    //   this.tableData.push(
    //     {
    //       title:'【审批消息】您发起的龙湖项目发布审核通过',
    //       name:'闫鹏',
    //       created_at:'2020-05-06 09:00'
    //     }
    //   )
    // }
  },
  methods: {
    getData() {
      var _this = this;
      _this.tableLoading = true;
      _this.$http.post("/message/getMessage",{
        pageNum: _this.page,
        pageSize: _this.size
      }).then(function(res) {
        if (res) {
          _this.tableData = res.data.data.list;
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