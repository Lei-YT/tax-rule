<template>
  <div v-cloak style="padding:0 10px">
    <div class="top-tools">
      <Button @click="back" size="small" icon="ios-arrow-back">返回</Button>
    </div>

    <div style="height:15px"></div>

    <div style="height:500px">
      <Split v-model="split">
        <div slot="left" style="margin:0 5px">
          <div
            style="height:40px;background-color:#f7f7f7;border:#eee 1px solid;border-bottom:none"
            flex="cross:center"
          >
            <h4 flex-box="1" style="margin-left:20px">表管理</h4>
            <span flex-box="0" style="margin-right:20px">
              <Button
                size="small"
                slot="extra"
                type="dashed"
                icon="md-add"
                @click="showTableModel"
              >添加</Button>
            </span>
          </div>
          <Table
            highlight-row
            @on-row-click="rowChange"
            :height="458"
            size="small"
            border
            :columns="tableColumns"
            :data="tableData"
            :loading="tableLoading"
          >
            <template slot="action" slot-scope="{row}">
              <a
                href="javascript:;"
                style="margin-right:10px"
                @click.stop="openTableEditModel=true;tableEditData=row"
              >修改</a>
              <a href="javascript:;" @click.stop="delTable(row.id)">删除</a>
            </template>
          </Table>
        </div>
        <div slot="right" style="margin:0 5px 0 10px">
          <div
            style="height:40px;background-color:#f7f7f7;border:#eee 1px solid;border-bottom:none"
            flex="cross:center"
          >
            <h4 flex-box="1" style="margin-left:20px">字段管理</h4>
            <span flex-box="0" style="margin-right:20px">
              <Button
                size="small"
                slot="extra"
                type="dashed"
                icon="md-add"
                @click="openFieldModel"
                style="margin-right:10px"
              >添加</Button>
              <Button
                size="small"
                slot="extra"
                type="dashed"
                @click="showFieldImportModel"
              >导入</Button>
            </span>
          </div>

          <Table
            :height="458"
            size="small"
            border
            :columns="fieldColumnsChange"
            :data="fieldData"
            :loading="fieldLoading"
          >
            <template slot="isTrans" slot-scope="{row}">{{row.isTrans?'是':'否'}}</template>

            <template slot="isSpecial" slot-scope="{row}">{{row.isSpecial?'是':'否'}}</template>

            <template slot="action" slot-scope="{row}">
              <a
                href="javascript:;"
                style="margin-right:10px"
                @click.stop="openFieldEditModel=true;fieldEditData=row"
              >修改</a>
              <a href="javascript:;" @click.stop="delField(row.id)">删除</a>
            </template>
          </Table>
        </div>
      </Split>
    </div>

    <div style="padding:5px">
      <Card dis-hover :padding="5">
        <p slot="title">
          JSON
          <span
            style="font-size:12px;font-weight:300;color:#999;margin-left:10px"
          >(这里有严格的JSON格式校验，如有出现提交不成功请先检查格式)</span>
        </p>
        <span slot="extra">
          <Button type="success" size="small" @click.prevent="saveJson" style="margin-left:10px">保存</Button>
        </span>
        <div>
          <jsonEditor
            :foldGutter="true"
            :matchBrackets="true"
            :styleActiveLine="true"
            :lint="true"
            scrollbarStyle="overlay"
            theme="codebox-light"
            ref="editor"
            :read-only="false"
            style="width:100%; height: 500px;"
          />
        </div>
      </Card>
      <div style="height:30px"></div>
    </div>

    <addTableModel v-if="openTableAddModel" :open="openTableAddModel" />
    <editTableModel v-if="openTableEditModel" :open="openTableEditModel" :data="tableEditData" />
    <addFieldModel
      v-if="openFieldAddModel"
      :open="openFieldAddModel"
      :projectId="Number($route.query.id)"
      :tableId="tableData[tableIndex]['id']"
      :tableType="tableType"
    />
    <editFieldModel
      v-if="openFieldEditModel"
      :open="openFieldEditModel"
      :data="fieldEditData"
      :tableType="tableType"
      :projectId="Number($route.query.id)"
    />
    <importFieldModel
      v-if="openFieldImportModel"
      :open="openFieldImportModel"
      :data="fieldEditData"
      :tableType="tableType"
      :projectId="Number($route.query.id)"
    />
  </div>
</template>

<script>
import addTableModel from "@/views/project-data-table-add.vue";
import editTableModel from "@/views/project-data-table-edit.vue";
import addFieldModel from "@/views/project-data-field-add.vue";
import editFieldModel from "@/views/project-data-field-edit.vue";
import importFieldModel from "@/views/project-data-field-import.vue";
import jsonEditor from "@/components/json-editor.vue";
export default {
  components: {
    addTableModel,
    editTableModel,
    addFieldModel,
    editFieldModel,
    importFieldModel,
    jsonEditor,
  },
  data() {
    return {
      split: 0.3,
      openTableAddModel: false,
      openTableEditModel: false,
      openFieldAddModel: false,
      openFieldEditModel: false,
      openFieldImportModel: false,
      tableColumns: [
        {
          title: "序号",
          key: "id",
          sortable: true,
          width: 80,
        },
        {
          title: "表名",
          key: "tableName",
          sortable: true,
          minWidth: 130,
        },
        {
          title: "表类型",
          key: "tableType",
          sortable: true,
          minWidth: 90,
        },
        {
          title: "操作",
          slot: "action",
          width: 100,
          align: "center",
        },
      ],
      tableData: [],
      fieldColumnsA: [
        {
          title: "序号",
          key: "id",
          sortable: true,
          width: 80,
        },
        {
          title: "字段名称",
          key: "name",
          sortable: true,
          minWidth: 100,
        },
        {
          title: "字段类型",
          key: "type",
          sortable: true,
          minWidth: 100,
        },
        {
          title: "是否必有",
          slot: "isTrans",
          minWidth: 90,
        },
        {
          title: "默认值",
          key: "defaultValue",
          minWidth: 100,
        },
        {
          title: "jsonpath",
          key: "jsonpath",
          minWidth: 150,
        },
        {
          title: "是否特殊",
          slot: "isSpecial",
          minWidth: 90,
        },
        {
          title: "备注",
          key: "remark",
          minWidth: 100,
        },
        {
          title: "操作",
          slot: "action",
          width: 100,
          align: "center",
        },
      ],
      fieldColumnsB: [
        {
          title: "字段名称",
          key: "name",
          sortable: true,
          minWidth: 100,
        },
        {
          title: "字段类型",
          key: "type",
          sortable: true,
          minWidth: 100,
        },
        {
          title: "jsonpath",
          key: "jsonpath",
          minWidth: 150,
        },
        {
          title: "是否特殊",
          slot: "isSpecial",
          minWidth: 90,
        },
        {
          title: "备注",
          key: "remark",
          minWidth: 100,
        },
        {
          title: "操作",
          slot: "action",
          width: 100,
          align: "center",
        },
      ],
      fieldColumnsC: [
        {
          title: "字段名称",
          key: "name",
          sortable: true,
          minWidth: 100,
        },
        {
          title: "字段类型",
          key: "type",
          sortable: true,
          minWidth: 100,
        },
        {
          title: "jsonpath",
          key: "jsonpath",
          minWidth: 150,
        },
        {
          title: "是否特殊",
          slot: "isSpecial",
          minWidth: 90,
        },
        {
          title: "备注",
          key: "remark",
          minWidth: 100,
        },
        {
          title: "操作",
          slot: "action",
          width: 100,
          align: "center",
        },
      ],
      fieldColumnsD: [
        {
          title: "字段名称",
          key: "name",
          sortable: true,
          minWidth: 100,
        },
        {
          title: "字段类型",
          key: "type",
          sortable: true,
          minWidth: 100,
        },
        {
          title: "是否特殊",
          slot: "isSpecial",
          minWidth: 90,
        },
        {
          title: "备注",
          key: "remark",
          minWidth: 100,
        },
        {
          title: "操作",
          slot: "action",
          width: 100,
          align: "center",
        },
      ],
      jsonData: {
        id: "",
        json: "",
        projectId: "",
      },
      fieldData: [],
      tableEditData: {},
      fieldEditData: {},
      tableIndex: null,
      tableType: null,
      tableLoading: false,
      fieldLoading: false,
      editor: null,
      isJsonData: false,
    };
  },
  computed: {
    fieldColumnsChange: function () {
      var data = this.fieldColumnsA;

      if (this.tableType == "虚拟表") {
        data = this.fieldColumnsB;
      } else if (this.tableType == "数据表") {
        data = this.fieldColumnsC;
      } else if (this.tableType == "规则表") {
        data = this.fieldColumnsD;
      }

      return data;
    },
  },
  mounted() {
    var _this = this;
    _this.getTableData();
    _this.getJson();
  },
  methods: {
    getTableData() {
      var _this = this;
      _this.tableLoading = true;
      _this.$http
        .get("/data/selectTableList", {
          params: {
            projectId: Number(_this.$route.query.id),
          },
        })
        .then((res) => {
          _this.tableLoading = false;
          if (res) {
            _this.tableData = res.data.data;
          }
        });
    },
    getFieldData() {
      var _this = this;
      _this.fieldLoading = true;
      _this.$http
        .get("/data/selectFieldList", {
          params: {
            tableId: _this.tableData[_this.tableIndex]["id"],
          },
        })
        .then((res) => {
          _this.fieldLoading = false;
          if (res) {
            _this.fieldData = res.data.data;
          }
        });
    },
    delTable(id) {
      var _this = this;
      _this.$Modal.confirm({
        title: "温馨提示",
        content: "<p>你确定要删除选中数据表吗？</p>",
        onOk: () => {
          _this.$http
            .delete(`/data/deleteTableById?tableId=${id}`)
            .then((res) => {
              if (res) {
                _this.getTableData();
              }
            });
        },
      });
    },
    delField(id) {
      var _this = this;
      _this.$Modal.confirm({
        title: "温馨提示",
        content: "<p>你确定要删除选中字段吗？</p>",
        onOk: () => {
          _this.$http
            .delete(`/data/deleteFieldById?fieldId=${id}`)
            .then((res) => {
              if (res) {
                _this.getFieldData();
              }
            });
        },
      });
    },
    openFieldModel() {
      if (!this.tableData[this.tableIndex]) {
        this._N("请先选择表");
        return false;
      }
      this.openFieldAddModel = true;
    },
    showFieldImportModel() {
      if (!this.tableData[this.tableIndex]) {
        this._N("请先选择表");
        return false;
      }
      this.openFieldImportModel = true;
    },
    showTableModel() {
      var _this = this;
      if (!_this.isJsonData) {
        _this._N("请先添加并保存JSON");
        return false;
      }
      _this.openTableAddModel = true;
    },
    rowChange(data, index) {
      // console.log(data.tableType);
      this.tableIndex = index;
      this.tableType = data.tableType;
      this.getFieldData();
    },
    getJson() {
      var _this = this;
      _this.$http
        .get(`/data/selectJsonByProjectId?projectId=${_this.$route.query.id}`)
        .then((res) => {
          if (res) {
            _this.jsonData.id = res.data.data.id;
            // _this.jsonData.json = res.data.data.json
            // console.log(res.data.data.json)
            _this.$refs.editor.setValue(JSON.parse(res.data.data.json));
            _this.isJsonData = true;
          }
        });
    },
    saveJson() {
      var _this = this;

      if (_this.$refs.editor.getValue() == null) {
        return false;
      }

      _this.$http
        .post(`/data/saveJson`, {
          id: _this.jsonData.id,
          projectId: _this.$route.query.id,
          json: _this.$refs.editor.getValue(),
        })
        .then((res) => {
          if (res) {
            _this.getJson();
            _this._Model("JSON数据提交成功！");
          }
        });
    },
  },
};
</script>
<style scoped>
[v-cloak] {
  display: none;
}
.form-item {
  /* border-bottom: #eee 1px solid; */
  padding: 5px 0;
}
.form-item .form-item-title {
  margin-bottom: 5px;
  overflow: hidden;
}
</style>
