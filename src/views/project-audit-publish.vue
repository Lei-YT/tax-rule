<template>
  <div v-cloak>
    <Modal v-model="isShow" width="460" :mask-closable="false" @on-cancel="cancel">
      <p slot="header">
        <b v-if="publishType==1">对此意见审核通过</b>
        <b v-if="publishType==0">对此意见审核驳回</b>
      </p>

      <div>
        <div class="form-item">
          <p class="form-item-title">
            审核意见
            <span style="color:red;">✲</span>
          </p>
          <p>
            <Input v-model="formData.auditOpinion" placeholder="请输入..." type="textarea" :rows="6" />
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
  props: ["open", "id", "publishType"],
  data() {
    return {
      isShow: false,
      formData: {
        itemStatus: this.publishType,
        id: this.id,
        auditOpinion: ""
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

      if (!_this.formData.auditOpinion) {
        _this._N("请输入审核信息");
        return false;
      }

      _this.submitLoading = true;
      _this.$http.post(`/item/audit`, _this.formData).then(res => {
        if (res) {
          _this.isShow = false;
          _this.$parent.openPublishModel = false;
          _this.$parent.getData();
        } else {
          _this.submitLoading = false;
        }
      });
    },
    cancel() {
      this.$parent.openPublishModel = false;
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
</style>

