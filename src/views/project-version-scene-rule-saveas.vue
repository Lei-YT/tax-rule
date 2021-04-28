<template>
  <div v-cloak>
    <Modal v-model="isShow" width="460" :mask-closable="false" @on-cancel="cancel">
      <p slot="header">
        <b>保存为新版本</b>
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
        <div class="form-item" flex>
          <p class="form-item-title">是否复制此版本下其他场景</p>
          <p style="margin-left:20px">
            <RadioGroup v-model="formData.isReuse">
                <Radio :label="1">复用</Radio>
                <Radio :label="0">不复用</Radio>
            </RadioGroup>
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
  props: ["open", "ruleFormat"],
  data() {
    return {
      isShow: false,
      formData: {
        versionNo: "",
        versionName: "",
        sceneId: this.$route.query.id,
        isReuse: 0,
        ruleFormat:JSON.stringify(this.ruleFormat)
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
      _this.$http.post("/rule/addRuleAndVersion", _this.formData).then(res => {
        if (res) {
          _this.isShow = false;
          _this.$parent.openAddModel = false;
          _this.$Modal.success({
              title: "提示",
              content: "保存为新规则成功！"
            });
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

