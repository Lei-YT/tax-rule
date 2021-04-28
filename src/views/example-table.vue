<template>
  <div v-cloak style="padding:0 20px">
    <div class="breadcrumb-buttons-bar">
      <Button icon="md-add" type="default" size="small" @click="openAddModel=true">添加</Button>
    </div>

    <div ref="top">
      <div style="height:15px"></div>
      <div flex>
        <div flex-box="1" flex>
          <div style="margin-right:10px">
            <Poptip trigger="hover" content="请输入姓名">
              <Input type="text" placeholder="姓名" style="width:auto" />
            </Poptip>
          </div>
          <div style="margin-right:10px">
            <Poptip trigger="hover" content="请输入电话">
              <Input type="text" placeholder="电话" style="width:auto" />
            </Poptip>
          </div>
          <div style="margin-right:10px">
            <Poptip trigger="hover" content="请输入email">
              <Input type="text" placeholder="Email" style="width:auto" />
            </Poptip>
          </div>
        </div>
        <div flex-box="0">
          <Button type="primary" icon="ios-search">查询</Button>
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
      <template slot="action" slot-scope="{row}">
        <a href="javascript:;" style="margin-right:10px" @click="show(row)">查看详情</a>
        <a href="javascript:;" style="margin-right:10px" @click="edit(row)">编辑</a>
        <Poptip transfer confirm title="确定要删除吗?" @on-ok="del(row.id)">
          <a href="javascript:;">删除</a>
        </Poptip>
      </template>
    </Table>

    <div ref="footer">
      <div style="height:10px"></div>
      <div flex>
        <div flex-box="1">
          <Button type="warning" size="small" @click="delChange">删除</Button>
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

    <addModel v-if="openAddModel" :open="openAddModel" />

    <editModel v-if="openEditModel" :data="editData" :open="openEditModel" />

    <showModel v-if="openShowModel" :data="showData" :open="openShowModel" />


  </div>
</template>

<script>
import addModel from "@/views/example-table-add.vue";
import editModel from "@/views/example-table-edit.vue";
import showModel from "@/views/example-table-show.vue";
import { GetHeight, page } from "@/mixins/mixins";
export default {
  components: { addModel, editModel,showModel },
  mixins: [GetHeight, page],
  data() {
    return {
      openAddModel: false,
      openEditModel: false,
      openShowModel: false,
      editData: {},
      showData: {},
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center",
          fixed: "left"
        },
        {
          title: "姓名",
          key: "name",
          minWidth: 100
        },
        {
          title: "年龄",
          key: "age",
          minWidth: 100
        },
        {
          title: "性别",
          key: "sex",
          minWidth: 100
        },
        {
          title: "电话",
          key: "phone",
          minWidth: 200
        },
        {
          title: "Email",
          key: "email",
          minWidth: 200
        },
        {
          title: "地址",
          key: "address",
          minWidth: 300
        },
        {
          title: "操作",
          slot: "action",
          minWidth: 160,
          fixed: "right"
        }
      ],
      tableData: []
    };
  },
  computed: {},
  mounted() {
    // this.$log(GetHeight);
  },
  methods: {
    getData() {
      var _this = this;
      _this.tableLoading = true;
      _this.$http
        .get("/api/getUsers")
        .then(function(res) {
          _this.tableData = res.data.data.list;
          _this.tableLoading = false;
        })
        .catch(function(error) {
          _this.tableLoading = false;
          // console.log(error);
        });
    },
    delChange() {
      console.log(this.tableIds);
    },
    del(id) {
      this._N(`这只是一个示例`);
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