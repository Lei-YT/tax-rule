<template>
  <div v-cloak>
    <Modal
      v-model="isShow"
      width="860"
      :mask-closable="false"
      @on-cancel="cancel"
    >
      <p slot="header">
        <b>设置</b>
      </p>

      <div>
        <Table
          size="small"
          border
          :columns="warningColumns"
          :data="warningData"
          :height="400"
        >
          <template slot-scope="{ row, index }" slot="level">
            <Input
              type="text"
              v-model="editObject.level"
              v-if="editIndex === index"
            />
            <span v-else>{{ row.level }}</span>
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
              <Option :value="1">启用</Option>
              <Option :value="0">停用</Option>
            </Select>
            <span v-else>{{ row.enabled == 0 ? "停用" : "启用" }}</span>
          </template>
          <template slot="color" slot-scope="{ row, index }">
            <ColorPicker transfer recommend
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
              <Button size="small" @click="handleRowCancel(index)" style=""
                >取消</Button
              >
            </div>
            <div v-else>
              <Button
                size="small"
                @click="handleEdit(row, index)"
                style="color: #3399ff"
                >编辑</Button
              >
            </div>
          </template>
          <div slot="footer" class="table-footer" >
              <Button
                size="small"
                type="dashed"
                @click="handleAddRow"
                style="color: #3399ff"
                >添加一行</Button
              ></div>
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
          slot: "level",
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
      warningData: [
        { id: 1, level: 1, weight: 1, enabled: 0, color: "#000" },
        { id: 3, level: 2, weight: 1, enabled: 0, color: "#000" },
      ],
      editIndex: -1,
      editObject: {},
      rowAction: 'edit',
      initRow: { level: "", weight: "", enabled: 0, color: "#f00" },
    };
  },
  computed: {},
  mounted() {
    var _this = this;
    _this.isShow = _this.open;
  },
  methods: {
    handleEdit(row, index) {
      this.editObject.level = row.level;
      this.editObject.weight = row.weight;
      this.editObject.enabled = row.enabled;
      this.editObject.color = row.color;
      this.editIndex = index;
    },
    handleSave(index) {
      this.warningData[index].level = this.editObject.level;
      this.warningData[index].weight = this.editObject.weight;
      this.warningData[index].enabled = this.editObject.enabled;
      this.warningData[index].color = this.editObject.color;
      this.editIndex = -1;
      this.rowAction = '';
      this.editObject = {};
    },
    handleRowCancel(index) {
      if (this.rowAction=='add') {
        this.warningData.splice(index, 1);
      }
      this.editIndex = -1;
      this.rowAction = '';
      this.editObject = {};
    },
    handleAddRow() {
      if (this.rowAction=='add') {
        this._N("请先保存");
        return false;
      }
      this.editObject = {};
      this.warningData.push({level: "", weight: "", enabled: 0, color: "#f00"});
      const len = this.warningData.length;
      this.editIndex = len-1;
      this.warningData[len-1].level = '';
      this.warningData[len-1].weight = '';
      this.warningData[len-1].enabled = 0;
      this.warningData[len-1].color = "#f00";
      this.handleEdit(this.warningData[len-1], this.editIndex);
      this.rowAction = 'add';
    },
    save() {
      var _this = this;

      if (!_this.formData.versionNo) {
        _this._N("请输入版本编码");
        return false;
      }

      if (!_this.formData.versionName) {
        _this._N("请输入版本名称");
        return false;
      }

      _this.submitLoading = true;
      _this.$http.post("/edition/insertEdition", _this.formData).then((res) => {
        if (res) {
          _this.isShow = false;
          _this.$parent.openSettingModel = false;
          _this.$parent.getData();
        } else {
          _this.submitLoading = false;
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
.table-footer{
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

