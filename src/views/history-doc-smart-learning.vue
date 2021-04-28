<template>
  <div v-cloak>
    <Modal v-model="isShow" width="460" :mask-closable="false" @on-cancel="cancel">
      <p slot="header">
        <b>智能学习</b>
      </p>
      <div>
        <div class="form-item">
          <h4 class="form-item-title">单号</h4>
          <p>
            <Input :value="data.billNo" placeholder="请输入..." type="text" :readonly="true" />
          </p>
        </div>
        <div class="form-item">
          <h4 class="form-item-title">结果</h4>
          <p>
          <Select v-model="formData.studyResult" style="width:100%">
              <Option value="true" >通过</Option>
              <Option value="false" >不通过</Option>
          </Select>
          </p>
        </div>
        <div class="form-item">
          <h4 class="form-item-title">报错话术</h4>
          <p>
            <Input v-model="formData.studyMessage" type="textarea" :rows="6" placeholder="请输入..." />
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
  props: ["open","data"],
  data() {
    return {
      isShow: false,
      formData: {
          id:'',
          studyResult:'',
          studyMessage:''
      },
      submitLoading:false
    };
  },
  computed: {},
  mounted() {
    var _this = this;
    _this.isShow = _this.open;
    _this.formData.id = _this.data.id;
    _this.formData.studyResult = _this.data.studyResult || String(_this.data.auditResult);
    _this.formData.studyMessage = _this.data.studyMessage;
  },
  methods: {
    save() {
      var _this = this;
      if (!_this.formData.studyResult) {
        _this._N("请输入结果");
        return false;
      }
      if (!_this.formData.studyMessage) {
        _this._N("请输入报错话术");
        return false;
      }
      _this.submitLoading = true;
      _this.$http.post("/bill/AIStudy", _this.formData).then(res=> {
        if (res) {
          _this.isShow = false;
          _this.$parent.openSmartLearningModal = false;
          _this.$parent.getData();
        }else{
            _this.submitLoading = false
        }
      });
    },
    cancel() {
      this.$parent.openSmartLearningModal = false;
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
  padding: 5px 0;
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

