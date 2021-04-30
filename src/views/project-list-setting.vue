<template>
  <div v-cloak>
    <Modal
      v-model="isShow"
      width="860"
      :mask-closable="false"
      @on-cancel="cancel"
    >
      <p slot="header">
        <b>预警设置</b>
      </p>

      <div>
        <Table
          size="small"
          border
          :columns="warningColumns"
          :data="warningData"
          :height="400"
        >
          <template slot-scope="{ row, index }" slot="grade">
            <Input
              type="text"
              v-model="editObject.grade"
              v-if="editIndex === index"
            />
            <span v-else>{{ row.grade }}</span>
          </template>
          <template slot-scope="{ row, index }" slot="weight">
            <Input
              type="text"
              v-model="editObject.weight"
              v-if="editIndex === index"
            />
            <span v-else>{{ row.weight }}</span>
          </template>
          <template slot="enabled" slot-scope="{ row, index }">
            <Select
              v-if="editIndex === index"
              size="small"
              v-model="editObject.enabled"
            >
              <Option :value="true">启用</Option>
              <Option :value="false">停用</Option>
            </Select>
            <span v-else>{{ row.enabled == 0 ? "停用" : "启用" }}</span>
          </template>
          <template slot="color" slot-scope="{ row, index }">
            <ColorPicker
              transfer
              recommend
              v-model="editObject.color"
              v-if="editIndex === index"
            />
            <div
              v-else
              class="color-box"
              :style="{
                width: '18px',
                height: '18px',
                'background-color': row.color,
              }"
            ></div>
          </template>
          <template slot-scope="{ row, index }" slot="action">
            <div v-if="editIndex === index">
              <Button
                size="small"
                @click="handleSave(index)"
                style="margin-right: 3px; color: #3399ff"
                >保存</Button
              >
              <Button size="small" @click="handleRowCancel(index)">取消</Button>
            </div>
            <div v-else>
              <Button
                size="small"
                @click="handleEdit(row, index)"
                style="margin-right: 3px; color: #3399ff"
                >编辑</Button
              >
              <Button
                size="small"
                @click="del(row, index)"
                style="margin-right: 3px; color: #f00"
                >删除</Button
              >
            </div>
          </template>
          <div slot="footer" class="table-footer">
            <Button
              size="small"
              type="dashed"
              @click="handleAddRow"
              style="color: #3399ff"
              >添加一行</Button
            >
          </div>
        </Table>
      </div>

      <div slot="footer" flex>
        <div flex-box="1"></div>
        <div flex-box="0">
          <Button @click="cancel">关闭</Button>
        </div>
        <!-- <div flex-box="0">
          <Button :loading="submitLoading" type="success" @click="save"
            >提交</Button
          >
        </div> -->
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  props: ["open", "projectId", "list"],
  data() {
    return {
      isShow: false,
      formData: {
        versionNo: "",
        versionName: "",
        projectId: this.projectId,
        versionId: "0",
      },
      submitLoading: false,
      warningColumns: [
        {
          title: "序号",
          type: "index",
          minWidth: 10,
        },
        {
          title: "预警等级",
          slot: "grade",
          minWidth: 30,
        },
        {
          title: "预警权重",
          slot: "weight",
          minWidth: 30,
        },
        {
          title: "启用/停用",
          slot: "enabled",
          minWidth: 30,
        },
        {
          title: "色块设置",
          slot: "color",
          minWidth: 30,
        },
        {
          title: "操作",
          slot: "action",
          minWidth: 60,
        },
      ],
      warningData: [],
      editIndex: -1,
      editObject: {},
      rowAction: "edit",
      initRow: { grade: "", weight: "", enabled: 0, color: "#f00" },
    };
  },
  computed: {},
  mounted() {
    var _this = this;
    _this.isShow = _this.open;
    _this.getWarning();
  },
  methods: {
    handleEdit(row, index) {
      const _this = this;
      _this.editObject = Object.assign({}, row);
      _this.editIndex = (index);
    },
    handleSave(index) {
      this.warningData[index].grade = this.editObject.grade;
      this.warningData[index].weight = this.editObject.weight;
      this.warningData[index].enabled = this.editObject.enabled;
      this.warningData[index].color = this.editObject.color;
      console.log(this.rowAction)
      if (this.rowAction == 'add') {
        this.addSave(index);
      } else {
        this.editSave(index);
      }
      this.editIndex = -1;
      this.rowAction = "";
      this.editObject = {};
    },
    handleRowCancel(index) {
      if (this.rowAction == "add") {
        this.warningData.splice(index, 1);
      }
      this.editIndex = -1;
      this.rowAction = "";
      this.editObject = {};
    },
    handleAddRow() {
      if (this.rowAction == "add") {
        this._N("请先保存");
        return false;
      }
      this.editObject = {};
      this.warningData.push({
        grade: "",
        weight: "",
        enabled: 0,
        color: "#f00",
      });
      const len = this.warningData.length;
      this.editIndex = len - 1;
      this.warningData[len - 1].grade = "";
      this.warningData[len - 1].weight = "";
      this.warningData[len - 1].enabled = 0;
      this.warningData[len - 1].color = "#f00";
      this.handleEdit(this.warningData[len - 1], this.editIndex);
      this.rowAction = "add";
    },
    getWarning() {
      const _this = this;
      this.submitLoading = true;
      this.$http.get(`warn/list/${this.projectId}`).then((res) => {
        if (res) {
          _this.warningData = res.data.data;
          _this.submitLoading = false;
        }
      });
    },
    addSave(index) {
      var _this = this;
      _this.submitLoading = true;
      let formData = _this.warningData[index];
      delete formData.createTime;
      delete formData.modifyTime;
      formData.projectId = _this.projectId;
      formData.weight = Number(formData.weight);
      _this.$http.post("/warn/append", formData).then((res) => {
        if (res) {
          _this.getWarning();
        } else {
          _this.submitLoading = false;
        }
      });
    },
    editSave(index) {
      var _this = this;
      _this.submitLoading = true;
      let formData = _this.warningData[index];
      delete formData.createTime;
      delete formData.modifyTime;
      formData.projectId = _this.projectId;
      formData.weight = Number(formData.weight);
      _this.$http.put("/warn/modify", formData).then((res) => {
        if (res) {
          _this.getWarning();
        } else {
          _this.submitLoading = false;
        }
      });
    },
    del(row, index){
      var _this = this;
      _this.$Modal.confirm({
        title: "温馨提示",
        content: "<p>你确定要删除吗</p>",
        onOk: () => {
          _this.$http.delete(`/warn/delete/${row.id}`).then(res => {
            if (res) {
              _this.warningData.splice(index, 1);
            }
          });
        }
      });
    },
    cancel() {
      this.$parent.openSettingModel = false;
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
  padding: 10px 0;
}
.form-item .form-item-title {
  margin-bottom: 5px;
  overflow: hidden;
}
.table-footer {
  padding: 5px;
  text-align: right;
}
</style>
<style>
.diy-model-body .ivu-modal-body {
  height: 500px;
  overflow-y: auto;
}
</style>

