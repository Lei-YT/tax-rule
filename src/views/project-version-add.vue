<template>
  <div v-cloak>
    <Modal v-model="isShow" width="460" :mask-closable="false" @on-cancel="cancel">
      <p slot="header">
        <b>添加版本</b>
      </p>

      <div>
        <div class="form-item">
          <p class="form-item-title">
            版本编码
            <span style="color:red;">✲</span>
          </p>
          <p>
            <Input v-model="formData.versionNo" placeholder="请输入..." type="text" />
          </p>
        </div>
        <div class="form-item">
          <p class="form-item-title">
            版本名称
            <span style="color:red;">✲</span>
          </p>
          <p>
            <Input v-model="formData.versionName" placeholder="请输入..." type="text" />
          </p>
        </div>
        <div class="form-item">
          <p class="form-item-title">是否复用其他版本</p>
          <p>
            <Select v-model="formData.versionId" placeholder="请选择...">
              <Option value="0">不复用</Option>
              <Option v-for="vo in list" :key="vo.id" :value="vo.id">{{vo.versionName}}（{{vo.versionNo}}）</Option>
            </Select>
          </p>
        </div>
      </div>

      <div slot="footer" flex>
        <div flex-box="0">
          <Button @click="cancel">取消</Button>
        </div>
        <div flex-box="1"></div>
        <div flex-box="0">
          <Button :loading="submitLoading" type="success" @click="save">提交</Button>
        </div>
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
        versionId: "0"
      },
      submitLoading: false
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
      _this.$http.post("/edition/insertEdition", _this.formData).then(res => {
        if (res) {
          _this.isShow = false;
          _this.$parent.openAddModel = false;
          _this.$parent.getData();
        } else {
          _this.submitLoading = false;
        }
      });
    },
    cancel() {
      this.$parent.openAddModel = false;
    }
  }
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

