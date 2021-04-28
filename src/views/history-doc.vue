<template>
  <div v-cloak style="padding:0 20px">
    <!-- <div class="breadcrumb-buttons-bar">
      <Button icon="md-add" type="warning" size="small" @click="openAddModel=true">添加人员</Button>
    </div>-->

    <div ref="top">
      <div style="height:15px"></div>
      <div flex>
        <div flex-box="1" flex class="search-title">
          <div style="margin-right:15px">
            <p>审批编号：</p>
            <Input
              v-model="id"
              clearable
              size="small"
              type="text"
              placeholder="请输入..."
              style="width:120px"
            />
          </div>
          <div style="margin-right:15px">
            <p>单据编号：</p>
            <Input
              v-model="billNo"
              clearable
              size="small"
              type="text"
              placeholder="请输入..."
              style="width:120px"
            />
          </div>
          <div style="margin-right:15px">
            <p>项目名称：</p>
            <Input
              v-model="projectName"
              clearable
              size="small"
              type="text"
              placeholder="请输入..."
              style="width:120px"
            />
          </div>
          <div style="margin-right:15px">
            <p>审核结果：</p>
            <Select clearable size="small" v-model="auditResult" style="width:120px">
              <Option :value="1">通过</Option>
              <Option :value="0">不通过</Option>
            </Select>
          </div>
          <div style="margin-right:15px">
            <p>审核时间：</p>
            <DatePicker
              size="small"
              :value="auditTime"
              @on-change="auditTime = $event"
              type="date"
              placeholder="请选择..."
              style="width: 120px"
            ></DatePicker>
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
      <template slot="auditResult" slot-scope="{row}">
        <span v-if="row.auditResult" style="color:#19be6b">通过</span>
        <span v-else style="color:#ed4014">不通过</span>
        
      </template>

      <template slot="action" slot-scope="{row}">
        <Poptip transfer placement="left" width="600" v-if="formatJson(row.auditMessage).length">
          <a href="javascript:;" style="margin-right:15px">意见详情</a>
          <div class="api" slot="content" style="max-height:400px;overflow-y:auto">
            <table class="diy-table" width="100%%" border="0" cellpadding="10" cellspacing="0" v-if="_.isArray(formatJson(row.auditMessage))">
                <tbody>
                  <template v-for="(vo,index) in formatJson(row.auditMessage)">
                    <template v-for="(v,i) in vo.data">
                      <template v-for="(vv,ii) in v.messages">
                        <tr :key="ii+'--'+i+''+index+''+12" v-if="ii==0">
                            <td width="100" :rowspan="v.messages.length" align="center" valign="middle">{{vo.type}}</td>
                            <td>{{vv}}</td>
                        </tr>
                        <tr :key="ii+'-'+i+''+index" v-else>
                          <td>{{vv}}</td>
                        </tr>
                      </template>
                    </template>
                  </template>
                </tbody>
            </table>
            <div v-else>{{formatJson(row.auditMessage)}}</div>
          </div>
        </Poptip>
        <span v-else style="margin-right:20px;color:#999">意见详情</span>
        <a
          href="javascript:;"
          @click="currentId=row.projectId;testJson=row.jsonData;openTestModel=true"
          style="margin-right:15px"
        >测试</a>

        <a
          href="javascript:;"
          @click="currentId=row.projectId;openSmartLearningModal=true;smartLearningData=row"
        >智能学习</a>
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

    <testModel
      v-if="openTestModel"
      :open="openTestModel"
      :projectId="currentId"
      :testJson="testJson"
    />

    <smartLearning v-if="openSmartLearningModal" :open="openSmartLearningModal" :data="smartLearningData" />

  </div>
</template>

<script>
import smartLearning from "@/views/history-doc-smart-learning.vue";
import testModel from "@/views/test-history.vue";
import { GetHeight, page } from "@/mixins/mixins";
export default {
  components: { testModel,smartLearning },
  mixins: [GetHeight, page],
  data() {
    return {
      openSmartLearningModal:false,
      openTestModel: false,
      currentId: null,
      testJson: {},
      billNo:'',
      id: "",
      auditTime: "",
      projectName: "",
      auditResult: '',
      smartLearningData:{},
      columns: [
        {
          title: "审批编号",
          key: "id",
          minWidth:80
        },
        {
          title: "单据编号",
          key: "billNo",
          minWidth:200 
        },
        {
          title: "项目",
          key: "projectName",
          minWidth:200
        },
        {
          title: "审核结果",
          slot: "auditResult",
          minWidth:100
        },
        {
          title: "审核时间",
          key: "auditTime",
          minWidth:150
        },
        {
          title: "版本",
          key: "versionName",
          minWidth:100
        },
        // {
        //   title: "意见描述",
        //   key: "auditMessage",
        //   minWidth: 300
        // },
        {
          title: "操作",
          slot: "action",
          width: 200,
          align: "center",
          fixed: "right"
        }
      ],
      tableData: [],
      userList: []
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
        .post("/bill/getHistoryBills", {
          id: _this.id,
          billNo:_this.billNo,
          projectName: _this.projectName,
          auditResult: _this.auditResult,
          auditTime: _this.auditTime,
          pageNum: _this.page,
          pageSize: _this.size
        })
        .then(function(res) {
          _this.tableData = res.data.data.list;
          _this.total = res.data.data.total;
          _this.tableLoading = false;
        });
    },
    formatJson(value) {
      let json = JSON.parse(value);
      // console.log(json)
      if(_.isArray(json)){
        return json
      }else{
        return value
      }
    }
  },
  filters: {
    
  }
};
</script>
<style scoped>
[v-cloak] {
  display: none;
}
.diy-table{
  border-left:#eee 1px solid;
  border-top:#eee 1px solid;
}
.diy-table td{
  padding: 10px;
  border-right:#eee 1px solid;
  border-bottom:#eee 1px solid;
}
</style>