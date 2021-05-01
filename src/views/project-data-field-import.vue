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
        <b> 导入表字段 </b>
      </p>

      <div>
        <template>
          <Upload
            ref="import"
            with-credentials
            :action="uploadAction"
            :headers="uploadHeader"
            :format="['xls', 'xlsx']"
            accept=".xls, .xlsx"
            :on-success="importSuccess"
            :on-progress="importLoading"
            :on-remove="remove"
            :data="{ projectId: projectId }"
          >
            <Button
              v-if="uploadBtn"
              icon="ios-cloud-upload-outline"
              style="color: #3399ff"
              >选择要导入的文件</Button
            >
          </Upload>
          <div v-if="uploadBtn">
            <p>1. 支持的文件格式为: xls、xlsx;</p>
            <p>
              2. 下载模板文件:
              <a :href="templateFile" target="_blank">点击此处</a>
            </p>
          </div>
          <div v-else-if="importRet">
            <Divider />
            <!-- <p >{{importRet}}</p> -->
            <p>导入情况</p>
            <div style="margin-left: 50px">
              <p>导入成功{{ successCnt }}条，导入失败{{ failCnt }}条</p>
              <p v-if="failCnt > 0">
                下载导入失败的数据，<a
                  @click="downloadAndDelete"
                  target="_blank"
                  >点击此处</a
                >
              </p>
            </div>
          </div>
        </template>
      </div>

      <div slot="footer" flex>
        <div flex-box="1"></div>
        <div flex-box="0">
          <Button @click="cancel">{{ failFileName ? "取消" : "关闭" }}</Button>
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
      importRet: false,
      failCnt: 0,
      successCnt: 0,
      failFileName: "",
      uploadHeader: {
        Authorization: "",
      },
      uploadAction: `${window.axios.defaults.baseURL}/table/import`,
      templateFile: `${window.axios.defaults.baseURL}/excel/template.xlsx`,
      failFilePrefix: `${window.axios.defaults.baseURL}/table/download`,
    };
  },
  computed: {},
  mounted() {
    var _this = this;
    _this.isShow = _this.open;
    _this.uploadHeader.Authorization = _this.$store.state.token;
  },
  methods: {
    cancel() {
      this.$parent.openFieldImportModel = false;
      this.rollbackUpload();
    },
    importLoading() {
      this.uploadBtn = false;
    },
    importSuccess(data) {
      if (data.status == 200) {
        this.importRet = true;
        this.uploadBtn = false;
        this.successCnt = data.data.success;
        this.failCnt = data.data.failure;
        this.failFileName = data.data.file.toString();
        return false;
      }
      this.$refs.import.clearFiles();
      this.uploadBtn = true;
      this.importRet = false;
      this._N(data.message);
    },
    remove() {
      this.uploadBtn = true;
      this.importRet = false;
    },
    downloadAndDelete() {
      const _this = this;
      const fullPath = `${this.failFilePrefix}/1/${this.failFileName}`;
      this.$http.get(fullPath, { responseType: "blob" }).then((data) => {
        _this.failFileName = "";
        if (!data) {
          return;
        }
        _this.cancel();
        let ex = _this.failFileName.split('.').pop();
        let blobType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        if (ex == 'xls') {
          blobType = "application/vnd.ms-excel";
        }
        let url = window.URL.createObjectURL(new Blob([data.data], { type: blobType }));
        let link = document.createElement("a");
        link.style.display = "none";
        link.href = url;
        link.setAttribute("download", _this.failFileName);
        document.body.appendChild(link);
        link.click();
      });
    },
    rollbackUpload() {
      const _this = this;
      if (this.failFileName != "") {
        const fullPath = `${this.failFilePrefix}/0/${this.failFileName}`;
        this.$http.get(fullPath);
      }
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

