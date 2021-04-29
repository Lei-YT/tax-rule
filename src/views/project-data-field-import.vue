<template>
  <div v-cloak>
    <Modal
      v-model="isShow"
      width="460"
      :mask-closable="false"
      draggable
      @on-cancel="cancel"
    >
      <p slot="header">
        <b>
          导入字段
          <span style="color: #999">（{{ tableType }}）</span>
        </b>
      </p>

      <div>
        <!-- <template v-if="tableType == '影像表'">
          <div class="form-item">
            <Input type="file" name="file_uploads" accept=".xls, .xlsx" multiple></Input>
          </div>
        </template> -->
        <template>
          <Upload
            class=""
            action="//jsonplaceholder.typicode.com/posts/"
            :format="['xls', 'xlsx']"
            accept=".xls, .xlsx"
            :on-success="importSuccess"
            :on-progress="importLoading"
          >
            <Button
              v-if="uploadBtn"
              icon="ios-cloud-upload-outline"
              style="color: #3399ff; "
              >选择要导入的文件</Button
            >
          </Upload>
          <div v-if="showTip">
            <p>1. 支持的文件格式为: xls、xlsx;</p>
            <p>2. 下载模板文件: 点击此处</p>
          </div>
          <div v-else>
            <Divider />
            <!-- <p >{{importRet}}</p> -->
            <p>导入情况</p>
            <div style="margin-left: 50px">
              <p>导入成功{{ successCnt }}条，导入失败{{ failCnt }}条</p>
              <p v-if="failCnt > 0">下载导入失败的数据，点击此处</p>
            </div>
          </div>
        </template>
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
  props: ["open", "tableId", "projectId", "tableType"],
  data() {
    return {
      isShow: false,
      formData: {
        isSpecial: 0,
        isTrans: 0,
        tableId: Number(1),
        projectId: Number(1),
        type: "String",
      },
      typeList: ["Integer", "String", "Double", "Boolean", "Date", "List"],
      submitLoading: false,

      showTip: true,
      uploadBtn: true,
      importRet: "",
      failCnt: 1,
      successCnt: 0,
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

      if (!_this.formData.name) {
        _this._N("请输入字段名称");
        return false;
      }

      if (!_this.formData.jsonpath && _this.tableType != "规则表") {
        _this._N("请输入JsonPath");
        return false;
      }

      if (!_this.formData.parameter && _this.tableType == "规则表") {
        _this._N("请输入参数");
        return false;
      }

      if (
        _this.formData.isTrans &&
        !_this.formData.defaultValue &&
        _this.tableType == "影像表"
      ) {
        _this._N("请输入默认值");
        return false;
      }

      // if (!_this.formData.remark) {
      //   _this._N("请输入备注");
      //   return false;
      // }

      _this.formData.tableId = _this.tableId;
      _this.formData.projectId = _this.projectId;

      _this.submitLoading = true;
      _this.$http.post(`/data/addField`, _this.formData).then((res) => {
        if (res) {
          _this.isShow = false;
          _this.$parent.openFieldImportModel = false;
          _this.$parent.getFieldData();
        } else {
          _this.submitLoading = false;
        }
      });
    },
    cancel() {
      this.$parent.openFieldImportModel = false;
    },
    importLoading() {
      this.showTip = false;
      this.uploadBtn = false;
    },
    importSuccess(data) {
      console.log("import cb", data);
      this.importRet = "导入成功";
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
  padding: 7px 0;
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
.ivu-upload.ivu-upload-select {
  display: flex;
  justify-content: center;
}
</style>

