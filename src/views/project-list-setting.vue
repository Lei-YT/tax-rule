<template>
  <div v-cloak>
    <Modal
      v-model="isShow"
      width="660"
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
          <template slot="enabled" slot-scope="{ row }">
            <Select
              size="small"
              v-model="row.enabled"
              style="width: 160px; margin-right: 10px"
              placeholder="选择预警等级"
            >
              <Option :value="1">启用</Option>
              <Option :value="0">停用</Option>
            </Select>
          </template>
          <template slot="color" slot-scope="{ row }">
            <!-- {{ row.name }}
            <span style="color: #999">（{{ row.username }}）</span> -->
            <ColorPicker v-model="row.color" recommend />
          </template>
        </Table>
      </div>

      <div slot="footer" flex>
        <div flex-box="1"></div>
        <div flex-box="0">
          <Button @click="cancel">取消</Button>
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
          minWidth: 20,
          key: "id",
        },
        {
          title: "预警等级",
          key: "level",
          minWidth: 50,
        },
        {
          title: "预警权重",
          key: "weight",
          minWidth: 50,
        },
        {
          title: "启用/停用",
          key: "enable",
          minWidth: 50,
        },
        {
          title: "色块设置",
          // key: "color",
          slot: "color",
          minWidth: 50,
        },
      ],
      warningData: [
        {id:1, level: 1, weight: 1,enabled: 0, color: "#000"}
      ],
    };
  },
  computed: {},
  mounted() {
    var _this = this;
    _this.isShow = _this.open;
  },
  methods: {
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
</style>
<style>
.diy-model-body .ivu-modal-body {
  height: 500px;
  overflow-y: auto;
}
</style>

